"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_for_type = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("url_for_type", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_for_type.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return "/collections/types?q=".concat(value);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_for_type.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#url_for_type
 */
var url_for_type = function (liquid) {
  return liquid;
};
exports.url_for_type = url_for_type;
