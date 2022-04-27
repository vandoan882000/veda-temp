"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip = void 0;
/**
 * TODO: Có hay không việc nên custom lại cái này ???
 * @link https://shopify.github.io/liquid/filters/strip/
 */
var strip = function (liquid) {
    // \w+ để fix lỗi cho strip_html
    return liquid.replace(/\|\s*strip(?!\w+)/gm, '| trim');
};
exports.strip = strip;
