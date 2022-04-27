"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
var strftime_1 = __importDefault(require("strftime"));
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var isValidDate = function (date) {
  return (
    new Date(date).toString() !== "Invalid Date" &&
    !isNaN(new Date(date).getTime())
  );
};
var Twig = require("twig");
Twig.extendFilter("date", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.date.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  if (!isValidDate(value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.date.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var format = args[0];
  if (!format)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.date.format", {
        error_signal: (0, toString_1.toString)(format),
      })
    );
  try {
    return (0, strftime_1.default)(format, new Date(value));
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.date.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#date
 */
var date = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "date",
    twigFilterName: "date",
  });
};
exports.date = date;
