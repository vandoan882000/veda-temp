"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var PRIMITIVE_TYPE = ["string", "number", "boolean"];
var Twig = require("twig");
Twig.extendFilter("my_slice", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var from = args[0],
    _a = args[1],
    to = _a === void 0 ? from + 1 : _a;
  var _from = Number(from);
  var _to = Number(to);
  if (isNaN(_from))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.from", {
        error_signal: (0, toString_1.toString)(from),
      })
    );
  if (isNaN(_to))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.to", {
        error_signal: (0, toString_1.toString)(to),
      })
    );
  if (!Array.isArray(value) && typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (
    Array.isArray(value) &&
    !value.every(function (item) {
      return PRIMITIVE_TYPE.includes(typeof item);
    })
  ) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return value.slice(from, to);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.slice.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 */
/**
 *  @link https://shopify.github.io/liquid/filters/slice/
 */
var slice = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "slice",
    twigFilterName: "my_slice",
  });
};
exports.slice = slice;
