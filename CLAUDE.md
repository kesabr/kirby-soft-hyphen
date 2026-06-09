# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## What this is

A Kirby 4 panel plugin (`kesabr/kirby-soft-hyphen`) that adds a soft hyphen toolbar button to the writer field. Clicking the button inserts a real soft hyphen (`­`) at the cursor, wrapped in `<span class="k-shy">` so it is visible in the editor as a small tick marker. The `->softHyphen()` field method strips those spans for clean frontend output.

## Structure

- `index.php` — registers the `softHyphen` field method (strips `<span class="k-shy">` wrappers; also converts `||` → `­` for text/textarea fields)
- `composer.json` — package metadata
- `src/index.js` — panel plugin source: registers the `softHyphen` writerMark and custom icon
- `src/index.css` — styles for the `.k-shy` tick marker shown in the writer
- `index.js` — compiled panel JS (produced by `npm run build`, do not edit directly)
- `index.css` — compiled panel CSS (produced by `npm run build`, do not edit directly)

## Build

Uses [kirbyup](https://github.com/johannschopplich/kirbyup). After editing `src/`:

```bash
npm run build
```

## How the panel side works

The plugin registers a `writerMark` named `softHyphen`:

- **`schema`** — ProseMirror mark spec with `toDOM: ["span", {class: "k-shy"}, 0]` and `parseDOM: [{tag: "span.k-shy"}]`. `inclusive: false` prevents the mark from spreading to adjacent typed text.
- **`commands()`** — inserts `­` as text and immediately applies the `softHyphen` mark to that one character in a single transaction.
- **`button`** — getter (evaluated at editor mount time so the panel language is available) returning the toolbar button with a custom SVG icon and a localised label (en: "Soft Hyphen", de: "Weicher Bindestrich").

The custom icon is registered via `icons: { softHyphen: "..." }`. Kirby renders plugin icons in a `viewBox="0 0 24 24"` symbol, so the 20×20 SVG path is wrapped in `<g transform="translate(2,2)">` to centre it.

## Blueprint usage

```yml
fields:
  text:
    type: writer
    marks:
      - bold
      - italic
      - softHyphen
```

## Template usage

```php
<?= $page->text()->softHyphen() ?>
```

This strips `<span class="k-shy">­</span>` → `­` for clean frontend HTML. The soft hyphen still triggers browser hyphenation at that position.

## Storage format

Soft hyphens are stored as `<span class="k-shy">­</span>` in Kirby's content files. This survives Kirby's HTML sanitizer (`<span>` and `class` are both on the allowlist). The `->softHyphen()` field method removes the spans before frontend output.
