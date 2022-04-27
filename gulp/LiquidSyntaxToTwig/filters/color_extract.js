"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_extract = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var color_1 = __importDefault(require("../libraries/color"));
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var domainValues = [
  "alpha",
  "red",
  "green",
  "blue",
  "hue",
  "saturation",
  "lightness",
];
var Twig = require("twig");
Twig.extendFilter("color_extract", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_extract.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var color = (0, color_1.default)(value);
  var extractValue = args[0];
  var _extractValue = extractValue;
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_extract.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (
    domainValues.findIndex(function (item) {
      return item === _extractValue;
    }) === -1
  ) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_extract.extractValue", {
        error_signal: (0, toString_1.toString)(extractValue),
      })
    );
  }
  try {
    if (_extractValue === "alpha") {
      return color.alpha();
    }
    if (_extractValue === "red") {
      return color.red();
    }
    if (_extractValue === "green") {
      return color.green();
    }
    if (_extractValue === "blue") {
      return color.blue();
    }
    if (_extractValue === "hue") {
      return color.hue();
    }
    if (_extractValue === "saturation") {
      return color.saturationl() * 100;
    }
    if (_extractValue === "lightness") {
      return color.lightness();
    }
    return translation_1.i18n.t("twig_error.filters.color_extract.example", {
      message: "",
    });
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_extract.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_extract
 */
var color_extract = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "color_extract",
    twigFilterName: "color_extract",
  });
};
exports.color_extract = color_extract;
