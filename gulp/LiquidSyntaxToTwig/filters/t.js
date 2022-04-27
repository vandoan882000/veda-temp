"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.t = void 0;
var ramda_1 = require("ramda");
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("t", function (value, args) {
  var _a;
  var locale = (0, translation_1.getLocale)();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var store = require("../../store/configureStore").store;
  var data = store.getState().iframe.liquidVariables.data.translations;
  var t = (0, ramda_1.path)(value.split("."), data[locale]);
  if (!t && !(0, ramda_1.isEmpty)(data[locale]))
    return "translation missing ".concat(value);
  try {
    if (t && Array.isArray(args)) {
      var result = t;
      while (args.length) {
        var signal =
          (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.key;
        var target = args.shift();
        if (t && typeof signal === "string" && typeof target === "string") {
          result = result.replace(
            new RegExp("{{\\s*".concat(signal, "\\s*}}"), "gm"),
            target
          );
        } else {
          throw new Error_1.LiquidSyntaxToTwigError(
            translation_1.i18n.t("twig_error.filters.t.format_invalid", {
              error_signal: (0, toString_1.toString)(args),
            })
          );
        }
      }
      return result;
    }
    return t;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.t.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#t-translation
 */
var t = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "t",
    twigFilterName: "t",
  });
};
exports.t = t;
