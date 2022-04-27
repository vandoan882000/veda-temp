"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default_errors = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("default_errors", function (value) {
  var errors = value;
  if (Array.isArray(errors)) {
    var messages = errors.map(function (error) {
      if (error === "author") return "Please enter a valid email address.";
      if (error === "body") return "Please enter a valid email address.";
      if (error === "email") return "Please enter a valid email address.";
      if (error === "form") return "Please enter a valid email address.";
      if (error === "password") return "Please enter a valid email address.";
      return "";
    });
    return messages.join("\n");
  } else {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.default_errors.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default_errors
 */
var default_errors = function (liquid) {
  return liquid;
};
exports.default_errors = default_errors;
