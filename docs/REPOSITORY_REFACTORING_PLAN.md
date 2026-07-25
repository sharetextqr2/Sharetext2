# Repository Refactoring Plan

**Project:** ShareTextQR  
**Based On:** MASTER_SPECIFICATION.md v1.0.0, REPOSITORY_ANALYSIS_REPORT.md v1.0.0  
**Date:** 2026-07-25  
**Status:** 🔒 LOCKED

---

## 1. Purpose

ShareTextQR requires refactoring because the current repository, while technically functional, diverges significantly from the approved MASTER_SPECIFICATION.md (PRD). The existing codebase was built prior to the PRD's completion and therefore follows a different architectural, visual, and strategic direction.

The specific gaps that necessitate refactoring are:

- **Design System Conflict:** The current codebase uses indigo/purple gradients, glassmorphism, dark mode support, and decorative CSS effects. The PRD mandates a white background with blue accent colours, no dark mode, no gradients, and no glassmorphism.
- **Homepage Architecture Conflict:** The current homepage is a marketing landing page featuring hero sections, testimonials, trust badges, use cases, feature grids, and CTAs. The PRD requires a clean utility homepage focused on tool discovery via search.
- **Missing Feature Catalogue:** 10 of 11 approved tools are absent from the codebase. Only Text-to-QR is implemented. All Image Tools (PNG→SVG, SVG→PNG, SVG Viewer, OCR, Remove Background, Image Compressor, Image Resizer, HEIC→JPG, Passport Photo Maker) and Scan QR with Webcam must be built.
- **Missing Global Infrastructure:** Global search, advertisement containers, a universal tool page template, and reusable components for Related Tools, Latest Articles, and Breadcrumbs do not exist.
- **SEO Alignment Gap:** URL slugs, metadata, structured data, and internal linking do not match the approved KEYWORD_STRATEGY.md. Five empty SEO stub pages are indexed with no tool content.
- **Dependency Bloat:** Several heavy dependencies (framer-motion, next-themes, recharts, embla-carousel-react, vaul, etc.) support features the PRD explicitly prohibits or that may be unused.

The refactoring must preserve the existing working functionality (Text-to-QR, blog, Supabase integration, view page) while systematically aligning every layer of the application with the PRD.

---

## 2. Objectives

| # | Objective | Success Criterion |
|---|-----------|-------------------|
| 1 | Align the design system with PRD Chapter 2 | White background, blue accent, no dark mode, no gradients, no glassmorphism |
| 2 | Convert the homepage to a utility layout | Search → Popular Tools → Ad → Latest Tools → Ad → Latest Articles → Ad → Footer |
| 3 | Implement a reusable global layout | Identical Header, Footer, Search, and Breadcrumb on every page |
| 4 | Build a universal tool page template | Every tool inherits the same layout: H1 → Tagline → Interface → Ad → Related Tools → Ad → FAQ → Ad → Latest Articles → Ad → Footer |
| 5 | Deliver all 11 approved tools | 2 QR tools + 9 Image Tools, each fully functional |
| 6 | Implement global search | Tool-only search available from every page |
| 7 | Implement advertisement containers | Fixed, CLS-safe, reusable ad placements on every page type |
| 8 | Achieve full SEO alignment | Correct slugs, per-tool metadata, structured data, internal linking, sitemap |
| 9 | Meet Lighthouse targets | Performance ≥95, Accessibility =100, Best Practices =100, SEO =100 |
| 10 | Remove unnecessary dependencies | Only packages required by the PRD remain in production |
| 11 | Preserve existing working functionality | Text→QR, blog, view page, Supabase integration continue working throughout refactoring |

---

## 3. Refactoring Principles

Every implementation decision during this refactoring must follow these principles:

1. **Preserve working functionality.** Existing tools, routes, and integrations that comply with the PRD must continue working throughout every phase. Never break what works.
2. **Refactor before rewriting.** Prefer modifying existing components over creating new ones. Reuse existing code structure wherever practical.
3. **Reuse existing components whenever possible.** Before creating any new component, search the existing repository. Use shadcn/ui primitives. Extend before creating.
4. **Keep the repository deployable after every phase.** Each phase must result in a working application. No phase should leave the project in a broken state.
5. **Documentation before implementation.** Update MASTER_SPECIFICATION.md, DECISION_LOG.md, and KEYWORD_STRATEGY.md before writing any code for a given phase.
6. **PRD is the single source of truth.** If implementation conflicts with the PRD, the PRD takes priority. No unauthorised design, features, or architectural changes.
7. **No dark mode.** Dark mode is permanently disabled per PRD Section 2.5. Do not reintroduce it at any point.
8. **Performance is a feature.** Every change must consider Lighthouse scores, Core Web Vitals, and bundle size. Do not add unnecessary JavaScript or CSS.
9. **Consistency over creativity.** Every page must use the same design language. No tool may introduce a different layout or visual style.
10. **One phase at a time.** No phase may begin until the previous phase has been completed, tested, and approved by the Product Owner.

---

## 4. Phase-by-Phase Refactoring Strategy

### Phase 1 — Foundation Cleanup

**Objective:** Remove PRD-violating infrastructure and establish the correct design system baseline.

**Scope:**
- Remove dark mode infrastructure (ThemeProvider, ThemeToggle, dark CSS variables)
- Remove gradient, glass, and decorative CSS custom classes from globals.css
- Simplify Tailwind configuration (remove dark mode, gradient keyframes, unused colours)
- Remove marketing section components from the codebase (do not hide — delete)
- Rewrite homepage to PRD-specified utility layout
- Update root layout metadata to match PRD keyword strategy
- Remove or quarantine unused dependencies

**Files expected to change:**

