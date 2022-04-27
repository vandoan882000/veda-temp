"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_escape = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("url_escape", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_escape.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return window.encodeURIComponent(value);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_escape.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 {{ '<hello> & <shopify>' | url_escape }}
 */
/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#url_escape
 */
var url_escape = function (liquid) {
  return liquid;
};
exports.url_escape = url_escape;
