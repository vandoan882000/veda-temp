"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weight_with_unit = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("weight_with_unit", function (value, args) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  var store = require("../../store/configureStore").store;
  var _state = store.getState();
  try {
    var unit = (
      args ? args : [_state.iframe.liquidVariables.data.weight_with_unit]
    )[0];
    var _unit = String(unit);
    var _value = value;
    return "".concat(_value, " ").concat(_unit);
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.weight_with_unit.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#weight_with_unit
 */
var weight_with_unit = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "weight_with_unit",
    twigFilterName: "weight_with_unit",
  });
};
exports.weight_with_unit = weight_with_unit;
