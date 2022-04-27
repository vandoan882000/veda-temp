"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniq = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var PRIMITIVE_TYPE = ["string", "number", "boolean"];
var Twig = require("twig");
Twig.extendFilter("uniq", function (value) {
  if (
    !Array.isArray(value) ||
    (Array.isArray(value) &&
      !value.every(function (item) {
        return PRIMITIVE_TYPE.includes(typeof item);
      }))
  ) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.uniq.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    var _value = Array.from(new Set(value));
    return _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.uniq.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/uniq/
 */
var uniq = function (liquid) {
  return liquid;
};
exports.uniq = uniq;
