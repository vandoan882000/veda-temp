"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = void 0;
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
/**
 * @link https://shopify.github.io/liquid/filters/join/
 */
var join = function (liquid) { return (0, liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({ liquid: liquid, liquidFilterName: 'join', twigFilterName: 'join' }); };
exports.join = join;
