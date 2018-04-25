'use strict';

const postcss = require('postcss');
const postcssIe11Supports = require('postcss-ie11-supports');
const postcssIe11PseudoClass = require('postcss-ie11-pseudo-class');

module.exports = postcss.plugin('postcss-ie11', ({
    ieSelector,
    plugins: {
        supports = true,
        pseudoClass = true,
    } = {},
} = {}) => {
    const processor = postcss();

    if (supports) {
        processor.use(postcssIe11Supports({ieSelector}));
    }
    if (pseudoClass) {
        processor.use(postcssIe11PseudoClass({ieSelector}));
    }

    return processor;
});
