"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raw = void 0;
/**
 * TODO: Chưa làm được
 * @link https://shopify.dev/api/liquid/tags/theme-tags#section
 */
var raw = function (liquid) {
  return liquid
    .replace(/{%\s*raw\s*%}/g, "{% verbatim %}")
    .replace(/{%\s*endraw\s*%}/g, "{% endverbatim %}");
};
exports.raw = raw;
