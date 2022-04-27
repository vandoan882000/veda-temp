"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepend = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("prepend", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.prepend.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.prepend.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var str = args[0];
  try {
    return str + value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.prepend.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/prepend/
 */
var prepend = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "prepend",
    twigFilterName: "prepend",
  });
};
exports.prepend = prepend;
