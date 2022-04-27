"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip_newlines = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("strip_newlines", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.strip_newlines.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return value.replaceAll("\n", "");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.strip_newlines.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/strip_newlines/
 */
var strip_newlines = function (liquid) {
  return liquid;
};
exports.strip_newlines = strip_newlines;
