"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newline_to_br = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("newline_to_br", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.newline_to_br.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return value.replaceAll("\n", "<br>");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.newline_to_br.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/newline_to_br/
 */
var newline_to_br = function (liquid) {
  return liquid;
};
exports.newline_to_br = newline_to_br;
