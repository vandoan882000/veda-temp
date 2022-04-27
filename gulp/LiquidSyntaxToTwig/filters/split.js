"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
/**
 * @link https://shopify.github.io/liquid/filters/split/
 */
var split = function (liquid) { return (0, liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({ liquid: liquid, liquidFilterName: 'split', twigFilterName: 'split' }); };
exports.split = split;
