"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
var translation_1 = require("../../../translation");
var Error_1 = require("../../Error");
var toString_1 = require("../../utils/toString");
var _const_1 = require("./.const");
var _utils_1 = require("./.utils");
/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
var product = function (liquid) {
  return liquid.replace(/{%\s*form.*product.*%}/gm, function (BOC) {
    // validateLiquidSyntaxNestable({ BOC, name: 'form', errorMessage: i18n.t('twig_error.theme_tags.forms.unnestable') });
    var _BOC = (0, _utils_1.handlePreprocess)(BOC);
    return _BOC.replace(/{%\s*form.*product.*%}/, function (value) {
      var form = (0, _utils_1.handleFormAttributes)({
        onException: function (err) {
          return new Error_1.LiquidSyntaxToTwigError(
            translation_1.i18n.t("twig_error.theme_tags.forms.product", {
              error_signal: (0, toString_1.toString)(err),
            })
          );
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: "post",
          action: "/cart/add",
          enctype: "multipart/form-data",
        },
      });
      return "\n      {% set form = "
        .concat(_const_1.form_object, " %}\n      ")
        .concat(
          form.outerHTML.replace("</form>", ""),
          '\n      <input type="hidden" name="form_type" value="product">\n      <input type="hidden" name="utf8" value="\u2713">\n      <input type="hidden" name="id" value="variant_id">'
        );
    });
  });
};
exports.product = product;
