"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcase = void 0;
/**
 * TODO: Có hay không nên việc custom lại cái này ???
 * @link https://shopify.github.io/liquid/filters/upcase/
 */
var upcase = function (liquid) {
    return liquid.replace(/\|\s*upcase/gm, '| upper');
};
exports.upcase = upcase;
