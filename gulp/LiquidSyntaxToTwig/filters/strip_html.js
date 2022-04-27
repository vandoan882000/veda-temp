"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip_html = void 0;
/**
 * TODO: Có hay không việc nên custom lại cái này ???
 * @link https://shopify.github.io/liquid/filters/strip_html/
 */
var strip_html = function (liquid) {
    return liquid.replace(/\|\s*strip_html/gm, '| striptags');
};
exports.strip_html = strip_html;
