"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort_natural = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var PRIMITIVE_TYPE = ["string", "number", "boolean"];
var Twig = require("twig");
Twig.extendFilter("sort_natural", function (value, args) {
  if (!Array.isArray(value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var isArrayPrimitive = value.every(function (item) {
    return PRIMITIVE_TYPE.includes(typeof item);
  });
  var isArrayObject = value.every(function (item) {
    return typeof item === "object";
  });
  if (!isArrayObject && !isArrayPrimitive) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (isArrayObject && !args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  try {
    if (isArrayObject && args) {
      var fieldName_1 = args[0];
      return value.sort(function (item1, item2) {
        var item1FieldValue = item1[fieldName_1];
        var item2FieldValue = item2[fieldName_1];
        if (
          typeof item1FieldValue !== "string" ||
          typeof item2FieldValue !== "string"
        ) {
          return 0;
        }
        return item1FieldValue
          .toLowerCase()
          .localeCompare(item2FieldValue.toLowerCase());
      });
    }
    return value.sort();
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort_natural.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/sort_natural/
 */
var sort_natural = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "sort_natural",
    twigFilterName: "sort_natural",
  });
};
exports.sort_natural = sort_natural;
