"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64_encode = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("base64_encode", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.base64_encode.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return btoa(value);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.base64_encode.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#base64_encode
 * @example
 * {{ 'one two three' | base64_encode }} -> Expect: b25lIHR3byB0aHJlZQ==
 */
var base64_encode = function (liquid) {
  return liquid;
};
exports.base64_encode = base64_encode;
