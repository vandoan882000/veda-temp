"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.link_to_type = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
const { JSDOM } = require("jsdom");
var document = new JSDOM().window.document;
Twig.extendFilter("link_to_type", function (value, args) {
  var _a;
  if (args && (!Array.isArray(args) || args.length <= 1)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_type.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  }
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_type.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    var attributes = {};
    var _args = Array.isArray(args) ? args : [];
    for (var i = 0; i < _args.length; i += 2) {
      var attributeName = _args[i].key;
      var attributeValue = _args[i + 1];
      if (!attributeName || !attributeValue) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t(
            "twig_error.filters.link_to_type.params_invalid",
            { error_signal: (0, toString_1.toString)(args) }
          )
        );
      }
      attributes = __assign(
        __assign({}, attributes),
        ((_a = {}), (_a[attributeName] = attributeValue), _a)
      );
    }
    var aElement_1 = document.createElement("a");
    Object.entries(attributes).forEach(function (_a) {
      var attributeName = _a[0],
        attributeValue = _a[1];
      return aElement_1.setAttribute(attributeName, "".concat(attributeValue));
    });
    aElement_1.setAttribute("href", "/collections/types?q=".concat(value));
    aElement_1.innerHTML = value;
    aElement_1.setAttribute("title", value);
    return aElement_1.outerHTML;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_type.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * TODO: Không chắc chắn chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to_type
 */
var link_to_type = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "link_to_type",
    twigFilterName: "link_to_type",
  });
};
exports.link_to_type = link_to_type;
