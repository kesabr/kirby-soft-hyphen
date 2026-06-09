<?php

use Kirby\Cms\App as Kirby;

Kirby::plugin('kesabr/kirby-soft-hyphen', [
    'fieldMethods' => [
        'softHyphen' => fn($field) => str_replace(
            '||',
            '­',
            preg_replace(
                '/<span class="k-shy">(.*?)<\/span>/s',
                '\1',
                $field->value()
            )
        )
    ]
]);
