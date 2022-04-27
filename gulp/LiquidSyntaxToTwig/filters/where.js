"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.where = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("where", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.where.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var property = args[0],
    objectPropertyValue = args[1];
  if (!property)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.where.property", {
        error_signal: (0, toString_1.toString)(property),
      })
    );
  if (!Array.isArray(value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.where.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (!value[0].hasOwnProperty(property)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.where.property_non_exist", {
        error_signal: (0, toString_1.toString)(property),
      })
    );
  }
  try {
    var _value = value.filter(function (item) {
      return objectPropertyValue
        ? item[property] === objectPropertyValue
        : !!item[property];
    });
    return _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.where.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/where/
 */
var where = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "where",
    twigFilterName: "where",
  });
};
exports.where = where;
