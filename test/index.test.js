'use strict';

const {run} = require('./utils');

it('doesn\'t touch regular blocks', () =>
    run(
        'a { color: black; }',
        'a { color: black; }',
    ),
);

it('enables multiple plugins', () =>
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

it('supports custom ieSelector', () =>
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
