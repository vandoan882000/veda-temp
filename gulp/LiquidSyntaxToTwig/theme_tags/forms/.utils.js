"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePreprocess = exports.handleFormAttributes = void 0;
var handleFormAttributes = function (_a) {
    var lineOfCodeOpenTagForm = _a.lineOfCodeOpenTagForm, additionAttributes = _a.additionAttributes, onException = _a.onException;
    try {
        // Xoá đi "{% form" và "%}" để lấy ra mệnh đề chứa các tham số đầu vào cho form liquid
        var content_properties_of_form = lineOfCodeOpenTagForm.replace(/{%\s*form/, '').replace(/%}/, '');
        var properties = content_properties_of_form
            .split(',')
            .slice(1)
            .map(function (item) { return item.trim(); });
        var form_1 = document.createElement('form');
        Object.entries(additionAttributes).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            form_1.setAttribute(key, value);
        });
        properties.forEach(function (property) {
            if (property.includes(':')) {
                var _a = property.split(':').map(function (item) { return item.trim(); }), key = _a[0], value = _a[1];
                var valueIsVariable = !/^(\'|\")/.test(value);
                if (valueIsVariable) {
                    form_1.setAttribute(key, "{{ ".concat(value, " }}"));
                }
                else {
                    form_1.setAttribute(key, value.replace(/^(\'|\")/, '').replace(/(\'|\")$/, ''));
                }
            }
        });
        return form_1;
    }
    catch (err) {
        throw onException(err);
    }
};
exports.handleFormAttributes = handleFormAttributes;
var handlePreprocess = function (BOC) {
    // Xử lí để {% form ... } và {% endform %} k nằm trên cùng 1 dòng để có thể regex
    return BOC.replace(/%}(?!\n)/gm, '%}\n').replace(/{%\s*endform\s*%}/gm, '\n{% endform %}');
};
exports.handlePreprocess = handlePreprocess;
