"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lstrip = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("lstrip", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.lstrip.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return value.replace(/^\s+/, "");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.lstrip.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/lstrip/
 */
var lstrip = function (liquid) {
  return liquid;
};
exports.lstrip = lstrip;
