"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slice = void 0;
var translation_1 = require("../../translation");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var Twig = require("twig");

const PRIMITIVE_TYPE = ["string", "number", "boolean"];

Twig.extendFilter("my_slice", function (value, args) {
  if (!args)
    throw new Error(translation_1.i18n.t("twig_error.filters.slice.params"));
  var from = args[0],
    _a = args[1],
    to = _a === void 0 ? from + 1 : _a;
  var _from = Number(from);
  var _to = Number(to);
  if (isNaN(_from)) {
    throw new Error(translation_1.i18n.t("twig_error.filters.slice.from"));
  }
  if (isNaN(_to)) {
    throw new Error(translation_1.i18n.t("twig_error.filters.slice.to"));
  }
  if (!Array.isArray(value) && typeof value !== "string") {
    throw new Error(
      translation_1.i18n.t("twig_error.filters.slice.value", {
        error_signal: value,
      })
    );
  }
  if (
    Array.isArray(value) &&
    !value.every((item) => PRIMITIVE_TYPE.includes(typeof item))
  ) {
    throw new Error(
      translation_1.i18n.t("twig_error.filters.slice.value", {
        error_signal: value,
      })
    );
  }
  try {
    return value.slice(from, to);
  } catch (err) {
    var _err = err;
    throw new Error(
      translation_1.i18n.t("twig_error.filters.slice.example", {
        message: _err.message,
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
