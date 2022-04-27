"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.money = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("money", function (value) {
  var _a, _b;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var store = require("../../store/configureStore").store;
  var _state = store.getState();
  var _value = Number(value);
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var moneyFormat =
    (_b =
      (_a = _state.iframe.liquidVariables.data.shop) === null || _a === void 0
        ? void 0
        : _a.money_format) !== null && _b !== void 0
      ? _b
      : "";
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.example_money", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
var Twig = require("twig");
Twig.extendFilter("money_with_currency", function (value) {
  var _a, _b;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var store = require("../../store/configureStore").store;
  var _state = store.getState();
  var _value = Number(value);
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var moneyFormat =
    (_b =
      (_a = _state.iframe.liquidVariables.data.shop) === null || _a === void 0
        ? void 0
        : _a.money_with_currency_format) !== null && _b !== void 0
      ? _b
      : "";
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t(
        "twig_error.filters.money.example_money_with_currency",
        { message: (0, toString_1.toString)(err) }
      )
    );
  }
});
var Twig = require("twig");
Twig.extendFilter("money_without_trailing_zeros", function (value) {
  var _a, _b;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var store = require("../../store/configureStore").store;
  var _state = store.getState();
  var _value = Number(value);
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  var moneyFormat =
    (_b =
      (_a = _state.iframe.liquidVariables.data.shop) === null || _a === void 0
        ? void 0
        : _a.money_format) !== null && _b !== void 0
      ? _b
      : "";
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t(
        "twig_error.filters.money.example_money_without_trailing_zeros",
        { message: (0, toString_1.toString)(err) }
      )
    );
  }
});
var Twig = require("twig");
Twig.extendFilter("money_without_currency", function (value) {
  var _value = Number(value);
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  try {
    return (_value / 100).toString();
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.money.money_without_currency", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/money-filters#money
 */
var money = function (liquid) {
  return liquid;
};
exports.money = money;
