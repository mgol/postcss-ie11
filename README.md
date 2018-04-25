# `postcss-ie11` [![Build Status][ci-img]][ci]

[PostCSS] plugin pack making it easier to work with IE 11.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mgol/postcss-ie11.svg
[ci]:      https://travis-ci.org/mgol/postcss-ie11

This plugin pack adds a few hacks & utilities that make it easier to work with IE 11.

Example input:
```css
@supports (display: grid) {
    .box {
        /* Grid styles, applied to modern browsers. */
    }
}
@supports not (display: grid) {
    .box {
        /* Fallback styles, applied to older browsers, including IE 11. */
    }
}
:ie11 .box {
    /* IE 11 only hacks */
}
```

Example output:
```css
@supports (display: grid) {
    .box {
        /* Grid styles, applied to modern browsers. */
    }
}
@supports not (display: grid) {
    .box {
        /* Fallback styles, applied to older browsers, including IE 11. */
    }
}
_:-ms-fullscreen, .box {
    /* Fallback styles, applied to older browsers, including IE 11. */
}
_:-ms-fullscreen, .box {
    /* IE 11 only hacks */
}
```

## Usage

```js
postcss([
    require('postcss-ie11'),
])
```

### Options

TODO

### Advanced usage

Many of plugins this plugin encompasses rely on a behavior of CSS that if browsers don't recognize a certain selector they drop the whole rule even if other selectors after the unrecognized one match. The default selector used in many of those plugins, `'_:-ms-fullscreen'`, is recognized only by IE 11. You can change it to a different one that is recognized by other browsers by passing a `ieSelector` option, e.g.:
```js
postcss([
    require('postcss-ie11')({
        ieSelector: '_:-ms-lang(x)',
    }),
])
```
will match IE 10 and 11. Note, however, that IE 10 support is not official so bugs affecting only that browser (and not affecting IE 11) may not be fixed.

See [PostCSS] docs for examples for your environment.
