"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_to_rgb = void 0;
var polished_1 = require("polished");
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("color_to_rgb", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_to_rgb.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  var _a = (0, polished_1.parseToRgb)(value),
    red = _a.red,
    green = _a.green,
    blue = _a.blue;
  try {
    return "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_to_rgb.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_to_rgb
 */
var color_to_rgb = function (liquid) {
  return liquid;
};
exports.color_to_rgb = color_to_rgb;
