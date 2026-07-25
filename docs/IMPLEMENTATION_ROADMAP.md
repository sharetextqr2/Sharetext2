# Implementation Roadmap

**Project Name:** ShareTextQR

**Document Version:** 1.2.0

**Status:** 🔒 LOCKED

---

# Purpose

This document defines the official implementation roadmap for ShareTextQR.

It converts the approved PRD into an implementation plan for DeepSeek V4.

DeepSeek must follow this roadmap together with the MASTER_SPECIFICATION.md and the Repository Refactoring Plan.

Implementation must occur phase by phase.

Supplementary documentation (do not duplicate):

- **MASTER_SPECIFICATION.md** — single source of truth for all product requirements
- **REPOSITORY_ANALYSIS_REPORT.md** — full repository analysis, component audit, PRD compliance assessment
- **REPOSITORY_REFACTORING_PLAN.md** — detailed phase-by-phase implementation steps, file lists, risk register, component matrix

---

# Global Implementation Rule

Implementation must strictly follow the approved documentation.

The implementation priority is:

1. **MASTER_SPECIFICATION.md** (Single Source of Truth)
2. **REPOSITORY_REFACTORING_PLAN.md**
3. **IMPLEMENTATION_ROADMAP.md**
4. **KEYWORD_STRATEGY.md**
5. **DEEPSEEK_IMPLEMENTATION_GUIDE.md**

No code may be implemented unless it is defined in the MASTER_SPECIFICATION.md.

If a requirement is missing, ambiguous, or conflicts with the repository, implementation must stop and the issue must be reported to the Product Owner before continuing.

DeepSeek must never invent new features, layouts, workflows, components, or architecture.

---

# Phase 1 – Foundation Cleanup

Status

Active — First Implementation Phase

**Prerequisites (already completed):**
- Repository Analysis (REPOSITORY_ANALYSIS_REPORT.md)
- Repository Refactoring Plan (REPOSITORY_REFACTORING_PLAN.md)
- Product Owner approval

Objectives

• Remove dark mode infrastructure.

• Align design system with PRD Chapter 2.

• Remove marketing section components.

• Rewrite homepage to utility layout.

• Clean up dependencies.

• Consolidate duplicate migrations.

**Dependencies:** None — this is the first implementation phase.

**Validation:**
- No dark mode toggle or theme provider present
- No gradient, glass, or decorative CSS visible
- Homepage renders PRD utility layout (Search → Popular Tools → Ad → Latest Tools → Ad → Latest Articles → Ad → Footer)
- Text→QR and blog still functional
- Lighthouse baseline recorded

**Exit Criteria:**
- [ ] Dark mode infrastructure removed
- [ ] Marketing sections removed
- [ ] Design system aligned with PRD (white + blue, no gradients, no glassmorphism)
- [ ] Homepage rewritten to utility layout
- [ ] TypeScript and build pass without errors

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 2 – Global Architecture

Objectives

Implement reusable global components.

Deliverables

• Header (refactored: flat logo, nav: QR / Images / Blog / Search, no theme toggle)

• Footer (refactored: PRD link structure)

• Search component (global, tool-only)

• Advertisement Container (CLS-safe, responsive)

• Breadcrumb (wired up with BreadcrumbList schema)

• Global Layout

**Dependencies:** Phase 1

**Validation:**
- Header displays correct navigation items
- Search accessible from every page, returns tool results
- Footer links match PRD structure
- AdContainer renders with reserved space (no CLS)

**Exit Criteria:**
- [ ] All global components functional and reusable
- [ ] Search available across all page types
- [ ] Breadcrumb renders on inner pages with correct schema

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 3 – Homepage

Objectives

Implement the approved Homepage.

Deliverables

• Search

• Popular Tools

• Latest Tools

• Latest Articles

• Advertisement placements

• Footer

**Dependencies:** Phase 2

**Validation:**
- Search visible above the fold
- Popular/Latest Tools sections render (links may point to stubs for unbuilt tools)
- Latest Articles section renders content from blog data
- Ad placements correct per PRD Chapter 4

**Exit Criteria:**
- [ ] Homepage matches PRD Chapter 4 layout exactly
- [ ] No marketing sections present
- [ ] SEO stub pages handled per Product Owner decision

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 4 – QR Tools

Objectives

Implement all approved QR tools.

Deliverables

• Text → QR (refactor existing into universal tool template)

• Scan QR with Webcam (new tool)

**Dependencies:** Phase 2, Phase 3

**Validation:**
- Text→QR generates, downloads, and copies QR codes
- Scan QR accesses camera, decodes QR, handles permission denial
- Both tools have per-tool FAQ, SoftwareApplication schema, BreadcrumbList schema

**Exit Criteria:**
- [ ] Both QR tools functional and SEO-complete
- [ ] Error states handled (empty input, camera denied, camera unavailable)

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 5 – Image Tools

Objectives

Implement all approved Image tools.

Deliverables

• PNG → SVG

• SVG → PNG

• SVG Viewer

• Image to Text

• Remove Background

• Image Compressor

• Image Resizer

• HEIC → JPG

• Passport Photo Maker

**Dependencies:** Phase 2, Phase 4

**Validation:**
- All 9 tools process, preview, and download correctly
- Invalid file types rejected with clear error messages
- Each tool has per-tool FAQ and SEO metadata

