"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("times", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.times.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var factor2 = args[0];
  var _factor2 = Number(factor2);
  var _factor1 = Number(value);
  if (isNaN(_factor1))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.times.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (isNaN(_factor2))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.times.factor", {
        error_signal: (0, toString_1.toString)(factor2),
      })
    );
  try {
    return _factor1 * _factor2;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.times.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/times/
 */
var times = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "times",
    twigFilterName: "times",
  });
};
exports.times = times;