| File | Action |
|------|--------|
| `app/layout.tsx` | Remove ThemeProvider, update metadata, clean `<head>` |
| `app/globals.css` | Remove `.glass`, `.glass-card`, `.gradient-text`, `.hero-gradient`, dark mode CSS vars |
| `tailwind.config.ts` | Remove dark mode config, gradient keyframes, unused colours; add blue theme colours |
| `app/page.tsx` | Complete rewrite to utility homepage layout |
| `components/theme-provider.tsx` | Delete |
| `components/theme-toggle.tsx` | Delete |
| `components/sections/hero.tsx` | Delete |
| `components/sections/trust.tsx` | Delete |
| `components/sections/features.tsx` | Delete |
| `components/sections/how-it-works.tsx` | Delete |
| `components/sections/use-cases.tsx` | Delete |
| `components/sections/testimonials.tsx` | Delete |
| `components/sections/faq-section.tsx` | Delete |
| `components/sections/cta-section.tsx` | Delete |
| `components/shared/animations.tsx` | Delete or strip framer-motion dependency |
| `supabase/migrations/` | Consolidate duplicate migrations |

**Components affected:** RootLayout, Homepage, Header (theme toggle removal), all 8 section components, ThemeProvider, ThemeToggle, Animation wrappers.

**Risks:**
- Removing ThemeProvider may cause hydration errors if remnants remain in layout
- Deleting 8 section components may leave dangling imports (verify with `next build` / TypeScript)
- Homepage rewrite may temporarily reduce SEO ranking for existing indexed content
- QRGenerator import from HeroSection must be preserved and relocated

**Validation checklist:**
- [ ] No remaining imports of deleted components
- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] Next.js build succeeds (`next build`)
- [ ] Homepage renders correct utility layout
- [ ] No dark mode toggle present in UI
- [ ] No gradient, glass, or decorative CSS effects visible
- [ ] Text→QR functionality still works
- [ ] Blog pages still render correctly
- [ ] Lighthouse baseline recorded

**Expected deliverables:**
- PRD-compliant design system (white + blue, no dark mode, no gradients)
- Clean utility homepage with search and tool display
- Removed marketing sections and dark mode infrastructure
- Consolidated dependencies
- Updated DECISION_LOG.md documenting all changes

---

### Phase 2 — Global Layout

**Objective:** Implement reusable global components that every page must share.

**Scope:**
- Refactor Header (remove theme toggle, change gradient logo to flat, update nav items to QR / Images / Blog / Search)
- Refactor Footer (update link structure to match PRD: QR Tools, Image Tools, Blog, Privacy, Terms, Contact)
- Create reusable Search component (tool-only search, global availability, dropdown results)
- Create reusable AdContainer component (CLS-safe, responsive, rounded, consistent spacing)
- Create reusable RelatedTools component (card grid, internal linking)
- Create reusable LatestArticles component (card grid from blog data)
- Wire up Breadcrumb component (use existing shadcn breadcrumb with BreadcrumbList schema)

**Files expected to change:**

| File | Action |
|------|--------|
| `components/layout/header.tsx` | Refactor nav, remove theme toggle, add search trigger |
| `components/layout/footer.tsx` | Update link structure |
| `components/shared/` | Add Search, AdContainer, RelatedTools, LatestArticles |
| `components/ui/breadcrumb.tsx` | Verify and wire up |
| `app/layout.tsx` | Integrate new global components |

**Components affected:** Header, Footer, all page layouts.

**Risks:**
- Search component may require state management for dropdown (keep simple)
- AdContainer must reserve space to prevent CLS
- Changing Header nav may break existing user navigation patterns temporarily

**Validation checklist:**
- [ ] Header displays correct nav items (QR, Images, Blog)
- [ ] No theme toggle present
- [ ] Footer displays correct link structure
- [ ] Search is accessible from homepage and renders results
- [ ] AdContainer renders without layout shift
- [ ] RelatedTools renders correctly
- [ ] LatestArticles renders blog posts
- [ ] Breadcrumb appears on inner pages
- [ ] Responsive behaviour verified (mobile, tablet, desktop)

**Expected deliverables:**
- Complete reusable global component library (Header, Footer, Search, AdContainer, RelatedTools, LatestArticles, Breadcrumb)

---

### Phase 3 — Homepage

**Objective:** Finalise the PRD-compliant utility homepage.

**Scope:**
- Implement Search section (visible above fold, primary interaction)
- Implement Popular Tools section (11 approved tools as card grid)
- Implement Latest Tools section (recently added tools)
- Implement Latest Articles section (from blog-data.ts)
- Add advertisement placements at approved locations
- Handle existing SEO stub pages:
  - `/free-qr-code-generator`
  - `/share-text-online`
  - `/qr-code-for-text`
  - `/text-to-qr-code`
  - `/transfer-text-between-devices`
  - Possible migration options: keep the existing URL if it already has SEO value, redirect only after SEO review, use Canonical URLs where appropriate, or implement the approved tool directly on the existing URL if preserving rankings is beneficial
  - Final decision after analysing Google Search Console data and Product Owner preference

**Files expected to change:**

| File | Action |
|------|--------|
| `app/page.tsx` | Utility homepage layout complete |
| `components/` | New: SearchSection, PopularTools, LatestTools, LatestArticles |
| `app/*/page.tsx` (SEO stubs) | Decide per-route: keep, redirect, or implement |

**Components affected:** Homepage, 5 SEO stub pages.

**Risks:**
- Popular Tools section references tools that do not yet exist (link to placeholder or skip until built)
- SEO stub decisions require Product Owner input — may block phase completion

**Validation checklist:**
- [ ] Search is visible above the fold
- [ ] Popular Tools renders 11 tool cards (some may link to placeholder pages)
- [ ] Latest Tools section renders
- [ ] Latest Articles renders blog posts
- [ ] Advertisement placements render at correct locations
- [ ] SEO stubs handled according to Product Owner decision
- [ ] Homepage Lighthouse ≥95 Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- [ ] Homepage responsive on mobile, tablet, desktop

**Expected deliverables:**
- PRD-compliant, fully functional utility homepage
- SEO stub migration decision implemented

---

### Phase 4 — Universal Tool Template

**Objective:** Create the reusable tool page template that every QR and Image tool will inherit.

