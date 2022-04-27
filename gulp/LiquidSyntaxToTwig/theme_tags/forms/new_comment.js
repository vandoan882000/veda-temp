"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_comment = void 0;
var translation_1 = require("../../../translation");
var Error_1 = require("../../Error");
var toString_1 = require("../../utils/toString");
var _const_1 = require("./.const");
var _utils_1 = require("./.utils");
/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
var new_comment = function (liquid) {
  return liquid.replace(/{%\s*form.*new_comment.*%}/gm, function (BOC) {
    // validateLiquidSyntaxNestable({ BOC, name: 'form', errorMessage: i18n.t('twig_error.theme_tags.forms.unnestable') });
    var _BOC = (0, _utils_1.handlePreprocess)(BOC);
    return _BOC.replace(/{%\s*form.*new_comment.*%}/, function (value) {
      var form = (0, _utils_1.handleFormAttributes)({
        onException: function (err) {
          return new Error_1.LiquidSyntaxToTwigError(
            translation_1.i18n.t("twig_error.theme_tags.forms.new_comment", {
              error_signal: (0, toString_1.toString)(err),
            })
          );
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: "post",
          action: "/blogs/news/10582441-my-article/comments",
          "accept-charset": "UTF-8",
          id: "article-10582441-comment-form",
          class: "comment-form",
        },
      });
      return "\n      {% set form = "
        .concat(_const_1.form_object, " %}\n      ")
        .concat(
          form.outerHTML.replace("</form>", ""),
          '\n      <input name="form_type" type="hidden" value="new_comment" />\n      <input name="utf8" type="hidden" value="\u2713" />\n      '
        );
    });
  });
};
exports.new_comment = new_comment;
