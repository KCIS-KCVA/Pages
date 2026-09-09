const make = (id, category, altEn, altZh, featured = false, focalPoint = '50% 50%') => ({
  id, filename: id, category, event: 'KCVA × WLSA Tournament', date: '2026-06-13',
  orientation: id === 'huddle' ? 'landscape-rotated' : 'landscape', width: id === 'huddle' ? 1976 : 2000,
  height: id === 'huddle' ? 1110 : 1333, alt: { en: altEn, zh: altZh }, focalPoint,
  homepageFeatured: featured, source: 'Pixcheese official album WbncqDAm5kw', usageRightsConfirmed: true,
  original: `/assets/media/wlsa-2026/original/${id === 'huddle' ? 'huddle.png' : id.toUpperCase() + '.JPG'}`,
  webp: [480,960,1600].map(w => `/assets/media/wlsa-2026/${id}-${w}.webp ${w}w`).join(', '),
  avif: [480,960,1600].map(w => `/assets/media/wlsa-2026/${id}-${w}.avif ${w}w`).join(', ')
});

export const mediaItems = [
  make('dsc00122','girls-action','WLSA player serving as teammates prepare','WLSA 女排队员发球，队友准备接应',true),
  make('dsc00292','girls-action','Girls’ teams contest a point across the net','女排队伍隔网争夺一分',true),
  make('dsc00453','girls-action','SNA player receives the ball in defensive formation','SNA 女排队员在防守阵型中接球',true,'56% 48%'),
  make('dsc00502','portrait','WLSA player ready for the next serve','WLSA 球员准备迎接下一次发球'),
  make('dsc00527','boys-action','Boys’ volleyball player reaches high to serve','男排队员高高跃起发球',true),
  make('dsc00532','boys-action','Boys’ player begins a controlled serve','男排队员开始一次稳定发球'),
  make('dsc00588','girls-action','KCIS girls’ team organizes before the serve','KCIS 女排在发球前组织站位'),
  make('dsc00602','girls-action','KCIS player serves to start the rally','KCIS 球员发球开启回合',true),
  make('dsc00614','girls-action','WLSA player follows through after serving','WLSA 球员发球后的跟随动作'),
  make('dsc00676','girls-action','KCIS team prepares to receive across a full court','KCIS 队伍在全场准备接发球',true),
  make('dsc01095','girls-action','KCIS player makes a low defensive save','KCIS 球员完成低位防守救球',true),
  make('dsc01199','awards','Boys’ team celebrates during the awards ceremony','男排队伍在颁奖环节庆祝'),
  make('dsc01204','awards','WLSA boys’ team poses with its trophy','WLSA 男排队伍与奖杯合影',true),
  make('dsc01295','community','Players and organizers gather after the tournament','球员与赛事组织者赛后合影',true),
  make('dsc01303','awards','WLSA boys’ team displays medals and trophy','WLSA 男排展示奖牌与奖杯'),
  make('dsc01344','awards','WLSA boys’ team celebrates together on stage','WLSA 男排在台上共同庆祝'),
  make('dsc01377','awards','Boys’ award winners pose together after competition','男排获奖队伍赛后合影',true),
  make('huddle','community','A team huddles above the camera before play','队伍在比赛前围成一圈加油',true,'50% 48%')
];

export const featuredMedia = mediaItems.filter(item => item.homepageFeatured);
