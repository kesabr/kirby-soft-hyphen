# Soft Hyphen Helper for Kirby CMS
Find out more about Kirby CMS here:
https://getkirby.com/

## How to use
You can use this field method on every field that contains text as follwing:
```
$page->text()->softHyphen
```

This will translate any double bar => || into a soft hyphen
On Mac you type the bar by typing `option ⌥ + 7`

# Blueprint
To make users know about this feature add this to the fields where you use this field method:

```
help: |
    <strong style="color: black">||</strong> ⇒ <strong style="color: black">alt</strong>/<strong style="color: black">⌥</strong> + <strong style="color: black">7</strong>): Weicher Bindestrich (Hier die Zeile umbrochen, falls nötig)
```
