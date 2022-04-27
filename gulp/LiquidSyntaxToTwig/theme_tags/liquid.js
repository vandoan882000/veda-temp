"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquid = void 0;
var getBOCsBetweenSomething_1 = require("../utils/getBOCsBetweenSomething");
var SHOPIFY_TAG = [
    'if',
    'elsif',
    'else',
    'endif',
    'case',
    'when',
    'endcase',
    'unless',
    'for',
    'break',
    'continue',
    'cycle',
    'tablerow',
    'comment',
    'echo',
    'include',
    'form',
    'liquid',
    'paginate',
    'raw',
    'render',
    'section',
    'style',
    'assign',
    'capture',
    'increment',
    'decrement',
];
/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#liquid
 @example
 Input:
 {% liquid
  case section.blocks.size
  when 1
    assign column_size = ''
  when 2
    assign column_size = 'one-half'
  when 3
    assign column_size = 'one-third'
  else
    assign column_size = 'one-quarter'
  endcase
  echo column_size
  %}
  Output:
  {% case section.blocks.size %}
  {% when 1 %}
    assign column_size = ''
  {% when 2 %}
    assign column_size = 'one-half'
  {% when 3 %}
    assign column_size = 'one-third'
  {% else %}
    assign column_size = 'one-quarter'
  {% endcase %}
  {{ column_size }}
 */
var liquid = function (liquid) {
    var BOCs = (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({ liquid: liquid, startBOC: new RegExp(/{%\s*liquid/), endBOC: new RegExp(/%}/) });
    var _liquid = liquid;
    var _loop_1 = function () {
        var BOC = BOCs.shift();
        var _BOC = BOC;
        // Xoá mở tag và đóng tag
        _BOC = _BOC
            .replace(/{%\s?liquid/, '')
            .replace(/%}/, '')
            .trim();
        var splited = _BOC.split(' ');
        var clauses = [];
        var startTagIndex = 0;
        var i = 1;
        for (i; i < splited.length; i++) {
            var atomic = splited[i];
            if (SHOPIFY_TAG.includes(atomic)) {
                var startTagName = splited[startTagIndex];
                if (startTagName === 'echo') {
                    var combined = splited.slice(startTagIndex + 1, i);
                    clauses.push("{{ ".concat(combined.join(' '), " }}"));
                }
                else {
                    var combined = splited.slice(startTagIndex, i);
                    clauses.push("{% ".concat(combined.join(' '), " %}"));
                }
                startTagIndex = i;
            }
        }
        var startTagNameOfLastAtomic = splited[startTagIndex];
        if (startTagNameOfLastAtomic === 'echo') {
            var _lastAtomic = startTagIndex === i ? [] : splited.slice(startTagIndex + 1, i);
            clauses.push("{{ ".concat(_lastAtomic.join(' '), " }}"));
        }
        else {
            var _lastAtomic = startTagIndex === i ? [splited[i]] : splited.slice(startTagIndex, i);
            clauses.push("{% ".concat(_lastAtomic.join(' '), " %}"));
        }
        _BOC = clauses.join('\n');
        _liquid = _liquid.replace(BOC, _BOC);
        BOCs = BOCs.map(function (item) { return item.replace(BOC, _BOC); });
    };
    while (!!BOCs.length) {
        _loop_1();
    }
    return _liquid;
};
exports.liquid = liquid;
