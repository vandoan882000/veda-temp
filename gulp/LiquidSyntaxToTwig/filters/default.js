"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._default = void 0;
var liquidFilterParamsToTwigFilterParams_1 = require("../utils/liquidFilterParamsToTwigFilterParams");
/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default
 */
var _default = function (liquid) { return (0, liquidFilterParamsToTwigFilterParams_1.liquidFilterParamsToTwigFilterParams)({ liquid: liquid, liquidFilterName: 'default', twigFilterName: 'default' }); };
exports._default = _default;
