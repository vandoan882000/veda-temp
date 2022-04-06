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
exports.link_to_vendor = void 0;
var translation_1 = require("../../translation");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var Twig = require("twig");
Twig.extendFilter("link_to_vendor", function (value, args) {
  var _a;
  if (!args)
    throw new Error(
      translation_1.i18n.t("twig_error.filters.link_to_vendor.params")
    );
  if (typeof value !== "string")
    throw new Error(
      translation_1.i18n.t("twig_error.filters.link_to_vendor.value", {
        error_signal: value,
      })
    );
  try {
    var attributes = {};
    for (var i = 1; i < args.length; i += 2) {
      var attributeName = args[i].key;
      var attributeValue = args[i + 1];
      if (!attributeName || !attributeValue)
        throw new Error(
          translation_1.i18n.t(
            "twig_error.filters.link_to_vendor.params_invalid",
            { error_signal: JSON.stringify(args) }
          )
        );
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
    aElement_1.setAttribute("href", "/collections/vendors?q=".concat(value));
    aElement_1.innerHTML = value;
    aElement_1.setAttribute("title", value);
    return aElement_1.outerHTML;
  } catch (err) {
    var _err = err;
    throw new Error(
      translation_1.i18n.t("twig_error.filters.link_to_vendor.example", {
        message: _err.message,
      })
    );
  }
});
/**
 ```ts
 Trường hợp tham số không được gán vào biến
 {{ collection.url | link_to_vendor: 'best-selling' }}
 ```
 */
/**
 * TODO: Không chắc chắn chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to_vendor
 */
var link_to_vendor = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "link_to_vendor",
    twigFilterName: "link_to_vendor",
  });
};
exports.link_to_vendor = link_to_vendor;
