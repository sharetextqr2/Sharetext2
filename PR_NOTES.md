PR Notes — Favicon & SEO assets

What I added in this PR
- SVG assets: `public/favicon.svg`, `public/logo.svg`, `public/og-image.svg`, `public/apple-touch-icon.svg`
- `public/site.webmanifest` and `public/og-preview.html` (in-browser PNG export)
- Metadata updates in `app/layout.tsx` and `app/page.tsx` to reference the new assets

Suggested next steps
1. Replace the placeholder SVGs with production-ready PNG/SVG assets from your designer.
2. (Optional) Generate PNG fallbacks at 1200×630 and 600×315 for social platforms. I can generate these automatically if you permit installing ImageMagick in the environment, or I can generate them locally and add them to the PR.
3. Verify favicon and OG image in a staging deploy — clear cache or use an incognito window to see updates.

Preview
- Open `/og-preview.html` on the deployed site or local dev server to view and download PNG versions.

If you want, I can:
- Generate PNG fallbacks and add them to this PR (requires permission to install ImageMagick or add a node-based renderer), or
- Mark this PR as a draft and request specific reviewers. Let me know which you prefer.