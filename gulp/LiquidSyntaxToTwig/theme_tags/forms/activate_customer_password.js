"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate_customer_password = void 0;
var translation_1 = require("../../../translation");
var Error_1 = require("../../Error");
var toString_1 = require("../../utils/toString");
var _const_1 = require("./.const");
var _utils_1 = require("./.utils");
/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
var activate_customer_password = function (liquid) {
  return liquid.replace(
    /{%\s*form.*activate_customer_password.*%}/gm,
    function (BOC) {
      // validateLiquidSyntaxNestable({ BOC, name: 'form', errorMessage: i18n.t('twig_error.theme_tags.forms.unnestable') });
      var _BOC = (0, _utils_1.handlePreprocess)(BOC);
      return _BOC.replace(
        /{%\s*form.*activate_customer_password.*%}/,
        function (value) {
          var form = (0, _utils_1.handleFormAttributes)({
            onException: function (err) {
              return new Error_1.LiquidSyntaxToTwigError(
                translation_1.i18n.t(
                  "twig_error.theme_tags.forms.activate_customer_password",
                  { error_signal: (0, toString_1.toString)(err) }
                )
              );
            },
            lineOfCodeOpenTagForm: value,
            additionAttributes: {
              method: "post",
              action: "/account/activate",
              "accept-charset": "UTF-8",
            },
          });
          return "\n      {% set form = "
            .concat(_const_1.form_object, " %}\n      ")
            .concat(
              form.outerHTML.replace("</form>", ""),
              '\n      <input name="form_type" type="hidden" value="activate_customer_password" />\n      <input name="utf8" type="hidden" value="\u2713" />'
            );
        }
      );
    }
  );
};
exports.activate_customer_password = activate_customer_password;
