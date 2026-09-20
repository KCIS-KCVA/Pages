# Design QA — 14 September 2026

final result: passed

## Scope and visual truth

Preserve the existing premium black/white/electric-pink website. Only organization name, tournament name, registration deadline, white branding and a Sports hub are in scope. The hero photo, sponsor marquee, crew portraits and existing routes remain intact.

- Source: supplied 14 September homepage screenshot, `/var/folders/3r/zhp41knn6w7b6xmbmssxhgb00000gn/T/TemporaryItems/NSIRD_screencaptureui_JELhQB/截屏2026-09-14 07.44.23.png`.
- Source pixels: 2940×1912; normalized to 1470×956 for comparison. The source includes a small top margin not belonging to the page; disregard that capture margin.
- Implementation: `artifacts/qa-2026-09-14/home-desktop.png`, 1470×956 pixels / CSS viewport, density 1.
- Full-view combined input: `artifacts/qa-2026-09-14/home-comparison.png`, 2940×956; source left, implementation right. Both homepage, English, menu closed, scroll at top.
- Focused/mobile comparison: `artifacts/qa-2026-09-14/mobile-fix-comparison.png`, 780×844. Before and after scoped mobile corrections at 390×844 CSS, density 1.

## Findings and comparison history

1. [P2, fixed] Long organization title slightly exceeded its own mobile text box (362px text / 354px box). The full new event name also expanded the pink slab to four large lines, pushing its date below the 844px viewport.
   - Before: `home-mobile.png`.
   - Fix: adjust only the mobile hero heading scale and replace the legacy 480px event-slab 2.8rem override with a responsive 1.6–2rem scale.
   - After: `home-mobile-fixed.png` and combined `mobile-fix-comparison.png`. Heading width now equals its 354px box; entire pink slab and date end at y=762px. At 320px width the title fits its 284px box.
2. No remaining actionable P0/P1/P2 findings. Desktop heading replacement and the additional navigation item are intentional user-requested differences, not design drift.

## Required fidelity surfaces

- Typography: existing Inter and Barlow Condensed retained. Two-line organization title and condensed all-caps event slab preserve the source hierarchy. Tournament detail heading wraps cleanly on mobile.
- Spacing/layout: unchanged split hero, photograph crop, CTA treatment and section structure. Sports cards reuse existing hard-edged choice-card design, three columns on desktop and one on mobile. Navigation fits at 1024px (976px content width).
- Colors/tokens: black #050505, off-white #f5f3ee and electric pink #ff2d8d unchanged. Exact white wordmark enforced using brightness(0) invert(1) on desktop, mobile and footer. Screenshot color-management differences are not CSS token changes.
- Image fidelity: existing real photographs and crew assets retained. White transparent favicon is mechanically derived from the supplied emblem, not a replacement drawing. No new invented imagery or logos.
- Copy/content: KC Varsity Association, exact tournament name, 12 October deadline consistent across current pages and configuration. Future sports explicitly have no announced dates, prices or registration. The RMB400 estimate and tournament dates remain unchanged.
- Accessibility: existing skip link, focus styling, semantic anchors, descriptive image alternatives and reduced-motion controls retained. Menu open/close and bilingual controls remain usable.

## Browser evidence and interactions

Codex in-app Browser rendered and inspected:
- Home: 1470×956, 390×844, 320×740.
- Tournament: desktop and 390×844; full title, date, white logo and registration card.
- Sports: desktop, 390×844 English and Chinese; 1024×900 navigation and overflow check.
- Register: mobile; correct 12 October copy and original configured Jinshuju destination.
- New navigation → Sports; Volleyball → Tournament; Ultimate/Basketball plan anchors; Contact link; mobile menu; Chinese/English toggle.
- Browser console error/warning check returned no entries during the tested flow.
- Evidence: `sports-desktop.png`, `sports-mobile.png`, `sports-mobile-cards.png`, `sports-zh-mobile.png`, `tournament-desktop.png`, `tournament-mobile.png`, `menu-mobile.png`, `register-mobile.png`.

## Implementation checklist

- [x] Current names and deadline, white header/mobile/footer logo and favicon.
- [x] Sports route, shared navigation, sitemap and build inclusion.
- [x] Route, reference, ESLint, TypeScript and build checks.
- [x] Responsive corrections visually recaptured and compared.
- [x] Existing cover, color crew portraits, media and sponsor marquee preserved.

## Open questions / follow-up

- Jinshuju is external and was not edited. Its deadline and post-registration payment dates need owner confirmation/synchronization.
- Future sport dates, venues, format and sport-specific safety/insurance arrangements remain unconfirmed.
- This pass does not re-run every legacy gallery/crew interaction from the 8 September QA; those implementations are untouched.
- Browser screenshots remain in the working repository artifacts folder, excluded from the deployable ZIP.
- No production publish or QR-code generation performed.
