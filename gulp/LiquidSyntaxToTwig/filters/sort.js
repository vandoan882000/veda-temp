"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var PRIMITIVE_TYPE = ["string", "number", "boolean"];
var Twig = require("twig");
Twig.extendFilter("sort", function (value, args) {
  var property = args ? args[0] : undefined;
  if (!Array.isArray(value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort.value", {
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
      translation_1.i18n.t("twig_error.filters.sort.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (isArrayObject && !args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort.value", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  if (
    !!property &&
    typeof value[0] === "object" &&
    !value[0].hasOwnProperty(property)
  )
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort.property_non_exist")
    );
  try {
    if (property) {
      return value.sort(function (a, b) {
        return a[property] - b[property];
      });
    }
    return value.sort();
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.sort.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/sort/
 */
var sort = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "sort",
    twigFilterName: "sort",
  });
};
exports.sort = sort;
