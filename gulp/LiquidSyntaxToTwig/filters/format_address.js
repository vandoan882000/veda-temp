"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format_address = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("format_address", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.format_address")
  );
});
/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#format_address
 */
var format_address = function (liquid) {
  return liquid;
};
exports.format_address = format_address;
