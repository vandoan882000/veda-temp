"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64_url_safe_decode = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("base64_url_safe_decode", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.base64_url_safe_decode.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return atob(value)
      .replace(/\-/g, "+") // Convert '-' to '+'
      .replace(/\_/g, "/"); // Convert '_' to '/'
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t(
        "twig_error.filters.base64_url_safe_decode.example",
        { message: (0, toString_1.toString)(err) }
      )
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#base64_url_safe_decode
 */
var base64_url_safe_decode = function (liquid) {
  return liquid;
};
exports.base64_url_safe_decode = base64_url_safe_decode;