**Scope:**
- Create ToolLayout component (wraps page in global layout + tool-specific sections)
- Create ToolHeader component (H1 = Primary Keyword + Tagline)
- Create ToolInterface container (responsive, centered, clean)
- Create per-tool FAQ component (unique questions per tool, FAQPage schema)
- Create tool-specific Latest Articles integration (filter articles by relevance to tool)
- Create tool-specific Related Tools integration (cross-link related tools)
- Wire Breadcrumb for every tool page
- Implement stub pages for all 11 tools using the template
- Implement correct URL slugs per KEYWORD_STRATEGY.md:
  - `/text-to-qr`
  - `/scan-qr`
  - `/png-to-svg`
  - `/svg-to-png`
  - `/svg-viewer`
  - `/image-to-text`
  - `/remove-background`
  - `/image-compressor`
  - `/image-resizer`
  - `/heic-to-jpg`
  - `/passport-photo-maker`

**Files expected to change / create:**

| File | Action |
|------|--------|
| `app/template/` or `components/tool-layout.tsx` | Create |
| `components/tool-header.tsx` | Create |
| `components/tool-interface.tsx` | Create |
| `components/tool-faq.tsx` | Create |
| `app/text-to-qr/page.tsx` | Create (or migrate from `app/text-to-qr-code/`) |
| `app/scan-qr/page.tsx` | Create stub |
| `app/png-to-svg/page.tsx` | Create stub |
| `app/svg-to-png/page.tsx` | Create stub |
| `app/svg-viewer/page.tsx` | Create stub |
| `app/image-to-text/page.tsx` | Create stub |
| `app/remove-background/page.tsx` | Create stub |
| `app/image-compressor/page.tsx` | Create stub |
| `app/image-resizer/page.tsx` | Create stub |
| `app/heic-to-jpg/page.tsx` | Create stub |
| `app/passport-photo-maker/page.tsx` | Create stub |

**Components affected:** All tool pages.

**Risks:**
- Creating 11 stub pages before implementing tool logic means pages will be indexable but non-functional — mitigate by excluding stubs from sitemap until tools are built
- Slug redirects from old URLs must be implemented to prevent 404s

**Validation checklist:**
- [ ] ToolLayout renders consistently across all stub pages
- [ ] ToolHeader displays correct H1 and Tagline per KEYWORD_STRATEGY.md
- [ ] Breadcrumb renders correct breadcrumb trail
- [ ] FAQ placeholder renders
- [ ] Related Tools placeholder renders
- [ ] Latest Articles renders blog posts
- [ ] Advertisement containers render at correct positions
- [ ] All 11 routes accessible at correct slugs
- [ ] Old URLs either redirect or are handled per Product Owner decision
- [ ] Lighthouse ≥95 on every stub page

**Expected deliverables:**
- Universal tool page template
- 11 tool stub pages at correct PRD slugs
- Toolpage SEO metadata framework

---

### Phase 5 — QR Tools

**Objective:** Implement the 2 approved QR tools.

**Scope:**
- **Text → QR:** Refactor existing QRGenerator into the universal tool template. Implement per KEYWORD_STRATEGY.md for `/text-to-qr`. Add text input validation, QR generation via qrcode.react, download, and copy functionality. Add per-tool FAQ, related tools, and SEO metadata.
- **Scan QR with Webcam:** Build new tool at `/scan-qr`. Implement camera permission flow, real-time QR scanning (via `jsQR` or browser API), result display, copy result, and error handling for camera-unavailable and permission-denied states. Add per-tool FAQ and SEO metadata.

**Files expected to change / create:**

| File | Action |
|------|--------|
| `app/text-to-qr/page.tsx` | Implement full tool |
| `app/scan-qr/page.tsx` | Implement full tool |
| `components/tools/text-to-qr.tsx` | Create or refactor from `components/shared/qr-generator.tsx` |
| `components/tools/scan-qr.tsx` | Create |
| `components/tools/` | Shared QR tool utilities |

**Components affected:** QRGenerator, Text→QR page, Scan QR page.

**Risks:**
- Camera API may not be supported in all browsers — provide fallback UI
- QR scanner performance on mobile varies — test on real devices

**Validation checklist:**
- [ ] Text→QR generates QR code from input text
- [ ] Text→QR download works
- [ ] Text→QR copy works
- [ ] Scan QR accesses camera on user interaction
- [ ] Scan QR detects and decodes QR codes
- [ ] Scan QR displays friendly error when camera unavailable
- [ ] Scan QR displays friendly error when permission denied
- [ ] Per-tool FAQ renders unique questions
- [ ] SEO metadata (title, description, canonical, OG, structured data) correct per KEYWORD_STRATEGY.md
- [ ] Lighthouse ≥95 on both tool pages

**Expected deliverables:**
- 2 fully functional QR tools with complete SEO

---

### Phase 6 — Image Tools (Batch 1)

**Objective:** Implement the 5 simplest Image Tools.

**Scope:**

| Priority | Tool | Route | Implementation Approach |
|----------|------|-------|------------------------|
| 1 | SVG Viewer | `/svg-viewer` | Upload SVG → render in browser with responsive viewer. Minimal processing. |
| 2 | HEIC → JPG | `/heic-to-jpg` | Client-side conversion using canvas API or heic2any library |
| 3 | Image Compressor | `/image-compressor` | Canvas API quality/size reduction with before/after comparison |
| 4 | Image Resizer | `/image-resizer` | Canvas API dimension resize with aspect ratio lock |
| 5 | SVG → PNG | `/svg-to-png` | Canvas rendering of uploaded SVG, then PNG download |

**Files expected to create:**

| File | Action |
|------|--------|
| `app/svg-viewer/page.tsx` | Implement full tool |
| `app/heic-to-jpg/page.tsx` | Implement full tool |
| `app/image-compressor/page.tsx` | Implement full tool |
| `app/image-resizer/page.tsx` | Implement full tool |
| `app/svg-to-png/page.tsx` | Implement full tool |
| `components/tools/svg-viewer.tsx` | Create |
| `components/tools/heic-to-jpg.tsx` | Create |
| `components/tools/image-compressor.tsx` | Create |
| `components/tools/image-resizer.tsx` | Create |
| `components/tools/svg-to-png.tsx` | Create |

