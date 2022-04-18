"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort_natural = void 0;
var translation_1 = require("../../translation");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var Twig = require("twig");
var PRIMITIVE_TYPE = ["string", "number", "boolean"];
Twig.extendFilter("sort_natural", function (value, args) {
  if (!Array.isArray(value))
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: value,
      })
    );
  var isArrayPrimitive = value.every(function (item) {
    return PRIMITIVE_TYPE.includes(typeof item);
  });
  var isArrayObject = value.every(function (item) {
    return typeof item === "object";
  });
  if (!isArrayObject && !isArrayPrimitive)
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: JSON.stringify(value),
      })
    );
  if (isArrayObject && !args)
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort_natural.value", {
        error_signal: "args: ".concat(JSON.stringify(args)),
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
    var _err = err;
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort_natural.example", {
        message: _err.message,
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
