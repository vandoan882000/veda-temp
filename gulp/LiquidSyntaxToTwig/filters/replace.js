"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
/**
 * @link https://shopify.github.io/liquid/filters/replace/
 */
var replace = function (liquid) { return (0, liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({ liquid: liquid, liquidFilterName: 'replace', twigFilterName: 'replace' }); };
exports.replace = replace;
