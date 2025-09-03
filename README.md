# Soft Hyphen Helper for Kirby CMS
Kirby CMS:
https://getkirby.com/

## How to use
You can use this field method on every field that contains text as follwing:
```php
$page->text()->softHyphen()
```

This will translate any double bar => || into a soft hyphen
On Mac you type the bar by typing `option ⌥ + 7`

# Blueprint
Use this line under all fields on which you call the `->softHyphen()` method:

```yml
help: |
    <strong style="color: black">||</strong> ⇒ <strong style="color: black">alt</strong>/<strong style="color: black">⌥</strong> + <strong style="color: black">7</strong>): Weicher Bindestrich (Hier die Zeile umbrochen, falls nötig)
```

E.g.:
```yml
fields:
    writer:
        type: writer
        help: |
            <strong style="color: black">||</strong> ⇒ <strong style="color: black">alt</strong>/<strong style="color: black">⌥</strong> + <strong style="color: black">7</strong>): Weicher Bindestrich (Zeilenumbruch nur falls nötig)
```
