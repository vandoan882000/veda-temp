"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_darken = void 0;
var polished_1 = require("polished");
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var domainValues = [0, 100];
var Twig = require("twig");
Twig.extendFilter("color_darken", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_darken.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var darkenValue = args[0];
  var _darkenValue = Number(darkenValue);
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_darken.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (isNaN(_darkenValue)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_darken.darkenValue", {
        error_signal: (0, toString_1.toString)(darkenValue),
      })
    );
  }
  if (_darkenValue < domainValues[0] || _darkenValue > domainValues[1]) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_darken.darkenDomain", {
        error_signal: (0, toString_1.toString)(darkenValue),
      })
    );
  }
  try {
    return (0, polished_1.darken)(_darkenValue / 100, value);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_darken.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_darken
 */
var color_darken = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "color_darken",
    twigFilterName: "color_darken",
  });
};
exports.color_darken = color_darken;
