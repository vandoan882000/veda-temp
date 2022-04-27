"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.at_most = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("at_most", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_most.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var max = args[0];
  var _max = Number(max);
  var _value = Number(value);
  if (isNaN(_max))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_most.max", {
        error_signal: (0, toString_1.toString)(max),
      })
    );
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_most.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return _value > _max ? _max : _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.at_most.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/at_most/
 */
var at_most = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "at_most",
    twigFilterName: "at_most",
  });
};
exports.at_most = at_most;
