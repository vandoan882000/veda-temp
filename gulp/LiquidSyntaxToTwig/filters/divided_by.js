"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divided_by = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("divided_by", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.divided_by.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var divisor = args[0];
  var _divisor = Number(divisor);
  var _dividend = Number(value);
  if (isNaN(_divisor))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.divided_by.divisor", {
        error_signal: (0, toString_1.toString)(divisor),
      })
    );
  if (isNaN(_dividend))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.divided_by.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return _dividend / _divisor;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.divided_by.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/divided_by/
 */
var divided_by = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "divided_by",
    twigFilterName: "divided_by",
  });
};
exports.divided_by = divided_by;
