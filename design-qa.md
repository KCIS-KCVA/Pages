# Design QA

Final result: passed for the implemented branch on 8 September 2026.

- Responsive browser passes: `1440×900`, `1024×900`, `768×900`, `390×900`, and `375×900` on Home, Register, Media, and Crew. At every size, `scrollWidth === viewportWidth`, the H1 is visible, and the mobile menu switches on below the intended breakpoint.
- Core paths: Home, Register, Matches, Results, Media, About, Crew, Sponsor, Safety, Privacy, Contact
- Interactions: navigation, mobile menu, language toggle, results tabs, crew search/modal, media lightbox, external form links
- Performance: responsive AVIF/WebP, original fallback, lazy loading, reduced-motion behavior

## Browser evidence

- Chrome loaded all 12 routes with a real heading and without route failures.
- Homepage visual was compared with the supplied black/white/electric-pink reference. Hierarchy, split hero, typography, hard-edged CTA treatment and event slab remain faithful.
- Captured and visually inspected 390px Home plus 375px Register and Crew states in Chrome; content, calls to action, search, cards and image crops remain readable without clipping.
- Gallery loaded its two offset rows after lazy images entered the viewport.
- Verified 18-item Media grid and keyboard/touch lightbox behavior.
- Verified all seven staff records, search narrowing to one record, profile dialog, and bilingual persistence.
- Verified Tournament registration, Join KCVA and Sponsor inquiry resolve to the configured live forms.
- Build, route validator, ESLint and TypeScript checks pass.
- Chrome console pass returned no errors or warnings across the responsive QA session.
- Latest visual pass confirms the homepage uses the supplied black KCVA emblem as its left-side hero artwork, the full `26–27 KCVA VOLLEYBALL TOURNAMENT ONE` title remains readable, and the sponsor marquee is preserved.
- Latest Crew pass confirms all member cards use English display names, retain source color, and show the supplied new Benze photo with a readable crop on desktop and mobile layouts.
- Cover replacement pass confirms the supplied five-person WLSA venue photo remains centered and recognizable in the `1440×900` split hero and the `390×844` stacked hero, with no text collision or horizontal overflow.
