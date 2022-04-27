"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulo = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("modulo", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.modulo.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var modulo_number = args[0];
  var _modulo_number = Number(modulo_number);
  var _dividend = Number(value);
  if (isNaN(_dividend))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.modulo.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (isNaN(_modulo_number)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.modulo.modulo_number", {
        error_signal: (0, toString_1.toString)(modulo_number),
      })
    );
  }
  try {
    return _dividend % _modulo_number;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.modulo.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/modulo/
 */
var modulo = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "modulo",
    twigFilterName: "modulo",
  });
};
exports.modulo = modulo;
