"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plus = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("plus", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.plus.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var number2 = args[0];
  var _number2 = Number(number2);
  var _number1 = Number(value);
  if (isNaN(_number1))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.plus.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (isNaN(_number1))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.plus.number2", {
        error_signal: (0, toString_1.toString)(number2),
      })
    );
  try {
    return _number1 + _number2;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.plus.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/plus/
 */
var plus = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "plus",
    twigFilterName: "plus",
  });
};
exports.plus = plus;
