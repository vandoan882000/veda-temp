"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var translation_1 = require("../../translation");
var Twig = require("twig");
Twig.extend(function (Twig) {
  Twig.exports.extendTag({
    type: "render",
    regex: /render/,
    next: [],
    open: true,
    compile: function (token) {
      return token;
    },
    parse: function () {
      return {
        output: "<span style='color: red; font-size: 18px'>".concat(
          translation_1.i18n.t("twig_error.theme_tags.render"),
          "</span>"
        ),
        chain: false,
      };
    },
  });
});
/**
 * TODO: Có thể làm được bằng cách lấy về content file r thế vào (lưu ý cần lưu lại những file đã request) nhưng liệu có cần thiết và vì phải đợi request nên lần đầu vào app sẽ lâu hơn
 * @link https://shopify.dev/api/liquid/tags/theme-tags#render
 */
var render = function (liquid) {
  return liquid;
};
exports.render = render;