**Components affected:** 5 new tool pages and components.

**Risks:**
- HEIC decoding requires a library (heic2any) — add as new dependency with bundle size consideration
- Canvas-based processing may be slow on low-end mobile devices
- SVG rendering differences between browsers may affect output accuracy

**Validation checklist:**
- [ ] SVG Viewer displays uploaded SVG correctly
- [ ] HEIC → JPG converts and downloads
- [ ] Image Compressor reduces file size with acceptable quality
- [ ] Image Resizer resizes to user-specified dimensions
- [ ] SVG → PNG renders and downloads correctly
- [ ] All tools handle invalid files gracefully
- [ ] All tools handle empty state, loading state, success state, error state
- [ ] SEO metadata correct per KEYWORD_STRATEGY.md
- [ ] Per-tool FAQ renders unique questions

**Expected deliverables:**
- 5 functional Image Tools with SEO

---

### Phase 7 — Image Tools (Batch 2)

**Objective:** Implement the remaining 4 more complex Image Tools.

**Scope:**

| Priority | Tool | Route | Implementation Approach |
|----------|------|-------|------------------------|
| 6 | PNG → SVG | `/png-to-svg` | Client-side tracing via `imagetracerjs` or similar library |
| 7 | Passport Photo Maker | `/passport-photo-maker` | Canvas composition with preset sizes (US Passport, UK, EU, etc.) |
| 8 | Image to Text (OCR) | `/image-to-text` | Tesseract.js for client-side OCR processing |
| 9 | Remove Background | `/remove-background` | WASM-based `rembg` or API integration |

**Files expected to create:**

| File | Action |
|------|--------|
| `app/png-to-svg/page.tsx` | Implement full tool |
| `app/passport-photo-maker/page.tsx` | Implement full tool |
| `app/image-to-text/page.tsx` | Implement full tool |
| `app/remove-background/page.tsx` | Implement full tool |
| `components/tools/png-to-svg.tsx` | Create |
| `components/tools/passport-photo-maker.tsx` | Create |
| `components/tools/image-to-text.tsx` | Create |
| `components/tools/remove-background.tsx` | Create |

**Components affected:** 4 new tool pages and components.

**Risks:**
- Tesseract.js is a large WASM bundle (~5MB) — implement lazy loading for OCR tool only
- Remove Background quality varies significantly — consider setting user expectations with a disclaimer
- Passport Photo Maker requires country-specific dimension presets — source from official standards
- PNG → SVG tracing quality depends on image complexity — set appropriate expectations

**Validation checklist:**
- [ ] PNG → SVG produces valid SVG output
- [ ] Passport Photo Maker generates correct size for each preset
- [ ] OCR extracts text from clear images
- [ ] Remove Background processes images with acceptable quality
- [ ] All tools handle errors gracefully
- [ ] All tools have correct SEO metadata
- [ ] Per-tool FAQ renders unique questions
- [ ] All 9 Image Tools functional and tested

**Expected deliverables:**
- All 9 Image Tools functional with complete SEO

---

### Phase 8 — SEO Completion

**Objective:** Ensure every page is fully SEO-optimised per KEYWORD_STRATEGY.md.

**Scope:**
- Implement per-tool SEO metadata (Title, Description, Primary Keyword, Supporting Keywords)
- Implement per-tool JSON-LD structured data:
  - SoftwareApplication schema (for every tool)
  - FAQPage schema (with per-tool unique questions)
  - BreadcrumbList schema (every page)
- Implement Open Graph metadata for every page (title, description, image, URL)
- Implement Twitter Card metadata for every page
- Add canonical URLs to every page
- Update XML sitemap (dynamic route) with all 11 tool pages, blog categories, and legal pages
- Implement internal linking strategy (every tool links to related tools + relevant blog articles)
- Implement 301 redirects or Canonical URLs for old URL slugs
- Handle SEO stub migration per Product Owner decision
- Verify robots.txt
- Remove static `public/sitemap.xml` — dynamic route supersedes it

**Files expected to change:**

| File | Action |
|------|--------|
| `app/sitemap.xml/route.ts` | Add all tool routes, categories, correct priorities |
| `app/text-to-qr/page.tsx` etc. | Add metadata, JSON-LD |
| `app/layout.tsx` | Update base metadata |
| `public/robots.txt` | Verify |
| `public/sitemap.xml` | Remove (dynamic route covers this) |
| `next.config.js` | Add redirects for old slugs if applicable |

**Components affected:** Every page.

**Risks:**
- Incorrect redirects may cause 404s or SEO penalty — test thoroughly
- Duplicate content risk if old and new slugs both resolve — implement canonical URLs

**Validation checklist:**
- [ ] Every page has unique SEO Title
- [ ] Every page has unique Meta Description
- [ ] Every page has canonical URL
- [ ] Every page has Open Graph metadata
- [ ] Every tool page has SoftwareApplication schema
- [ ] Every tool page has FAQPage schema
- [ ] Every page has BreadcrumbList schema
- [ ] XML sitemap includes all 11 tool pages, blog, categories, legal pages
- [ ] robots.txt allows crawling of all public pages
- [ ] No duplicate content accessible via multiple URLs
- [ ] Internal linking exists on every page
- [ ] Lighthouse SEO = 100 on every page

**Expected deliverables:**
- Fully SEO-optimised platform

---

### Phase 9 — Performance & Accessibility

**Objective:** Meet or exceed Lighthouse targets on every page.

**Scope:**
- Run Lighthouse audit on every page type (homepage, tool page, blog article, category, legal)
- Fix identified accessibility issues:
  - Keyboard navigation completeness
  - Focus state visibility on all interactive elements
  - Screen reader support
  - ARIA attributes where required
  - Colour contrast compliance
  - Semantic HTML structure
