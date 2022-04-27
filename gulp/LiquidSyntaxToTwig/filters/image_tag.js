"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_tag = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("image_tag", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.image_tag")
  );
});
/**
 * @link https://shopify.dev/api/liquid/filters/html-filters#image_tag
 * TODO: Trông có vẻ làm được nhưng có thực sự cần thiết???
 */
var image_tag = function (liquid) {
  return liquid;
};
exports.image_tag = image_tag;
