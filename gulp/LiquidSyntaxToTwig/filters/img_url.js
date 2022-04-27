"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.img_url = void 0;
var translation_1 = require("../../translation");
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
var getMatches_1 = require("../utils/getMatches");
var toString_1 = require("../utils/toString");
var Error_1 = require("../Error");
// NOTE: @tuong -> có thể custom cái này như của liquid
// Check nếu value truyền vào là 1 object (tức featured_image, image, ...) thì sử dụng .src
// Lúc đó thì có thể như liquid (featured_image | img_url hoặc featured_image.src | img_url đều đúng)
var Twig = require("twig");
Twig.extendFilter("img_url", function (value, args) {
  var size = Array.isArray(args) ? args[0] : "small";
  if (typeof size !== "string")
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.img_url.size", {
        error_signal: (0, toString_1.toString)(size),
      })
    );
  if (typeof value !== "string") {
    return "";
  }
  try {
    var matches = (0, getMatches_1.getMatches)(
      value,
      new RegExp(/(\.jpg|\.jpeg|\.png|\.gif)/g)
    );
    var imageExtension = matches[matches.length - 1];
    if (imageExtension) {
      return value.replace(imageExtension, function (img_extension) {
        return "_".concat(size).concat(img_extension);
      });
    }
    return value;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.filters.img_url.example", {
        message: (0, toString_1.toString)(err),
      })
    );
  }
});
/**
 * TODO: Theo docs những cái này đã bị deprecated
 * @link https://shopify.dev/api/liquid/filters/deprecated-filters#url-filters
 */
var img_url = function (liquid) {
  return (0,
  liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({
    liquid: liquid,
    liquidFilterName: "img_url",
    twigFilterName: "img_url",
  });
};
exports.img_url = img_url;
