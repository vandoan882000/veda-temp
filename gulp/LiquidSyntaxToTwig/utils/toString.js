"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = void 0;
var toString = function (arg) {
  if (arg instanceof Error) {
    console.log(arg)
  }
    try {
        return JSON.stringify(arg);
    }
    catch (_a) {
        return arg + '';
    }
};
exports.toString = toString;
