"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minus = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("minus", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.minus.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var minus_number = args[0];
  var _minus_number = Number(minus_number);
  var _subtrahend = Number(value);
  if (isNaN(_subtrahend))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.minus.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (isNaN(_minus_number)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.minus.minus_number", {
        error_signal: (0, toString_1.toString)(minus_number),
      })
    );
  }
  try {
    return _subtrahend - _minus_number;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.minus.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/minus/
 */
var minus = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "minus",
    twigFilterName: "minus",
  });
};
exports.minus = minus;
