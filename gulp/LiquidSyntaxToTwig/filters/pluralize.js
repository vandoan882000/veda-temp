"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var toString_1 = require("../utils/toString");
var Twig = require("twig");
Twig.extendFilter("pluralize", function (value, args) {
  if (!args)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.pluralize.params", {
        error_signal: (0, toString_1.toString)(args),
      })
    );
  var _value = Number(value);
  var singular = args[0],
    plural = args[1];
  if (isNaN(_value))
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.pluralize.value", {
        error_signal: (0, toString_1.toString)(value),
      })
    );
  if (!singular)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.pluralize.singular", {
        error_signal: (0, toString_1.toString)(singular),
      })
    );
  if (!plural)
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.pluralize.plural", {
        error_signal: (0, toString_1.toString)(plural),
      })
    );
  try {
    return _value >= 2 ? plural : singular;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.pluralize.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 ```
 ts{{ cart.item_count }}
 {{ cart.item_count | pluralize: 'item', 'items' }}
 ```
 */
/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#pluralize
 */
var pluralize = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "pluralize",
    twigFilterName: "pluralize",
  });
};
exports.pluralize = pluralize;
