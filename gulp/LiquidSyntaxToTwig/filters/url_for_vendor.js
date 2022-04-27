"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_for_vendor = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("url_for_vendor", function (value) {
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_for_vendor.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    return "/collections/vendors?q=".concat(value);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_for_vendor.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#url_for_vendor
 */
var url_for_vendor = function (liquid) {
  return liquid;
};
exports.url_for_vendor = url_for_vendor;
