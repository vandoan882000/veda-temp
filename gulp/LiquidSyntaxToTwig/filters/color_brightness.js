"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_brightness = void 0;
var polished_1 = require("polished");
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("color_brightness", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_brightness.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    var _a = (0, polished_1.parseToRgb)(value),
      red = _a.red,
      green = _a.green,
      blue = _a.blue;
    var brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return brightness;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_brightness.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_brightness
 */
var color_brightness = function (liquid) {
  return liquid;
};
exports.color_brightness = color_brightness;
