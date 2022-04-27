"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
/**
 * @link https://shopify.github.io/liquid/filters/round/
 */
var round = function (liquid) { return (0, liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({ liquid: liquid, liquidFilterName: 'round', twigFilterName: 'round' }); };
exports.round = round;
