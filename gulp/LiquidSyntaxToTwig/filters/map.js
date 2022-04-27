"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("map", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.map.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var property = args[0];
  if (!property)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.map.property", {
        error_signal: (0, toString_1.toString)(property),
      })
    );
  if (!Array.isArray(value))
    throw new Error_1.LiquidSyntaxToTwigError("twig_error.filters.map.value");
  // throw new Error_1.LiquidSyntaxToTwigError(
  //   translation_1.i18n.t("twig_error.filters.map.value", {
  //     error_signal: (0, toString_1.toString)(value),
  //   })
  // );
  if (!value[0].hasOwnProperty(property)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.map.property_non_exist", {
        error_signal: (0, toString_1.toString)(property),
      })
    );
  }
  try {
    var _value = value
      .filter(function (item) {
        return !!item[property];
      })
      .map(function (item) {
        return item[property];
      });
    return _value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.map.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/map/
 */
var map = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "map",
    twigFilterName: "map",
  });
};
exports.map = map;
