"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
/**
 * @link https://shopify.github.io/liquid/basics/operators/
 * @example
  Input:
    {% assign form = {"errors": ["author","body","email","password","form"]} %}
    {% if form.errors contains 'author' %}
      Hello
    {% endif %}
  Output:
    {% set form = {"errors": ["author","body","email","password","form"]} %}
    {% if 'author' in form.errors %}
      Hello
    {% endif %}
 */
var contains = function (liquid) {
    return liquid.replace(/({%|{{).*\scontains\s.*(}}|%})/g, function (value) {
        var _value = value.replace(/\s+/g, ' ');
        var blocks = _value.split(' ');
        blocks.forEach(function (block, index) {
            if (block === 'contains') {
                var arrayBlock = blocks[index - 1];
                var itemBlock = blocks[index + 1];
                _value = _value.replace("".concat(arrayBlock, " contains ").concat(itemBlock), "".concat(itemBlock, " in ").concat(arrayBlock));
            }
        });
        return _value;
    });
};
exports.contains = contains;
