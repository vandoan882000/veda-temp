"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_contrast = void 0;
var polished_1 = require("polished");
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("color_contrast", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_contrast.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var _color = args[0];
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_contrast.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (typeof _color !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_contrast.color", {
        error_signal: (0, toString_1.toString)(_color),
      })
    );
  }
  try {
    return (0, polished_1.getContrast)(value, _color);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_contrast.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_contrast
 * @example {{ '#495859' | color_contrast: '#fffffb' }}
 */
var color_contrast = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "color_contrast",
    twigFilterName: "color_contrast",
  });
};
exports.color_contrast = color_contrast;
