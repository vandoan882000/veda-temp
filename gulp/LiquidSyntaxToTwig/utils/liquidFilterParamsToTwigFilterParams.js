"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liquidFilterParamsToTwigFilterParams = void 0;
var getMatches_1 = require("./getMatches");
/**
 * Xử lí biến param cho filter của liquid thành params cho filter của twig
  @description
  Input: {{  filter_with_params: params_value }}
  Output: {{ filter_with_params(params_value) }}

  @example
  Input:
  {
    liquid: "{{ 10 | divided_by: 100 | times: 100 }}",
    liquidFilterName: 'times',
    twigFilterName: 'times'
  }
  Output: "{{ 10 | divided_by: 100 | times(100) }}"

  @example
  Input:
  {
    liquid: "{{ 10 | divided_by: 100 | times: 100 | plus: 30 | minus: 10 }}",
    liquidFilterName: 'times',
    twigFilterName: 'times'
  }
  Output: "{{ 10 | divided_by: 100 | times(100) | plus: 30 | minus: 10 }}"
*/
var liquidFilterParamsToTwigFilterParams = function (_a) {
    var liquid = _a.liquid, liquidFilterName = _a.liquidFilterName, twigFilterName = _a.twigFilterName;
    // Regex cho trường hợp filter là filter cuối cùng đc sử dụng trong block
    var regex1 = new RegExp("\\|\\s*".concat(liquidFilterName, ":\\s*(.*)(?=}}|%}|\\|)"), 'gm');
    // Regex cho trường hợp filter là filter ở vị trí bất kì đc sử dụng trong block
    var regex2 = new RegExp("\\|\\s*".concat(liquidFilterName, ":\\s*(.*)"), 'gm');
    // Xử lí trường hợp split là filters cuối cùng trước -> trường hợp này đc xử lí xong sẽ chỉ còn trường hợp split đứng vị trí bất kì không phải cuối cùng
    return liquid
        .replaceAll('|', '\n|')
        .replaceAll('}}', '}}\n')
        .replaceAll('%}', '%}\n')
        .replace(regex1, function (value) {
        var _a = (0, getMatches_1.getMatches)(value, new RegExp(regex2)), parametersClause = _a[1];
        if (parametersClause)
            return "| ".concat(twigFilterName, "(").concat(parametersClause.trim(), ")");
        return value;
    })
        .replace(regex2, function (value) {
        var _a = (0, getMatches_1.getMatches)(value, new RegExp(regex2)), parametersClause = _a[1];
        if (parametersClause)
            return "| ".concat(twigFilterName, "(").concat(parametersClause.trim(), ")");
        return value;
    })
        .replaceAll('\n|', '|')
        .replaceAll('}}\n', '}}')
        .replaceAll('%}\n', '%}');
};
exports.liquidFilterParamsToTwigFilterParams = liquidFilterParamsToTwigFilterParams;
