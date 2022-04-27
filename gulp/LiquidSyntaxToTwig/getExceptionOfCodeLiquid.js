"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExceptionOfCodeLiquid = void 0;
var translation_1 = require("../translation");
var constants_1 = require("../constants/constants");
var const_1 = require("./const");
var Error_1 = require("./Error");
var getBOCsBetweenSomething_1 = require("./utils/getBOCsBetweenSomething");
var toString_1 = require("./utils/toString");
var getExceptionOfCodeLiquid = function (_a) {
  var liquid = _a.liquid,
    settings = _a.settings;
  settings.forEach(function (setting) {
    if (const_1.VARIABLES_NAME.includes(setting.name)) {
      throw new Error_1.LiquidSyntaxToTwigError(
        translation_1.i18n.t("twig_error.exception_of_code_liquid.variable", {
          error_signal: (0, toString_1.toString)(setting),
        })
      );
    }
  });
  // TODO: @tuong -> Có thể optimize để lấy BOCS lớn nhất để có thể giảm bớt vòng lặp
  var liquidBOCs = (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({
    liquid: liquid,
    startBOC: new RegExp("<".concat(constants_1.Consts.FakeTags.Shopify, ">")),
    endBOC: new RegExp("</".concat(constants_1.Consts.FakeTags.Shopify, ">")),
  });
  var _liquidRemoveShopifyTag = liquid;
  liquidBOCs.reverse().forEach(function (BOC) {
    return (_liquidRemoveShopifyTag = _liquidRemoveShopifyTag.replace(BOC, ""));
  });
  const_1.FILTERS_MUST_BE_IN_SHOPIFY_TAG.forEach(function (filter) {
    var isError = new RegExp(
      "({{|{%)(.*)\\|\\s*".concat(filter, "(?!\\w+)"),
      "gm"
    ).test(_liquidRemoveShopifyTag);
    if (isError)
      throw new Error_1.LiquidSyntaxToTwigError(
        translation_1.i18n.t("twig_error.exception_of_code_liquid.filter", {
          error_signal: (0, toString_1.toString)(filter),
        })
      );
  });
};
exports.getExceptionOfCodeLiquid = getExceptionOfCodeLiquid;
