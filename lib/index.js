import postcss from 'postcss';
import postcssIe11Supports from 'postcss-ie11-supports';
import postcssIe11PseudoClass from 'postcss-ie11-pseudo-class';

export const plugin = postcss.plugin('postcss-ie11', ({
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
