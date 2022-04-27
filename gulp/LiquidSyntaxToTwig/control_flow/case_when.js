"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.case_when = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var getBOCsBetweenSomething_1 = require("../utils/getBOCsBetweenSomething");
var getMatches_1 = require("../utils/getMatches");
var toString_1 = require("../utils/toString");
// var Twig = require("twig");
// Twig.extend(Twig => {
//   Twig.exports.extendTag({
//     type: 'case',
//     regex: /^case\s+(.+)$/,
//     next: ['endcase'],
//     open: true,
//     compile: function(token: any) {
//       return token;
//     },
//     parse: function() {
//       return {
//         output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.control_flow.case_when')}</span>`,
//         chain: false
//       };
//     },
//   });
//   Twig.exports.extendTag({
//     type: 'endcase',
//     regex: /^endcase$/,
//     next: [],
//     open: false,
//   });
// });
/**
 * TODO: Chưa test được tất cả các trường họp xuống dòng linh tinh, những thứ không bình thường như {% case abc = 123 %} thì có lẽ là không thể chạy đc, ...
 * @link https://shopify.github.io/liquid/tags/control-flow/
 * @example
 Input:
 {% case handle %}
    {% when "cake" %}
      This is a cake
    {% when "cookie", "biscuit" %}
      This is a cookie
    {% else %}
      This is not a cake nor a cookie
  {% endcase %}

  Output:
  {% if handle == "cake" %}
    This is a cake
  {% elseif handle == "cookie" or handle == "biscuit" %}
    This is a cookie
  {% else %}
    This is not a cake nor a cookie
  {% endif %}

 * @example
 Input:
 {% case handle %}
    {% when "cake" %}
      This is a cake
    {% when "cookie" %}
      This is a cookie
    {% else %}
      This is not a cake nor a cookie
  {% endcase %}

  Output:
  {% if handle == "cake" %}
    This is a cake
  {% elseif handle == "cookie" %}
    This is a cookie
  {% else %}
    This is not a cake nor a cookie
  {% endif %}
 */
var case_when = function (liquid) {
  try {
    var _liquid = liquid;
    // @tuong -> cần xử lí nested nên phải bắt đầu từ cái nhỏ nhất trước vì mỗi case_when cần 1 thứ là "variable clause và when clause" -> r cũng cần replace những khối con trong những BOCs to chứa khối con đó để có thể chạy đúng khi loop đến những BOCs to hơn
    var BOCs = (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({
      liquid: liquid,
      startBOC: new RegExp(/{%\s*case/),
      endBOC: new RegExp(/{%\s*endcase\s*%}/),
    });
    var _loop_1 = function () {
      var BOC = BOCs.shift();
      try {
        // Xử lí xuống dòng để có thể regex
        var _BOC_1 = BOC.replace(/%}(?!\n)/gm, "%}\n").replace(
          /{%\s*endcase\s*%}/gm,
          "\n{% endcase %}"
        );
        // Lấy ra dòng code {% case ... %}
        var line_of_code_start_unless = (0, getMatches_1.getMatches)(
          _BOC_1,
          new RegExp(/{%\s*case.*%}/g)
        )[0];
        // Check "if" và không throw lỗi trong "else" cho trường hợp nếu tồn tại nhiều hơn 2 BOC giống y hệt nhau trong BOCs -> "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC))" sẽ thay thế mất những BOC bị trùng đằng sau -> "line_of_code_start_unless" những thằng trùng đằng sau sẽ là undefined
        if (line_of_code_start_unless) {
          // Xoá "{% case" và "%}" để lấy ra đoạn code chứa tên biến được sử dụng
          var variableClause_1 = line_of_code_start_unless
            .replace(/{%\s*case/, "")
            .replace(/%}/, "")
            .trim();
          // Lấy ra tất cả dòng code {% when ...%}
          var whenClauses = (0, getMatches_1.getMatches)(
            _BOC_1,
            new RegExp(/{%\s*when.*%}/g)
          );
          whenClauses.forEach(function (whenClause, index) {
            if (whenClause) {
              // Xoá "{% when" và "%}" để lấy ra đoạn code chứa các giá trị của biến được sử dụng để so sánh
              var values_1 = whenClause
                .replace(/{%\s*when/, "")
                .replace(/%}/, "")
                .replace(/\s/g, "")
                .split(",");
              // Vì Twig không có "case when" nên chuyển thành các mệnh đề "if elseif else"
              _BOC_1 = _BOC_1.replace(whenClause, function () {
                // Tạo mệnh đề so sánh ở twig
                var _finalConditionClause = values_1
                  .map(function (value) {
                    return "".concat(variableClause_1, " == ").concat(value);
                  })
                  .join(" or ");
                if (index === 0) {
                  return "{% if ".concat(_finalConditionClause, " %}");
                }
                return "{% elseif ".concat(_finalConditionClause, " %}");
              });
            }
          });
          // Xoá dòng code {% case ... %} và chuyển "endcase" thành endif
          _BOC_1 = _BOC_1
            .replace(line_of_code_start_unless, "")
            .replace(/{%\s*endcase\s*%}/gm, "{% endif %}");
          _liquid = _liquid.replace(BOC, _BOC_1);
          BOCs = BOCs.map(function (item) {
            return item.replace(BOC, _BOC_1);
          });
        }
      } catch (_a) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.control_flow.case_when", {
            error_signal: (0, toString_1.toString)(BOC),
          })
        );
      }
    };
    while (!!BOCs.length) {
      _loop_1();
    }
    return _liquid;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.control_flow.case_when", {
        error_signal: (0, toString_1.toString)(err),
      })
    );
  }
};
exports.case_when = case_when;
