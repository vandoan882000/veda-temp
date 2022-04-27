"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capture = void 0;
/**
 * @link https://shopify.github.io/liquid/tags/variable/
 @example
 Input: {% capture my_variable %}I am being captured.{% endcapture %}
 Output: {% set my_variable %}I am being captured.{% endset %}
 */
var capture = function (liquid) {
    return liquid.replace(/{%\s*capture/gm, '{% set').replace(/{%\s*endcapture\s*%}/gm, '{% endset %}');
};
exports.capture = capture;
