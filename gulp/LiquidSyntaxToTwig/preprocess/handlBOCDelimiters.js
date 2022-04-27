"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBOCDelimiters = void 0;
var getBOCsBetweenSomething_1 = require("../utils/getBOCsBetweenSomething");
/**
 * Function thực hiện quy hết các đoạn code trong các delimiters về 1 kiểu (chuyển cả đoạn code về 1 dòng) -> làm thế này để có thể regex đc
 * @requires Phải thực hiện sau "handleReplaceToGerneralOpenCloseBlock"
 * @example
 * Input:
    {%- paginate
    collections[best_seller_collection].products
    by
    quantity_product_displayed -%}
  * Output:
    {%- paginate collections[best_seller_collection].products by quantity_product_displayed -%}
 */
var handleBOCDelimiters = function (liquid) {
    var _liquid = liquid;
    (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({ liquid: liquid, startBOC: new RegExp(/({{)|({%)/), endBOC: new RegExp(/(%})|(}})/) }).forEach(function (BOC) {
        var _BOC = BOC.replace(/\n/g, '').replace(/\s+/g, ' ');
        _liquid = _liquid.replace(BOC, _BOC);
    });
    return _liquid;
};
exports.handleBOCDelimiters = handleBOCDelimiters;
