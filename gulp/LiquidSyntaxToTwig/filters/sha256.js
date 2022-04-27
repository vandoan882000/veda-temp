"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("sha256", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.sha256")
  );
});
/**
 * TODO: Chưa làm cái này vì nom có vẻ không cần thiết và nếu làm thì phải cài thêm thư viện
 * @link https://shopify.dev/api/liquid/filters/string-filters#sha256
 */
var sha256 = function (liquid) {
  return liquid;
};
exports.sha256 = sha256;
