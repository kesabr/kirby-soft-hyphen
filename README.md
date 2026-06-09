# Kirby Soft Hyphen

[![Kirby 4](https://img.shields.io/badge/Kirby-4-CF0B3F)](https://getkirby.com) [![Kirby 5](https://img.shields.io/badge/Kirby-5-CF0B3F)](https://getkirby.com)

Take control of hyphenation — place soft hyphens exactly where you want them, right from the panel. Soft hyphens are invisible in the browser but tell the browser to break and hyphenate at that position when the line is too long. No more relying on automatic hyphenation algorithms that break words in the wrong place.

The plugin adds a **soft hyphen button to the Writer toolbar**.

## Installation

Drop the `kirby-soft-hyphen` folder into `site/plugins/` of your Kirby project.

## Features

- A soft hyphen button for the Writer field.
- Soft hyphens are highlighted inside the Writer.
- `->softHyphen()` field method to clean soft hyphen markup before frontend output.
- `||` shorthand for inserting soft hyphens in text and textarea fields.


## Usage

### Writer field

Add `softHyphen` to the `marks` list of any writer field in your blueprint:

```yml
fields:
  text:
    type: writer
    marks:
      - bold
      - # your marks
      - softHyphen
```

### Field method `->softHyphen()`

Call `->softHyphen()` on any field before outputting it in a template:

```php
<?= $page->text()->softHyphen() ?>
```

**Writer fields** — The writer stores soft hyphens wrapped in `<span class="k-shy">` for editor visibility. `->softHyphen()` strips those spans so only the bare `­` entity remains in the frontend HTML. The soft hyphens technically work even without this call (the entity is already inside the span), but calling it keeps your markup clean.

**Text / textarea fields** — Type `||` where you want a soft hyphen. `->softHyphen()` is required to convert `||` → `­` in the output.
