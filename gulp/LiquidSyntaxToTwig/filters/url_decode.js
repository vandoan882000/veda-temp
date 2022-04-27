"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_decode = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("url_decode", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_decode.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.url_decode.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/url_decode
 */
var url_decode = function (liquid) {
  return liquid;
};
exports.url_decode = url_decode;
