# Sticker Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an independent, editable sticker catalog with size-based pricing, promotions, and WhatsApp ordering.

**Architecture:** Move the existing sticker UI out of `blog.html` into `stickers.html`. Keep sticker metadata and pricing in focused JavaScript modules, with pure pricing/message helpers tested through Node's built-in test runner.

**Tech Stack:** Static HTML, Tailwind CDN, vanilla JavaScript, Node.js `node:test`, i18next already used by the site.

**Spec:** `docs/superpowers/specs/2026-10-09-sticker-catalog-design.md`

## Global Constraints

- The site remains static; no backend or browser-persistent image upload is introduced.
- Public sticker images live in `images/stickers/`.
- WhatsApp destination is `50764530015`.
- Prices are in USD and use the approved five size tiers and four promotions.
- Customer name and phone are requested immediately before sending and are not stored.

---

### Task 1: Extract pricing and catalog domain logic

**Files:**
- Create: `js/sticker-catalog.js`
- Modify: `js/stickers.js`
- Test: `js/stickers.test.js`

**Interfaces:**
- `js/sticker-catalog.js` exports `STICKER_SIZES`, `STICKER_PROMOTIONS`, and `STICKER_CATALOG`.
- `js/stickers.js` exports `calculateOrder(items)`, `buildWhatsAppMessage(name, phone, items, pricing)`, and `validateOrder(order)`.

- [ ] **Step 1: Write failing tests** for individual totals, the four promotions, choosing the cheapest valid promotion combination, and WhatsApp output containing size, unit price, promotion, and total.
- [ ] **Step 2: Run `node --test js/stickers.test.js` and verify the new assertions fail because the pricing interfaces do not exist.
- [ ] **Step 3: Implement immutable size and promotion configuration plus a deterministic calculator that evaluates individual pricing and valid promotion bundles.
- [ ] **Step 4: Run `node --test js/stickers.test.js` and verify all tests pass.
- [ ] **Step 5: Commit with `git add js/sticker-catalog.js js/stickers.js js/stickers.test.js && git commit -m "feat: add sticker pricing and promotions"`.

### Task 2: Build the independent sticker page

**Files:**
- Create: `stickers.html`
- Modify: `js/stickers.js`
- Modify: `js/translations.js`

**Interfaces:**
- `stickers.html` consumes `STICKER_CATALOG`, `STICKER_SIZES`, `calculateOrder`, `buildWhatsAppMessage`, and `validateOrder`.
- The page exposes one selection row per chosen catalog item, with a size select and live pricing summary.

- [ ] **Step 1: Add page markup modeled on `arduino-boost.html`, including blog navigation, gallery, order summary, customer form, and light/dark and language controls.
- [ ] **Step 2: Add browser event handling that toggles catalog cards, creates size selectors, recalculates the summary, validates the form, and opens `https://wa.me/50764530015`.
- [ ] **Step 3: Add Spanish and English translation keys for the catalog, size labels, promotions, summary, and validation errors.
- [ ] **Step 4: Open `stickers.html` locally and verify images render, size changes update the total, and the order form contains the calculated breakdown.
- [ ] **Step 5: Commit with `git add stickers.html js/stickers.js js/translations.js && git commit -m "feat: add independent sticker catalog page"`.

### Task 3: Replace the embedded blog section and document catalog maintenance

**Files:**
- Modify: `blog.html`
- Modify: `README.md`
- Modify: `js/sticker-catalog.js`

**Interfaces:**
- The blog card links to `stickers.html`.
- README explains how to add an image and catalog entry.

- [ ] **Step 1: Replace the embedded sticker gallery in `blog.html` with a normal blog article card linking to `stickers.html`.
- [ ] **Step 2: Remove obsolete page-specific sticker markup and event wiring from `blog.html` while preserving existing blog cards and theme controls.
- [ ] **Step 3: Add a concise catalog maintenance section to `README.md` with the exact `STICKER_CATALOG` entry shape and image path example.
- [ ] **Step 4: Run `node --test js/stickers.test.js`, `git diff --check`, and inspect the page with the browser.
- [ ] **Step 5: Commit with `git add blog.html README.md js/sticker-catalog.js && git commit -m "refactor: link blog to sticker catalog"`.
