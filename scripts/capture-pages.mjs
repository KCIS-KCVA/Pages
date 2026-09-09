import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outputDir = path.join(process.cwd(), 'artifacts/screenshots');
const profileDir = '/private/tmp/kcva-cdp-capture-profile';
const debuggingPort = 9225;
const baseUrl = 'http://172.20.10.2:4173';
const pages = [['homepage', '/'], ['tournament-1', '/tournament-1/'], ['safety', '/safety/'], ['register', '/register/']];
const viewports = [['desktop', 1440, 1000], ['mobile', 390, 844]];

await fs.mkdir(outputDir, { recursive: true });
await fs.rm(profileDir, { recursive: true, force: true });

const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${debuggingPort}`, `--user-data-dir=${profileDir}`, 'about:blank'
], { stdio: 'ignore' });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let version;
for (let attempt = 0; attempt < 50; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${debuggingPort}/json/version`);
    if (response.ok) { version = await response.json(); break; }
  } catch { /* Chrome is still starting. */ }
  await sleep(100);
}
if (!version?.webSocketDebuggerUrl) throw new Error('Chrome debugging endpoint did not start.');

const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
let commandId = 0;
const pending = new Map();
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
});
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const id = ++commandId;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
});

try {
  for (const [pageName, route] of pages) {
    for (const [viewportName, width, height] of viewports) {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      await send('Page.enable', {}, sessionId);
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        screenWidth: width,
        screenHeight: height,
        positionX: 0,
        positionY: 0,
        deviceScaleFactor: 1,
        mobile: viewportName === 'mobile',
      }, sessionId);
      await send('Page.navigate', { url: `${baseUrl}${route}` }, sessionId);
      await send('Runtime.evaluate', {
        expression: `Promise.all([
          document.fonts.ready,
          ...Array.from(document.images, image => image.complete
            ? Promise.resolve()
            : new Promise(resolve => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              }))
        ]).then(() => true)`,
        awaitPromise: true,
        returnByValue: true,
      }, sessionId);
      await sleep(500);
      const metrics = await send('Runtime.evaluate', { expression: '({innerWidth,innerHeight,scrollWidth:document.documentElement.scrollWidth})', returnByValue: true }, sessionId);
      const result = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false }, sessionId);
      const destination = path.join(outputDir, `${pageName}-${viewportName}.png`);
      await fs.writeFile(destination, Buffer.from(result.data, 'base64'));
      console.log(`${destination} ${JSON.stringify(metrics.result.value)}`);
      await send('Target.closeTarget', { targetId });
    }
  }
} finally {
  socket.close();
  chrome.kill('SIGTERM');
}
