"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.color_modify = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var color_1 = __importDefault(require("../libraries/color"));
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var domainValues = {
  red: [0, 255],
  green: [0, 255],
  blue: [0, 255],
  hue: [0, 360],
  sarutation: [0, 100],
};
var domainKeys = Object.keys(domainValues);
var Twig = require("twig");
Twig.extendFilter("color_modify", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_modify.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var key = args[0],
    newValue = args[1];
  var _key = key;
  var _newValue = Number(newValue);
  if (typeof value !== "string") {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_modify.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  }
  if (
    domainKeys.findIndex(function (item) {
      return item === _key;
    }) === -1
  ) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_modify.key", {
        error_signal: (0, toString_1.toString)(key),
      })
    );
  }
  if (isNaN(_newValue))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_modify.newValue", {
        error_signal: (0, toString_1.toString)(newValue),
      })
    );
  try {
    var color = (0, color_1.default)(value);
    if (_key === "red") {
      if (_newValue < domainValues.red[0] || _newValue > domainValues.red[1]) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.redDomain", {
            error_signal: (0, toString_1.toString)(newValue),
          })
        );
      }
      try {
        return color.red(_newValue).toString();
      } catch (err) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.example", {
            message: (0, toString_1.toString)(err),
          })
        );
      }
    }
    if (_key === "green") {
      if (
        _newValue < domainValues.green[0] ||
        _newValue > domainValues.green[1]
      ) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.greenDomain", {
            error_signal: (0, toString_1.toString)(newValue),
          })
        );
      }
      try {
        return color.green(_newValue).toString();
      } catch (err) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.example", {
            message: (0, toString_1.toString)(err),
          })
        );
      }
    }
    if (_key === "blue") {
      if (
        _newValue < domainValues.blue[0] ||
        _newValue > domainValues.blue[1]
      ) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.blueDomain", {
            error_signal: (0, toString_1.toString)(newValue),
          })
        );
      }
      try {
        return color.blue(_newValue).toString();
      } catch (err) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.example", {
            message: (0, toString_1.toString)(err),
          })
        );
      }
    }
    if (_key === "hue") {
      if (_newValue < domainValues.hue[0] || _newValue > domainValues.hue[1]) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.hueDomain", {
            error_signal: (0, toString_1.toString)(newValue),
          })
        );
      }
      try {
        return color.hue(_newValue).toString();
      } catch (err) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.example", {
            message: (0, toString_1.toString)(err),
          })
        );
      }
    }
    if (_key === "sarutation") {
      if (
        _newValue < domainValues.sarutation[0] ||
        _newValue > domainValues.sarutation[1]
      ) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t(
            "twig_error.filters.color_modify.saturationDomain",
            { error_signal: (0, toString_1.toString)(newValue) }
          )
        );
      }
      try {
        return color.saturationl(_newValue / 100).toString();
      } catch (err) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.filters.color_modify.example", {
            message: (0, toString_1.toString)(err),
          })
        );
      }
    }
    return translation_1.i18n.t("twig_error.filters.color_modify.example", {
      message: "",
    });
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.color_modify.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * FIXME: Định dạng color đang không trả giống với shopify. Liệu điều này có ổn ?????
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_modify
 */
var color_modify = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "color_modify",
    twigFilterName: "color_modify",
  });
};
exports.color_modify = color_modify;
