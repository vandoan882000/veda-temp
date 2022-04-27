"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace_first = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("replace_first", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.replace_first.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var substr = args[0],
    replacer = args[1];
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.replace_first.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return value.replace(substr, replacer);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.replace_first.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/replace_first/
 */
var replace_first = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "replace_first",
    twigFilterName: "replace_first",
  });
};
exports.replace_first = replace_first;