- Fix identified performance issues:
  - Remove unused JavaScript and CSS
  - Lazy load below-fold images and components
  - Optimise image assets
  - Minimise layout shifts (verify ad container reservations)
  - Reduce bundle size (code splitting, dynamic imports)
  - Verify font loading optimisation
- Fix identified best practices issues:
  - Verify HTTPS enforcement
  - Verify no mixed content
  - Verify console error-free

**Files expected to change:** Varies based on audit findings.

**Components affected:** All.

**Risks:**
- Fixing all accessibility issues across 11+ tool pages may be time-intensive
- Third-party ad scripts may introduce performance regressions beyond our control

**Validation checklist:**
- [ ] Lighthouse Performance ≥95 on every page
- [ ] Lighthouse Accessibility =100 on every page
- [ ] Lighthouse Best Practices =100 on every page
- [ ] Lighthouse SEO =100 on every page
- [ ] LCP < 2.5s on all pages
- [ ] INP < 200ms on all pages
- [ ] CLS < 0.1 on all pages
- [ ] Keyboard navigation functional on every page
- [ ] Screen reader test passes on key pages
- [ ] No console errors
- [ ] All interactive elements have visible focus states
- [ ] Colour contrast meets WCAG AA standards

**Expected deliverables:**
- Performance and accessibility optimised platform meeting all Lighthouse targets

---

### Phase 10 — Release

**Objective:** Validate production readiness and deploy.

**Scope:**
- Full functional testing of every tool (input, processing, output, download, error states)
- Responsive testing (desktop, tablet, mobile)
- Cross-browser testing (Chrome, Edge, Firefox, Safari)
- SEO validation per RELEASE_CHECKLIST.md
- Accessibility validation
- Performance validation
- Regression testing (verify existing functionality unchanged)
- Git commit with clean commit history
- GitHub push
- Production deployment via Netlify
- Post-deployment verification:
  - Homepage loads correctly
  - All 11 tool pages load and function
  - Blog pages load
  - Search works
  - Advertisements display correctly
  - No console errors
- Update documentation to reflect final product state

**Files expected to change:** None — this phase is testing, validation, and deployment.

**Components affected:** All (testing scope).

**Risks:**
- Production bugs discovered post-deployment — follow rollback strategy
- Netlify deployment may require environment variable configuration

**Validation checklist:**
- [ ] All PRD requirements satisfied
- [ ] All 11 approved tools functional
- [ ] All Lighthouse targets achieved
- [ ] Responsive design verified on mobile, tablet, desktop
- [ ] Cross-browser verified
- [ ] No critical defects remain
- [ ] MASTER_SPECIFICATION.md up to date
- [ ] DECISION_LOG.md up to date
- [ ] KEYWORD_STRATEGY.md up to date
- [ ] Git status clean
- [ ] Committed and pushed
- [ ] Production deployment successful
- [ ] Post-deployment verification passed
- [ ] Product Owner approval received

**Expected deliverables:**
- Production-ready ShareTextQR platform

---

## 5. Component Refactoring Matrix

| Current Component | Action | Reuse | Refactor | Replace | Remove | Reason |
|-------------------|--------|-------|----------|---------|--------|--------|
| `app/layout.tsx` | Refactor | ✅ Layout structure | ✅ Metadata, ThemeProvider removal | — | — | Remove dark mode, update SEO metadata |
| `app/page.tsx` | Replace | — | — | ✅ Utility homepage | — | Marketing landing → utility homepage |
| `app/globals.css` | Refactor | ✅ Tailwind directives | ✅ Remove gradient/glass/dark CSS | — | — | Align with PRD design system |
| `tailwind.config.ts` | Refactor | ✅ Plugin config | ✅ Colours, dark mode, keyframes | — | — | Switch to blue theme |
| `components/layout/header.tsx` | Refactor | ✅ Sticky header structure | ✅ Nav items, logo, remove theme toggle | — | — | PRD nav: QR/Images/Blog/Search |
| `components/layout/footer.tsx` | Refactor | ✅ Footer structure | ✅ Link structure | — | — | Update to PRD link structure |
| `components/theme-provider.tsx` | Remove | — | — | — | ✅ Remove | Dark mode prohibited |
| `components/theme-toggle.tsx` | Remove | — | — | — | ✅ Remove | Dark mode prohibited |
| `components/sections/hero.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/trust.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/features.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/how-it-works.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/use-cases.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/testimonials.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/sections/faq-section.tsx` | Refactor | ✅ Accordion pattern | ✅ Relocate to tool FAQ component | — | — | Homepage FAQ → per-tool FAQ |
| `components/sections/cta-section.tsx` | Remove | — | — | — | ✅ Remove | Marketing — prohibited |
| `components/shared/qr-generator.tsx` | Refactor | ✅ Core QR logic | ✅ Relocate to tool component, PRD UI | — | — | Integrate into universal tool template |
| `components/shared/card.tsx` | Refactor | ✅ Section wrapper pattern | ✅ Remove gradient/dark variants | — | — | Align with PRD design system |
| `components/shared/animations.tsx` | Remove | — | — | — | ✅ Remove | framer-motion excessive for PRD |
| `components/view-page-client.tsx` | Reuse | ✅ Full component | — | — | — | PRD-compliant, no changes needed |
| `components/contact-page-client.tsx` | Reuse | ✅ Full component | — | — | — | Functional, no changes needed |
| `lib/utils.ts` | Reuse | ✅ Full utility | — | — | — | Stable |
| `lib/supabase.ts` | Reuse | ✅ Full client | — | — | — | Core data layer |
| `lib/blog-data.ts` | Reuse | ✅ Full dataset | — | — | — | Complete |
| `hooks/use-toast.ts` | Reuse | ✅ Full hook | — | — | — | Stable |
| `app/blog/**` | Reuse | ✅ Full architecture | ✅ Styling, metadata only | — | — | Preserve routing, refactor surface only |
| `app/privacy/page.tsx` | Reuse | ✅ Full page | — | — | — | Legal requirement |
| `app/terms/page.tsx` | Reuse | ✅ Full page | — | — | — | Legal requirement |
| `app/contact/page.tsx` | Reuse | ✅ Full page | — | — | — | Functional |
| `app/about/page.tsx` | Refactor | ✅ Content | ✅ PRD brand alignment | — | — | Minor content updates |
| `app/faq/page.tsx` | Refactor | ✅ Content | ✅ Restructure as tool FAQ reference | — | — | Align with PRD |
| `app/sitemap.xml/route.ts` | Refactor | ✅ Dynamic generation | ✅ Add all tool routes | — | — | Expand coverage |
| `public/sitemap.xml` | Remove | — | — | — | ✅ Remove | Superseded by dynamic route |
| `supabase/migrations/` | Refactor | ✅ One migration | ✅ Consolidate duplicates | — | — | Clean up schema |

