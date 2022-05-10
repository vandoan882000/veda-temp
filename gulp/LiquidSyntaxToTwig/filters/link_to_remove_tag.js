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
exports.link_to_remove_tag = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var COLLECTION_HANDLE = "frontpage";
var Twig = require("twig");
const { JSDOM } = require("jsdom");
var document = new JSDOM().window.document;
Twig.extendFilter("link_to_remove_tag", function (value, args) {
  var _a;
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_remove_tag.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_remove_tag.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  try {
    var currentTag = location.pathname.includes(
      "/collections/".concat(COLLECTION_HANDLE, "/")
    )
      ? location.pathname.replace(
          "/collections/".concat(COLLECTION_HANDLE, "/"),
          ""
        )
      : "";
    var tag_1 = args[0];
    var removed_tag = currentTag.split("+").filter(function (item) {
      return item !== tag_1;
    });
    var attributes = {};
    for (var i = 1; i < args.length; i += 2) {
      var attributeName = args[i].key;
      var attributeValue = args[i + 1];
      if (!attributeName || !attributeValue)
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t(
            "twig_error.filters.link_to_remove_tag.params_invalid",
            { error_signal: (0, toString_1.toString)(args) }
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
    aElement_1.setAttribute(
      "href",
      "/collections/"
        .concat(COLLECTION_HANDLE, "/")
        .concat(removed_tag.join("+"))
        .toLowerCase()
    );
    aElement_1.setAttribute("title", "Remove tag ".concat(tag_1));
    aElement_1.innerHTML = value;
    return aElement_1.outerHTML;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.link_to_remove_tag.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * TODO: Chưa chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to_remove_tag
 */
var link_to_remove_tag = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "link_to_remove_tag",
    twigFilterName: "link_to_remove_tag",
  });
};
exports.link_to_remove_tag = link_to_remove_tag;
