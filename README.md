# KCVA Official Website

The static website for KCVA, KC Varsity Association, a student-led interschool varsity sports organization in Shanghai.

## Local development

```bash
pnpm install
pnpm test
pnpm build
pnpm preview
```

Tournament dates, registration links, contact details, and sponsor data are centralized in `data/site-config.js`.

The production domain is configured through `CNAME` as `kcva.com.cn`. Publishing is handled separately from local development and should only be performed after review.
