"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_saturate = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var color_1 = __importDefault(require("../libraries/color"));
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var domainValues = [0, 100];
var Twig = require("twig");
Twig.extendFilter("color_saturate", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_saturate.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var saturateValue = args[0];
  var _saturateValue = Number(saturateValue);
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_saturate.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (isNaN(_saturateValue)) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_saturate.saturateValue", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  var color = (0, color_1.default)(value);
  if (_saturateValue < domainValues[0] || _saturateValue > domainValues[1]) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t(
        "twig_error.filters.color_saturate.saturateValueDomain",
        { error_signal: (0, toString_1.toString)(saturateValue) }
      )
    );
  }
  try {
    return color.saturate(_saturateValue / 100).toString();
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_saturate.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * FIXME: K???t qu??? ??ang kh??ng gi???ng v???i shopify -> Result: #76C24F, Expect: #6ed938
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_saturate
 */
var color_saturate = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "color_saturate",
    twigFilterName: "color_saturate",
  });
};
exports.color_saturate = color_saturate;
