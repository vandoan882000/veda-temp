"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rstrip = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("rstrip", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.rstrip.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return value.replace(/~+$/, "");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.rstrip.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/rstrip/
 */
var rstrip = function (liquid) {
  return liquid;
};
exports.rstrip = rstrip;
