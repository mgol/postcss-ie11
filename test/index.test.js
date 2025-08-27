import test from 'node:test';

import {run} from './utils.js';

test('doesn\'t touch regular blocks', () =>
    run(
        'a { color: black; }',
        'a { color: black; }',
    ),
);

test('enables multiple plugins', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            :ie11 .custom-class { color: black; }
        `,
        `
            @supports not (display: grid) {
                a { color: black; }
            }
                _:-ms-fullscreen, a { color: black; }
            _:-ms-fullscreen, .custom-class { color: black; }
        `,
    ),
);

test('supports custom ieSelector', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            :ie11 .custom-class { color: black; }
        `,
        `
            @supports not (display: grid) {
                a { color: black; }
            }
                _:-ms-lang(x), a { color: black; }
            _:-ms-lang(x), .custom-class { color: black; }
        `,
        {ieSelector: '_:-ms-lang(x)'},
    ),
);

test('allows to selectively disable plugins', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            :ie11 .custom-class { color: black; }
        `,
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            _:-ms-fullscreen, .custom-class { color: black; }
        `,
        {plugins: {supports: false}},
    ),
);

test('allows to disable all plugins', () =>
    run(
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            :ie11 .custom-class { color: black; }
        `,
        `
            @supports not (display: grid) {
                a { color: black; }
            }
            :ie11 .custom-class { color: black; }
        `,
        {plugins: {supports: false, pseudoClass: false}},
    ),
);