---

## 6. Route Migration Plan

| Current Route | Future Route | Migration Strategy | SEO Impact |
|---------------|-------------|-------------------|------------|
| `/` | `/` | No change | None — same URL |
| `/text-to-qr-code` | `/text-to-qr` | Possible options: keep existing URL if it has SEO value, redirect only after SEO review, use Canonical URL, or implement tool on existing URL. Decision after GSC data and Product Owner preference. | Depends on chosen strategy |
| `/free-qr-code-generator` | N/A or `/text-to-qr` | Possible options: keep, redirect, or implement on existing URL. Decision after GSC data and Product Owner preference. | Depends on chosen strategy |
| `/share-text-online` | N/A or `/text-to-qr` | Possible options: keep, redirect, or implement on existing URL. Decision after GSC data and Product Owner preference. | Depends on chosen strategy |
| `/qr-code-for-text` | N/A or `/text-to-qr` | Possible options: keep, redirect, or implement on existing URL. Decision after GSC data and Product Owner preference. | Depends on chosen strategy |
| `/transfer-text-between-devices` | N/A or `/text-to-qr` | Possible options: keep, redirect, or implement on existing URL. Decision after GSC data and Product Owner preference. | Depends on chosen strategy |
| N/A | `/scan-qr` | New route | Positive — new search entry point |
| N/A | `/png-to-svg` | New route | Positive — new search entry point |
| N/A | `/svg-to-png` | New route | Positive — new search entry point |
| N/A | `/svg-viewer` | New route | Positive — new search entry point |
| N/A | `/image-to-text` | New route | Positive — new search entry point |
| N/A | `/remove-background` | New route | Positive — new search entry point |
| N/A | `/image-compressor` | New route | Positive — new search entry point |
| N/A | `/image-resizer` | New route | Positive — new search entry point |
| N/A | `/heic-to-jpg` | New route | Positive — new search entry point |
| N/A | `/passport-photo-maker` | New route | Positive — new search entry point |
| `/view/[id]` | `/view/[id]` | No change | None — same URL |
| `/blog` | `/blog` | No change | None — same URL |
| `/blog/[slug]` | `/blog/[slug]` | No change | None — same URL |
| `/blog/category/[category]` | `/blog/category/[category]` | No change | None — same URL |
| `/about` | `/about` | No change | None — same URL |
| `/contact` | `/contact` | No change | None — same URL |
| `/faq` | `/faq` | No change | None — same URL |
| `/privacy` | `/privacy` | No change | None — same URL |
| `/terms` | `/terms` | No change | None — same URL |
| `/sitemap` | `/sitemap` | No change | None — same URL |
| `/sitemap.xml` | `/sitemap.xml` | No change (dynamic route) | None — same URL |

---

## 7. Dependency Refactoring Plan

| Package | Current Usage | Future Usage | Action | Risk |
|---------|--------------|-------------|--------|------|
| `next` 13.5.1 | Framework | Framework | **Keep** | None |
| `react` 18.2.0 | UI library | UI library | **Keep** | None |
| `react-dom` 18.2.0 | DOM rendering | DOM rendering | **Keep** | None |
| `typescript` 5.2.2 | Type system | Type system | **Keep** | None |
| `tailwindcss` 3.3.3 | Styling | Styling | **Keep** | None |
| `tailwindcss-animate` 1.0.7 | Animation utilities | May not be needed | **Verify usage, candidate for removal** | Low — verify no imports |
| `@supabase/supabase-js` 2.58 | Database | Database | **Keep** | None |
| `qrcode.react` 4.2.0 | QR generation | QR generation | **Keep** | None |
| `lucide-react` 0.446 | Icons | Icons | **Keep** | None |
| `sonner` 1.5 | Toast notifications | Toast notifications | **Keep** | None |
| `clsx` 2.1 | Class name utility | Class name utility | **Keep** | None |
| `tailwind-merge` 2.5 | Class name merging | Class name merging | **Keep** | None |
| `class-variance-authority` 0.7 | Variant props | May not be needed | **Verify usage, candidate for removal** | Low — shadcn/ui may use it |
| `@radix-ui/*` (20+ primitives) | UI primitives | Subset needed | **Audit and prune unused primitives** | Medium — many may be unused |
| `next-themes` 0.3 | Theme switching | Not needed | **Remove after refactoring components** | Medium — ensure no remaining imports |
| `framer-motion` 12.40 | Animations | Not needed | **Remove after refactoring components** | High — currently used in 10+ components |
| `react-hook-form` 7.53 | Form handling | May not be needed | **Verify usage, candidate for removal** | Low — contact form uses it |
| `zod` 3.23 | Validation | May not be needed | **Verify usage, candidate for removal** | Low — contact form uses it |
| `@hookform/resolvers` 3.9 | Form validation | May not be needed | **Verify usage, candidate for removal** | Low — contact form uses it |
| `recharts` 2.12 | Charts | Not needed | **Verify usage, candidate for removal** | Low |
| `embla-carousel-react` 8.3 | Carousel | Not needed | **Verify usage, candidate for removal** | Low |
| `cmdk` 1.0 | Command palette | Could be useful for search | **Evaluate for search implementation** | Low |
| `vaul` 0.9 | Drawer | Not needed | **Verify usage, candidate for removal** | Low |
| `input-otp` 1.2 | OTP input | Not needed | **Verify usage, candidate for removal** | Low |
| `date-fns` 3.6 | Date formatting | Not needed | **Verify usage, candidate for removal** | Low |
| `react-resizable-panels` 2.1 | Resizable panels | Not needed | **Verify usage, candidate for removal** | Low |
| `@resvg/resvg-js` 2.1 (dev) | OG image generation | OG image generation | **Keep** | None |
| `playwright` 1.61 (dev) | Testing | Testing | **Keep** | None |
| `eslint` / `eslint-config-next` | Linting | Linting | **Keep** | None |
| `postcss` / `autoprefixer` | CSS processing | CSS processing | **Keep** | None |