**Exit Criteria:**
- [ ] All 9 image tools functional
- [ ] Each tool handles initial, loading, success, and error states
- [ ] Each tool has unique SEO Title, Meta Description, and JSON-LD

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 6 – SEO

Objectives

Implement complete SEO architecture.

Deliverables

• Metadata (per-tool Title, Description, Keywords)

• Canonical URLs (every page)

• Open Graph (every page)

• Structured Data (SoftwareApplication, FAQPage, BreadcrumbList)

• XML Sitemap (all 11 tool routes, blog, categories, legal pages)

• Robots.txt (verified)

**Dependencies:** Phase 4, Phase 5

**Validation:**
- Every page has unique Title, Description, canonical, and OG metadata
- Every tool page has SoftwareApplication + FAQPage + BreadcrumbList JSON-LD
- XML sitemap includes all routes with correct priorities
- Lighthouse SEO = 100 on all pages

**Exit Criteria:**
- [ ] All pages pass SEO validation
- [ ] No duplicate content, no missing metadata
- [ ] Internal linking implemented across all pages

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 7 – Blog

Objectives

Implement Blog architecture.

Deliverables

• Blog Homepage

• Article Template

• Categories

• Internal Linking

**Dependencies:** Phase 2, Phase 6

**Validation:**
- Blog index renders all 11 posts with categories
- Article pages display content, related tools, and related articles
- Internal links between blog and tools function correctly

**Exit Criteria:**
- [ ] Blog architecture matches PRD Chapter 10
- [ ] Styling and metadata aligned with PRD design system
- [ ] Routing architecture unchanged (preserved as-is)

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 8 – Optimisation

Objectives

Improve performance and accessibility.

Deliverables

• Lighthouse optimisation

• Core Web Vitals

• Responsive improvements

• Accessibility improvements

**Dependencies:** Phase 7

**Validation:**
- Lighthouse Performance ≥95 on all pages
- Lighthouse Accessibility =100 on all pages
- Lighthouse Best Practices =100 on all pages
- Keyboard navigation and focus states verified

**Exit Criteria:**
- [ ] All Lighthouse targets achieved
- [ ] Core Web Vitals within recommended thresholds
- [ ] No console errors on any page

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 9 – Testing

Objectives

Validate production readiness.

Deliverables

• Functional testing (every tool, every state)

• Responsive testing (mobile, tablet, desktop)

• SEO validation

• Accessibility validation

• Performance validation

• Regression testing (existing functionality preserved)

**Dependencies:** Phase 8

**Validation:**
- All 11 tools pass functional tests
- Cross-browser verified (Chrome, Edge, Firefox, Safari)
- No regressions in existing functionality

**Exit Criteria:**
- [ ] All tests pass
- [ ] No critical or high-severity defects remain
- [ ] Product Owner approves test results

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Phase 10 – Production Release

Objectives

Deploy production-ready ShareTextQR.

Deliverables

• Git Commit (clean history)

• GitHub Push

• Production Deployment (Netlify)

• Post-deployment verification

**Dependencies:** Phase 9

**Validation:**
- Homepage loads correctly in production
- All 11 tool pages accessible and functional
- Blog, search, and advertisements working
- No console errors

**Exit Criteria:**
- [ ] Deployment successful
- [ ] Post-deployment verification passed
- [ ] Product Owner approves release

**Phase Approval Required:** Product Owner approval is required before implementation may proceed to the next phase. No subsequent phase may begin until approval has been received.

---

# Success Criteria

The project is complete when:

• All PRD requirements are implemented.

• All approved tools are production-ready.

• Lighthouse targets are achieved.

• SEO architecture is complete.

• Accessibility requirements are satisfied.

• No critical defects remain.

• Product Owner approves the release.

---

# DeepSeek Instructions

DeepSeek must follow these principles throughout implementation:

1. **Follow MASTER_SPECIFICATION.md as the single source of truth.** If any implementation conflicts with the PRD, the PRD takes priority.

2. **Follow the Repository Refactoring Plan during implementation.** Refer to it for file lists, component matrices, risk registers, and detailed phase breakdowns.

3. **Implement one phase at a time.** No phase may begin until the previous phase has been completed and verified.

4. **Never skip phases.** Each phase builds on the deliverables of the previous phase.

5. **Never redesign features unless instructed.** Implement exactly what the PRD and Repository Refactoring Plan specify.

6. **Preserve existing working functionality.** Text→QR, blog, view page, Supabase integration, and other working features must continue to function throughout refactoring.

7. **Reuse existing components whenever possible.** Before creating any new component, search the existing repository. Extend before creating.

8. **Refactor before rewriting.** Prefer modifying existing code over replacing it.

9. **Stop and report any conflict with the PRD instead of making assumptions.** If a requirement is unclear or appears to conflict with the existing codebase, document the issue and seek Product Owner clarification.

10. **Keep the repository deployable after every phase.** Each phase must result in a working application. No phase should leave the project in a broken state.

11. **Update DECISION_LOG.md whenever an implementation decision changes the approved specification.** Every significant decision must be documented before code is committed.

---

End of Implementation Roadmap

Version: 1.2.0

Status: 🔒 LOCKED

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