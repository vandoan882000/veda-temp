"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downcase = void 0;
/**
 * TODO: Có hay không việc nên custom lại cái này
 * @link https://shopify.github.io/liquid/filters/downcase/
 */
var downcase = function (liquid) {
    return liquid.replace(/\|\s*downcase/gm, '| lower');
};
exports.downcase = downcase;
