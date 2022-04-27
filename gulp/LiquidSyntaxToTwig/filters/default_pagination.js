"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default_pagination = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("default_pagination", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.default_pagination")
  );
});
/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default_pagination
 */
var default_pagination = function (liquid) {
  return liquid;
};
exports.default_pagination = default_pagination;
