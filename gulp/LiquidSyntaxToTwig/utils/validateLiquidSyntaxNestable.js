"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLiquidSyntaxNestable = void 0;
var Error_1 = require("../Error");
var getMatches_1 = require("./getMatches");
var validateLiquidSyntaxNestable = function (_a) {
    var BOC = _a.BOC, name = _a.name, errorMessage = _a.errorMessage;
    if ((0, getMatches_1.getMatches)(BOC, new RegExp("{%s*".concat(name, ".*%}"), 'gm')).length > 1)
        throw new Error_1.LiquidSyntaxToTwigError(errorMessage);
};
exports.validateLiquidSyntaxNestable = validateLiquidSyntaxNestable;
