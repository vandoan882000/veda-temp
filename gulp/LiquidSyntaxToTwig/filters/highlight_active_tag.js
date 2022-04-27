"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlight_active_tag = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("highlight_active_tag", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.highlight_active_tag")
  );
});
/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#highlight_active_tag
 */
var highlight_active_tag = function (liquid) {
  return liquid;
};
exports.highlight_active_tag = highlight_active_tag;
