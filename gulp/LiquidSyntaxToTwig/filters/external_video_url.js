"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.external_video_url = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var Twig = require("twig");
Twig.extendFilter("external_video_url", function () {
  throw new Error_1.LiquidSyntaxToTwigError(
    translation_1.i18n.t("twig_error.filters.external_video_url")
  );
});
/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#external_video_url
 */
var external_video_url = function (liquid) {
  return liquid;
};
exports.external_video_url = external_video_url;
