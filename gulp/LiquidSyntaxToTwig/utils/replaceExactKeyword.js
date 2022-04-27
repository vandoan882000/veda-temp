"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceExactKeyword = void 0;
/**
 * Function đảm replace chính xác string và bỏ qua các trường hợp string đó là substring của 1 string khác
 * @example
 Input: Mỗi dòng là 1 tham số đầu vào của function
 "{{ collections[collection_1] }} {{ collections[best_collection_1] }} {{ collections[best_collection_1_abc] }}"
 "collection_1"
 "target_value"

 Output:
 "{{ collections[target_value] }} {{ collections[best_collection_1] }} {{ collections[best_collection_1_abc] }}"
 */
var replaceExactKeyword = function (str, source, target) {
    return str.replace(new RegExp(".".concat(source, "."), 'g'), function (value) {
        // Bắt đầu hoặc kết thúc bởi dấu "." cũng không được thế vào vì
        var startOrEndWithWords = /(^\w)|(\w$)/.test(value) || value.startsWith('.') || value.endsWith('.') || value.startsWith('-') || value.endsWith('-');
        if (startOrEndWithWords) {
            return value;
        }
        else {
            return value.replace(source, target);
        }
    });
};
exports.replaceExactKeyword = replaceExactKeyword;
