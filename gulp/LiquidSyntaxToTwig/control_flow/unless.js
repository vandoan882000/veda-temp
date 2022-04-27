"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unless = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var getBOCsBetweenSomething_1 = require("../utils/getBOCsBetweenSomething");
var getMatches_1 = require("../utils/getMatches");
var toString_1 = require("../utils/toString");
// var Twig = require("twig");
// Twig.extend(Twig => {
//   Twig.exports.extendTag({
//     type: 'unless',
//     regex: /^unless\s+(.+)$/,
//     next: ['endunless'],
//     open: true,
//     compile: function(token: any) {
//       return token;
//     },
//     parse: function() {
//       return {
//         output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.control_flow.unless')}</span>`,
//         chain: false
//       };
//     },
//   });
//   Twig.exports.extendTag({
//     type: 'endunless',
//     regex: /^endunless$/,
//     next: [],
//     open: false,
//   });
// });
/**
 * TODO: Chưa test được tất cả các trường họp xuống dòng linh tinh, những thứ không bình thường, ...
 * @link https://shopify.github.io/liquid/tags/control-flow/
 * @warning Unless bắt buộc phải thực hiện sau "./contains.ts" để dảo "contains" -> "in"
 * @explain Unless sẽ được biến đổi về mệnh đề if (phủ định tất cả mệnh đề so sánh của unless). Song "not contains" không hề tồn tại trong liquid của shopify -> Để tránh confuse
 * @example
 Input:
  {% unless product.title == "Awesome Shoes" %}
    These shoes are not awesome.
  {% endunless %}
  {% unless product.title != "Awesome Shoes" %}
    These shoes are not awesome.
  {% endunless %}
  Output:
  {% if product.title != "Awesome Shoes" %}
    These shoes are not awesome.
  {% endif %}
  {% if product.title == "Awesome Shoes" %}
    These shoes are not awesome.
  {% endif %}
 */
var unless = function (liquid) {
  try {
    var _liquid = liquid;
    // @tuong -> cần xử lí nested nên phải bắt đầu từ cái nhỏ nhất trước vì mỗi unless cần 1 thứ là "condition clause" -> r cũng cần replace những khối con trong những BOCs to chứa khối con đó để có thể chạy đúng khi loop đến những BOCs to hơn
    var BOCs = (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({
      liquid: liquid,
      startBOC: new RegExp(/{%\s*unless/),
      endBOC: new RegExp(/{%\s*endunless\s*%}/),
    });
    var _loop_1 = function () {
      var BOC = BOCs.shift();
      try {
        // Xử lí xuống dòng để có thể regex
        var _BOC_1 = BOC.replace(/%}(?!\n)/gm, "%}\n").replace(
          /{%\s*endunless\s*%}/gm,
          "\n{% endunless %}"
        );
        // Lấy ra dòng code {% unless ... %}
        var line_of_code_start_unless = (0, getMatches_1.getMatches)(
          _BOC_1,
          new RegExp(/{%\s*unless.*%}/g)
        )[0];
        // Check "if" và không throw lỗi trong "else" cho trường hợp nếu tồn tại nhiều hơn 2 BOC giống y hệt nhau trong BOCs -> "BOCs = BOCs.map(item => item.replaceAll(BOC, _BOC))" sẽ thay thế mất những BOC bị trùng đằng sau -> "line_of_code_start_unless" những thằng trùng đằng sau sẽ là undefined
        if (line_of_code_start_unless) {
          // Xoá "{% unless" và "%}" để lấy ra đoạn code chứa mệnh đề so sánh
          var conditionClause = line_of_code_start_unless
            .replace(/{%\s*unless/gm, "")
            .replace(/%}/gm, "")
            .trim();
          // Cắt ra các mệnh đề so sánh thành các nguyên tử
          var atomicsConditionClause = conditionClause
            .replace(/\s(and|or)\s/g, "|||")
            .split("|||");
          // Copy line_of_code để tường minh hơn
          var _line_of_code_start_unless_1 = line_of_code_start_unless;
          atomicsConditionClause.forEach(function (atomicConditionClause) {
            // Đảo dấu == và !=
            if (
              atomicConditionClause.includes("==") ||
              atomicConditionClause.includes("!=")
            ) {
              _line_of_code_start_unless_1 =
                _line_of_code_start_unless_1.replaceAll(
                  atomicConditionClause,
                  atomicConditionClause.replace(/(==|!=)/gm, function (value) {
                    if (value === "==") return "!=";
                    if (value === "!=") return "==";
                    return "";
                  })
                );
            }
            // Đảo "in" (cái mà đã được biến đổi từ "contains") -> "not in"
            if (atomicConditionClause.includes("in")) {
              _line_of_code_start_unless_1 =
                _line_of_code_start_unless_1.replaceAll(
                  atomicConditionClause,
                  atomicConditionClause.replace(/\sin\s/, " not in ")
                );
            }
            // Đảo mệnh đề check tồn tại
            if (
              !atomicConditionClause.includes("==") &&
              !atomicConditionClause.includes("!=") &&
              !atomicConditionClause.includes("in")
            ) {
              if (/\snot\s/g.test(atomicConditionClause)) {
                _line_of_code_start_unless_1 =
                  _line_of_code_start_unless_1.replaceAll(
                    atomicConditionClause,
                    atomicConditionClause.replace(/\snot\s/g, "")
                  );
              } else {
                _line_of_code_start_unless_1 =
                  _line_of_code_start_unless_1.replaceAll(
                    atomicConditionClause,
                    "not ".concat(atomicConditionClause)
                  );
              }
            }
          });
          // Biến "unless" -> "if" và "endunless" -> "endif"
          _BOC_1 = _BOC_1
            .replaceAll(line_of_code_start_unless, _line_of_code_start_unless_1)
            .replace(/{%\s*unless/g, "{% if")
            .replace(/{%\s*endunless\s*%}/gm, "{% endif %}");
          _liquid = _liquid.replaceAll(BOC, _BOC_1);
          BOCs = BOCs.map(function (item) {
            return item.replaceAll(BOC, _BOC_1);
          });
        }
      } catch (_a) {
        throw new Error_1.LiquidSyntaxToTwigError(
          translation_1.i18n.t("twig_error.control_flow.unless", {
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
      translation_1.i18n.t("twig_error.control_flow.unless", {
        error_signal: (0, toString_1.toString)(err),
      })
    );
  }
};
exports.unless = unless;
