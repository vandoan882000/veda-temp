"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.at_least = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("at_least", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_least.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var min = args[0];
  var _min = Number(min);
  var _value = Number(value);
  if (isNaN(_min))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_least.min", {
        error_signal: (0, toString_1.toString)(min),
      })
    );
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_least.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return _value < _min ? _min : _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_least.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/at_least/
 */
var at_least = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "at_least",
    twigFilterName: "at_least",
  });
};
exports.at_least = at_least;
