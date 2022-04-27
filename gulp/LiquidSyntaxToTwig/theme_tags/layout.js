"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
var translation_1 = require("../../translation");
var Twig = require("twig");
Twig.extend(function (Twig) {
  Twig.exports.extendTag({
    type: "layout",
    regex: /layout/,
    next: [],
    open: true,
    compile: function (token) {
      return token;
    },
    parse: function () {
      return {
        output: "<span style='color: red; font-size: 18px'>".concat(
          translation_1.i18n.t("twig_error.theme_tags.layout"),
          "</span>"
        ),
        chain: false,
      };
    },
  });
});
/**
 * TODO: có thể làm được KHI VÀ CHỈ KHI
 * 1. BE trả về được file theme đó và file theme đó thoả mãn builder (về syntax)
 * HOẶC chấp nhận lỗi
 * @link https://shopify.dev/api/liquid/tags/theme-tags#layout
 */
var layout = function (liquid) {
  return liquid;
};
exports.layout = layout;
