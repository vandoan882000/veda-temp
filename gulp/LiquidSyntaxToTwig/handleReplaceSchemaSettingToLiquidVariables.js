"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReplaceSchemaSettingToLiquidVariables = void 0;
var replaceExactKeyword_1 = require("./utils/replaceExactKeyword");
var getVariableNameDependonSchemaType = function (setting) { return setting.name; };
/**
 * function xử lí thế các biến picker vào liquid
 * @example
 { % assign collection = collections[name_of_collection_picker_field_created_in_schema] %}
 với name_of_collection_picker_field_created_in_schema là 1 trường trong settings
 => thế slug vào "name_of_collection_picker_field_created_in_schema"
 */
var handleReplaceSchemaSettingToLiquidVariables = function (_a) {
    var liquid = _a.liquid, settings = _a.settings;
    // Xử lí gán biến cho twig
    var _liquid = liquid;
    settings.forEach(function (setting) {
        var _a;
        // Trường hợp ở schema setting
        if (['collectionPicker', 'productPicker', 'blogPicker'].includes(setting.type)) {
            var _setting = setting;
            var variableName_1 = getVariableNameDependonSchemaType(setting);
            var variableValue_1 = (_a = _setting.children) === null || _a === void 0 ? void 0 : _a.handle;
            if (variableValue_1) {
                _liquid = _liquid.replace(new RegExp("({{|{%).*".concat(variableName_1, ".*(%}|}})"), 'g'), function (value) {
                    return (0, replaceExactKeyword_1.replaceExactKeyword)(value, variableName_1, JSON.stringify(variableValue_1));
                });
            }
        }
        // Trường hợp ở schema block
        if (setting.type === 'object') {
            var _children = setting.children;
            _children.forEach(function (child) {
                var _a;
                if (['collectionPicker', 'productPicker', 'blogPicker'].includes(child.type)) {
                    var _child = child;
                    var variableName_2 = [setting.name, getVariableNameDependonSchemaType(child)].join('.');
                    var variableValue_2 = (_a = _child.children) === null || _a === void 0 ? void 0 : _a.handle;
                    if (variableValue_2) {
                        _liquid = _liquid.replace(new RegExp("({{|{%).*".concat(variableName_2, ".*(%}|}})"), 'g'), function (value) {
                            return (0, replaceExactKeyword_1.replaceExactKeyword)(value, variableName_2, JSON.stringify(variableValue_2));
                        });
                    }
                }
            });
        }
        // Không có trường hợp ở schema array vì array cần index mới có thể trích xuất chính xác dữ liệu để thế vào liquid -> điều này là khó có thể làm (có lẽ là không thể)
    });
    return _liquid;
};
exports.handleReplaceSchemaSettingToLiquidVariables = handleReplaceSchemaSettingToLiquidVariables;
