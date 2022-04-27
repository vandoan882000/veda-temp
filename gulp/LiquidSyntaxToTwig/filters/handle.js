"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleize = exports.handle = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var hyphen = "-"; // Sv sẽ trả về
var Twig = require("twig");
Twig.extendFilter("handle", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.handle.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, hyphen)
      .replace(new RegExp("".concat(hyphen, "+"), "g"), hyphen)
      .replace(/-$/, "");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.handle.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
var Twig = require("twig");
Twig.extendFilter("handleize", function (value) {
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.handle.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, hyphen)
      .replace(new RegExp("".concat(hyphen, "+"), "g"), hyphen)
      .replace(/-$/, "");
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.handle.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
var handle = function (liquid) {
  return liquid;
};
exports.handle = handle;
/**
 * TODO: Chưa hoàn thiện
 * @link https://shopify.dev/api/liquid/filters/string-filters#handle-handleize
 */
var handleize = function (liquid) {
  return liquid;
};
exports.handleize = handleize;
