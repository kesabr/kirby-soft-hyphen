<?php

use Kirby\Cms\App;

Kirby::plugin('buerospreng/soft-hyphen', [
    'fieldMethods' => [
        'softHyphen' => function ($field) {
            return str_replace('||', '­', $field->value());
        }
    ]
]);
