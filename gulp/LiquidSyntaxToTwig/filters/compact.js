"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compact = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("compact", function (value) {
  if (!Array.isArray(value)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.compact.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  var _value = value.filter(function (item) {
    return item !== null;
  });
  try {
    return _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.compact.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/compact/
 */
var compact = function (liquid) {
  return liquid;
};
exports.compact = compact;
