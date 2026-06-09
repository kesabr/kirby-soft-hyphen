# Implementation Plan: Soft Hyphen Writer Plugin

## Overview

Add a toolbar button to Kirby's writer field that inserts a real soft hyphen (`­`) at the cursor, and display existing soft hyphens visually in the panel using an overlay. The display approach is ported from hansipete/kirby-soft-hyphens. The build step (kirbyup) is needed to bundle the panel JS — our source will be plain JS with no Vue SFCs, so the build is lightweight.

---

## Step 1 — Bootstrap the build tooling

- Add `package.json` with `kirbyup` as the only dev dependency and two scripts:
  - `dev`: `kirbyup src/index.js --watch` (rebuilds on save)
  - `build`: `kirbyup src/index.js` (one-shot, produces `index.js` + `index.css` in root)
- Create `src/index.js` (empty `panel.plugin()` call) and `src/index.css` (empty)
- Run `npm install`, then `npm run build`
- Confirm `index.js` and `index.css` appear in the plugin root

---

## Step 2 — Set up a Kirby plainkit for testing

Kirby's plainkit is the minimal starter. Install it adjacent to (not inside) the plugin folder:

```bash
composer create-project getkirby/plainkit ../kirby-test
```

Start the built-in PHP server from the plainkit root:

```bash
php -S localhost:8888 -t ../kirby-test kirby/router.php
```

Open `http://localhost:8888/panel` and complete the setup wizard to create an admin account. Kirby runs without a license key in local development.

---

## Step 3 — Link the plugin into the plainkit

Use a symlink so changes in the plugin folder are instantly reflected without copying:

```bash
ln -s "$(pwd)" ../kirby-test/site/plugins/kirby-soft-hyphen
```

After `npm run build`, reload the panel and check the browser console for JS errors. If the plugin registered correctly, there will be no errors.

---

## Step 4 — Configure a test blueprint and template

Add a writer field to the plainkit's default blueprint so we have something to test against.

**`../kirby-test/site/blueprints/pages/default.yml`**
```yaml
title: Default Page
fields:
  body:
    type: writer
    toolbar:
      - bold
      - italic
      - softHyphen   # our custom button — will appear once registered
```

**`../kirby-test/site/templates/default.php`**
```php
<?php snippet('header') ?>
<article>
  <?= $page->body()->value() ?>
</article>
<?php snippet('footer') ?>
```

Create a test page in the panel. At this point the writer loads (without our button yet). This is the baseline.

---

## Step 5 — Implement the toolbar button

In `src/index.js`, register a custom writer button via `panel.plugin()`. The button dispatches a ProseMirror transaction that inserts `­` at the current cursor position.

Key points:
- Kirby 4 uses Vue 3. The `use` array in `panel.plugin()` receives the Vue app instance, not the Vue constructor — so it's `app.mixin()`, not `Vue.mixin()`.
- The writer field exposes its ProseMirror `view` on the component instance. We use `view.dispatch(view.state.tr.insertText('­'))` to insert the character.
- The button is registered under a name that matches what the blueprint's `toolbar` list uses (`softHyphen`).

Verify: button appears in the toolbar, clicking it inserts an invisible character at cursor position. Save and reload — the character must survive the round-trip (Kirby's HTML sanitizer must not strip `­`).

> **Note:** Kirby's Sane HTML sanitizer may strip `­` or `­` by default. If the character disappears on save, we need to whitelist it — either via a custom Sane config or by storing it as `­` and relying on the browser to interpret it. This needs to be tested and handled in this step before moving on.

---

## Step 6 — Implement the visual overlay

Port hansipete's overlay approach, adapted for Kirby 4 / Vue 3:

- In the mounted hook of the `k-writer-input` mixin, create an overlay `<div>` that mirrors the field's HTML content
- Replace every `­` in the mirrored content with `­<shy></shy>` (soft hyphen stays for correct text width; `<shy>` is the styled marker)
- Watch `value` prop and update the overlay on change
- Append the overlay div to `this.$el`

In `src/index.css`:
- `shy` → `inline-block`, zero width, `position: relative`
- `shy::before` → 1px wide, absolute, light gray background, full height — the visible tick

Verify: after inserting a soft hyphen with the button, a small gray marker appears at that position in the editor. The overlay must be `pointer-events: none` and must not intercept clicks or selections.

---

## Step 7 — Update index.php

- Register the compiled `index.js` and `index.css` as panel assets
- Remove the `->softHyphen()` field method (it replaced `||` with `­`; we now store real soft hyphens directly, so no transform is needed)
- Update `composer.json` description

---

## Step 8 — End-to-end test

Work through this checklist in the plainkit:

- [ ] Button visible in writer toolbar
- [ ] Clicking button inserts a soft hyphen (overlay marker appears immediately)
- [ ] Saving the page preserves the soft hyphen (not stripped by sanitizer)
- [ ] Reloading the page shows the marker in the correct position
- [ ] Frontend HTML contains `­` or `­` at the right location
- [ ] Browser hyphenates at that point when the viewport is narrow enough
- [ ] No JS console errors at any step
- [ ] Marker is not selectable / does not interfere with text selection

---

## Step 9 — Clean up

- Remove the old `||` workflow from README
- Update README with new usage: add `softHyphen` to the blueprint toolbar, done
- Update CLAUDE.md with the build step and src layout
- Run `npm run build` one final time before committing
