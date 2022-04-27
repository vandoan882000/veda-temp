"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort_by = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("sort_by", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_by.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var sort_by = args[0];
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_by.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return value.concat("?sort_by=".concat(sort_by));
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_by.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#sort_by
 */
var sort_by = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "sort_by",
    twigFilterName: "sort_by",
  });
};
exports.sort_by = sort_by;
