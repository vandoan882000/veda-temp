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
exports.link_to = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
const { JSDOM } = require("jsdom");
var document = new JSDOM().window.document;
Twig.extendFilter("link_to", function (value, args) {
  var _a;
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  if (typeof value !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    var link_to_1 = args[0];
    var attributes = {};
    for (var i = 1; i < args.length; i += 2) {
      var attributeName = args[i].key;
      var attributeValue = args[i + 1];
      if (!attributeName || !attributeValue) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.link_to.params_invalid", {
            error_signal: (0, toString_1.toString)(args),
          })
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
    aElement_1.setAttribute("href", link_to_1);
    aElement_1.innerHTML = value;
    return aElement_1.outerHTML;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * TODO: Không chắc chắn chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to
 */
var link_to = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "link_to",
    twigFilterName: "link_to",
  });
};
exports.link_to = link_to;
