"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_to_hsl = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var color_1 = __importDefault(require("../libraries/color"));
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("color_to_hsl", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_to_hsl.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  var color = (0, color_1.default)(value);
  try {
    return color.hsl().toString();
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_to_hsl.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_to_hsl
 */
var color_to_hsl = function (liquid) {
  return liquid;
};
exports.color_to_hsl = color_to_hsl;