---

## 8. Styling Migration Plan

### Current UI → PRD UI

| Aspect | Current | PRD Target | Migration Steps |
|--------|---------|------------|-----------------|
| **Primary colour** | Indigo (#4F46E5, #6366F1) / Purple (#8B5CF6) | Blue | Update Tailwind `colors.primary` to blue palette. Replace all indigo/purple references in components. |
| **Background** | White with gradient blobs and decorative elements | Solid white | Remove gradient blobs from HeroSection (deleted). Ensure no remaining gradient backgrounds in any component. |
| **Surface** | White/light with gradient hover states | Light grey | Add `--surface` CSS variable; update card/input backgrounds. |
| **Typography** | Inter font, gradient text on headings | Inter font, near-black headings | Remove `.gradient-text` class. Ensure all headings use `#111827` or similar near-black. |
| **Spacing** | Tailwind default scale, inconsistent section padding | Consistent spacing scale | Apply PRD spacing system: sm/md/lg/xl. Standardise section-padding, container widths. |
| **Buttons** | Indigo/purple gradient background, white text | Blue background, white text (primary); White background, blue border, blue text (secondary) | Replace gradient with solid blue. Add secondary button variant. |
| **Cards** | Gradient backgrounds, hover effects, decorative borders | Simple white/light grey, minimal borders, consistent spacing | Remove gradient backgrounds, remove hover scale transforms, standardise border radius. |
| **Forms** | shadcn/ui defaults | Rounded corners, visible border, clear placeholder, consistent height | Verify shadcn defaults match PRD; minor adjustments if needed. |
| **Border radius** | Tailwind `rounded-lg` / `rounded-xl` | Consistent rounded | Standardise on one radius value per PRD (`--radius 0.75rem`). |
| **Shadows** | Subtle shadows present | Subtle shadows only | Remove heavy shadows, remove glow effects. Keep only minimal shadows. |
| **Dark mode** | Full dark theme with CSS variables | Permanently disabled | Remove `next-themes`, `dark:` variants, dark CSS variables. Remove `class` dark mode strategy from Tailwind. |
| **Animations** | framer-motion stagger, slide, scale, fade | Minimal: only hover effects, button feedback, loading indicators | Remove framer-motion. Replace with CSS transitions where needed. |
| **Icons** | lucide-react outline icons | Outline icons only | ✅ Already compliant. Keep as-is. |
| **Grid / Layout** | Tailwind grid, container classes | Same approach, consistent spacing | Standardise container width, gutter spacing, grid column counts. |

### Implementation Approach

1. Update `tailwind.config.ts` — replace colour palette, remove dark mode, remove gradient keyframes
2. Update `app/globals.css` — remove gradient/glass classes, remove dark CSS vars, add PRD design tokens
3. Remove or refactor all component-level gradient and dark mode references
4. Verify visual consistency across all pages

---

## 9. SEO Migration Plan

| Element | Current State | Target State | Implementation |
|---------|--------------|--------------|----------------|
| **SEO Titles** | Only homepage and blog have unique titles; 5 stubs have thin metadata | Every page has unique SEO Title per KEYWORD_STRATEGY.md | Add `metadata` export to every tool page. Title format: `"{Primary Keyword} | ShareTextQR"` |
| **Meta Descriptions** | Only homepage and blog have descriptions; stubs are thin | Every page has unique Meta Description per KEYWORD_STRATEGY.md | Add description to every tool page. Natural inclusion of Primary Keyword. |
| **H1 Headings** | Only homepage and blog pages have H1 | Every page has exactly one H1 equalling the Primary Keyword | Implement via ToolHeader component |
| **Hero Taglines** | Only homepage has tagline | Every tool page has one tagline containing Primary Keyword | Implement via ToolHeader component |
| **Canonical URLs** | Only in root layout (hardcoded) | Every page has its own canonical URL | Add `alternates: { canonical: ... }` to every page's metadata |
| **Open Graph** | Homepage and blog have OG; tools missing | Every page has OG title, description, image, URL | Add `openGraph` to every page's metadata |
| **Twitter Card** | Homepage and blog have Twitter card; tools missing | Every page has Twitter card metadata | Add `twitter` to every page's metadata |
| **BreadcrumbList schema** | Not present on any page | Every page has BreadcrumbList JSON-LD | Implement via Breadcrumb component that renders structured data |
| **SoftwareApplication schema** | Only on homepage (WebApplication) | Every tool page has SoftwareApplication schema | Add JSON-LD to each tool page with tool name, description, operating system, application category |
| **FAQPage schema** | Only on homepage and FAQ page | Every tool page has FAQPage schema with per-tool unique questions | Implement via ToolFAQ component that renders structured data |
| **Article schema** | ✅ Present on blog posts | Keep as-is | No change needed |
| **Organization schema** | Only on homepage | Keep as-is, consider adding to layout | Minor enhancement |
| **WebSite schema** | ✅ In root layout | Keep as-is | No change needed |
| **XML Sitemap** | Dynamic route exists, covers 13 static + 7 categories + 11 blog = 31 URLs | Add all 11 tool routes, ensure correct priorities | Update `app/sitemap.xml/route.ts` |
| **robots.txt** | Allow all, points to sitemap | Verify, add Disallow for admin/internal if needed | Review and update |
| **Internal linking** | Blog has links; homepage and tools missing | Every tool page links to Related Tools + Latest Articles | Implement via RelatedTools and LatestArticles components |
| **URL slugs** | `/text-to-qr-code`, 5 stub URLs | `/text-to-qr`, `/scan-qr`, `/png-to-svg`, etc. per KEYWORD_STRATEGY.md | Create new routes, handle old URLs per Product Owner decision |

---

## 10. Risk Register

### Technical Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R1 | Removing ThemeProvider causes hydration errors | Medium | High | Test thoroughly; ensure no child components reference theme context |
| R2 | Deleting 8 section components leaves dangling imports | Medium | High | Run `tsc --noEmit` and `next build` to catch all orphaned imports |
| R3 | framer-motion removal breaks existing animations in remaining components | High | Medium | Refactor animations to CSS transitions before removing package |
| R4 | Image tool dependencies (Tesseract.js, heic2any) increase bundle size | Medium | Medium | Use dynamic imports / lazy loading for heavy libraries |
| R5 | Camera API not supported on all devices | Low | Medium | Provide fallback UI: "Please use a device with a camera" |
| R6 | Ad containers cause CLS if not sized correctly | Medium | High | Reserve fixed dimensions for ad slots, test with real ad scripts |

### SEO Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R7 | Old URL slugs lose ranking during migration | Medium | High | Use Canonical URLs, implement 301 redirects only after SEO review |
| R8 | Duplicate content if old and new slugs both resolve | Medium | High | Ensure only one URL per page is canonical; redirect or noindex old URLs |
| R9 | SEO stubs with thin content penalise domain authority | High | Medium | Resolve stub pages per Product Owner decision early in refactoring |
| R10 | New tool pages initially have no backlinks | Low | Low | Accept as normal; SEO value builds over time with internal linking |

### Deployment Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R11 | Netlify build fails after dependency removal | Medium | High | Test `next build` locally before every push |
| R12 | Environment variables misconfigured in production | Low | High | Verify Netlify env vars match `.env.example` |
| R13 | Deployment introduces regressions in existing functionality | Medium | High | Run full regression test suite before each deployment |

### Rollback Strategy

If a production issue is identified after deployment:

1. **Stop further deployments** until the issue is understood.
2. **Identify the root cause** — determine if it is specific to the latest release or a pre-existing issue.
3. **Rollback to the previous stable version** via Netlify's deploy rollback feature or by reverting the Git commit.
4. **Verify system stability** after rollback (homepage, tools, blog, search all functional).
5. **Resolve the issue** in a development branch.
6. **Test the fix locally** before deploying again.
7. **Document the issue** in DECISION_LOG.md.

---

## 11. Validation Checklist

Every phase must satisfy the following before being marked complete:

### Functional Validation
- [ ] All existing tools continue to work (regression test)
- [ ] All new tools function correctly (input, processing, output, download, error handling)
- [ ] All tool states implemented (initial, loading, success, error, empty)
- [ ] Input validation works correctly
- [ ] Error messages are human-readable

### UI Validation
- [ ] White background, blue accent colour scheme applied
- [ ] No dark mode present
- [ ] No gradients, glassmorphism, or decorative illustrations
- [ ] No marketing sections (testimonials, trust stats, CTAs, etc.)
- [ ] Consistent spacing and typography
- [ ] Responsive on mobile, tablet, desktop
- [ ] Advertisement containers integrated naturally

### SEO Validation
- [ ] Every page has unique SEO Title
- [ ] Every page has unique Meta Description
- [ ] Every page has canonical URL
- [ ] Every page has Open Graph metadata
- [ ] Every tool page has SoftwareApplication schema
- [ ] Every tool page has FAQPage schema
- [ ] Every page has BreadcrumbList schema
- [ ] XML sitemap includes all pages
- [ ] No duplicate content accessible

### Performance Validation
- [ ] Lighthouse Performance ≥95
- [ ] Lighthouse Accessibility =100
- [ ] Lighthouse Best Practices =100
- [ ] Lighthouse SEO =100
- [ ] Core Web Vitals within recommended thresholds
- [ ] No console errors

### Accessibility Validation
- [ ] Keyboard navigation works on all interactive elements
- [ ] Visible focus states on all interactive elements
- [ ] Semantic HTML structure
- [ ] Screen reader compatible
- [ ] Sufficient colour contrast
- [ ] Forms have accessible labels

### Documentation Validation
- [ ] MASTER_SPECIFICATION.md updated if requirements changed
- [ ] DECISION_LOG.md updated with all decisions made during phase
- [ ] KEYWORD_STRATEGY.md updated if keywords changed
- [ ] RELEASE_CHECKLIST.md completed

---

## 12. Final Approval

Implementation must not begin until all of the following are satisfied:

| Condition | Status |
|-----------|--------|
| ✓ Product Owner has approved the Repository Analysis Report | Pending |
| ✓ Product Owner has approved the MASTER_SPECIFICATION.md | Pending |
| ✓ Product Owner has approved the Repository Refactoring Plan | Pending |
| ✓ All documentation is up to date before implementation begins | Pending |
| ✓ Baseline performance measurements have been recorded | Pending |
| ✓ Product Owner has decided on SEO stub migration strategy | Pending |

**Approval process:**

1. Product Owner reviews this document.
2. Product Owner provides approval, requests changes, or rejects.
3. If approved, implementation begins with Phase 1 — Foundation Cleanup.
4. Each subsequent phase requires Product Owner approval before proceeding.
5. The project is considered complete when all 10 phases have been approved and deployed.

---

**End of Repository Refactoring Plan**

**Version:** 1.0.0  
**Status:** 🔒 LOCKED

---

# Change Control

This document is LOCKED.

No modifications may be made without explicit Product Owner approval.

If implementation reveals:

- a conflict,
- an ambiguity,
- a missing requirement,
- an implementation issue,
- or a possible improvement,

DeepSeek must:

1. Stop implementation.
2. Report the issue.
3. Wait for Product Owner approval.
4. Record every approved change in DECISION_LOG.md.
5. Increase the document version before making any modification.
