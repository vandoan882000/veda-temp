"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
var translation_1 = require("../../translation");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var Twig = require("twig");
const PRIMITIVE_TYPE = ["string", "number", "boolean"];

Twig.extendFilter("sort", function (value, args) {
  const property = args ? args[0] : undefined;
  if (!Array.isArray(value)) {
    throw new Error(translation_1.i18n.t("twig_error.filters.sort.value"));
  }
  const isArrayPrimitive = value.every((item) => {
    return PRIMITIVE_TYPE.includes(typeof item);
  });
  const isArrayObject = value.every((item) => typeof item === "object");

  if (!isArrayObject && !isArrayPrimitive) {
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort.value", {
        error_signal: JSON.stringify(value),
      })
    );
  }
  if (isArrayObject && !args) {
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort.value", {
        error_signal: `args: ${JSON.stringify(args)}`,
      })
    );
  }
  if (
    !!property &&
    typeof value[0] === "object" &&
    !value[0].hasOwnProperty(property)
  ) {
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort.property_non_exist")
    );
  }

  try {
    if (property) {
      return value.sort(function (a, b) {
        return a[property] - b[property];
      });
    }
    return value.sort();
  } catch (err) {
    var _err = err;
    throw new Error(
      translation_1.i18n.t("twig_error.filters.sort.example", {
        message: _err.message,
      })
    );
  }
});
/**
 ```ts
  Trường hợp tham số không được gán vào biến
  {% assign collections = collections | sort: 'published_at' | slice: 0, 10 %}
  {{ collections | sort: 'published_at'| slice: 10 }}
 ```
 ```ts
  Trường hợp tham số được gán vào biến
  {% assign field = published_at %}
  {% assign collections = collections | slice: 0, 10 | sort: field %}
  {{ collections | slice: 0, 10 | sort: field }}
 ```
 */
/**
 * @link https://shopify.github.io/liquid/filters/sort/
 */
var sort = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "sort",
    twigFilterName: "sort",
  });
};
exports.sort = sort;
