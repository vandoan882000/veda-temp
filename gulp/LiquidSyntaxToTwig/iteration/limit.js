"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limit = void 0;
var translation_1 = require("../../translation");
var Error_1 = require("../Error");
var getBOCsBetweenSomething_1 = require("../utils/getBOCsBetweenSomething");
var toString_1 = require("../utils/toString");
/**
 * @link https://shopify.github.io/liquid/tags/iteration/
 @requires Với liquid đầu vào các vòng for: {% for ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 @example
  Input:
  {% for item in array limit: 2 %}
    {{ item }}
  {% endfor %}

  {% for item in array limit: variableName %}
    {{ item }}
  {% endfor %}

  {% for item in array limit: variableObject.key %}
    {{ item }}
  {% endfor %}
  Output:
  {% for item in array | slice(0, 2) %}
    {{ item }}
  {% endfor %}

  {% for item in array | slice(0, variableName) %}
    {{ item }}
  {% endfor %}

  {% for item in array | slice(0, variableObject.key) %}
    {{ item }}
  {% endfor %}
 */
var limit = function (liquid) {
  try {
    // @tuong -> có lẽ có thể xử lí những khối to nhất để tối ưu performance hơn
    var BOCs = (0, getBOCsBetweenSomething_1.getBOCsBetweenSomething)({
      liquid: liquid,
      startBOC: new RegExp(/{%\s*for/),
      endBOC: new RegExp(/{%\s*endfor\s*%}/),
    });
    var _liquid = liquid;
    var _loop_1 = function () {
      var BOC = BOCs.shift();
      // Xử lí để {% for ... } và {% endfor %} k nằm trên cùng 1 dòng để có thể regex
      var _BOC = BOC.replace(/%}(?!\n)/gm, "%}\n").replace(
        /{%\s*endfor\s*%}/gm,
        "\n{% endfor %}"
      );
      // Lấy ra dòng code {% for ... %}
      _BOC = _BOC.replace(/{%\s*for.*%}/g, function (forBlock) {
        return (
          forBlock
            // Xử lí mọi limit: limitValue thành limit:limitValue để dễ regex
            .replace(/limit:\s/g, "limit:")
            // Biến mọi khoảng trắng thành dấu xuống dòng (vì những tham số truyền vào biến đc sử dụng ở vòng for sẽ tách ra bởi dấu cách nên dùng cách này có thể tách ra đc các tham số đc áp dụng cho biến - cái mà đc sử dụng tại vòng for)
            .replace(/\s/g, "\n")
            // Lấy ra mệnh đề chứa limit và thay thế thành filter "slice" của twig
            .replace(/limit:.*/g, function (limitClause) {
              var _a = limitClause.split(":"),
                limit = _a[1];
              if (limit !== undefined) return "| slice(0, ".concat(limit, ")");
              throw new Error_1.LiquidSyntaxToTwigError(
                translation_1.i18n.t("twig_error.iteration.limit", {
                  error_signal: (0, toString_1.toString)(BOC),
                })
              );
            })
            // Trả dấu xuống dòng thành dấu cách để quay về trạng thái ban đầu
            .replace(/\n/g, " ")
        );
      });
      _liquid = _liquid.replace(BOC, _BOC);
      BOCs = BOCs.map(function (item) {
        return item.replace(BOC, _BOC);
      });
    };
    while (!!BOCs.length) {
      _loop_1();
    }
    return _liquid;
  } catch (err) {
    throw new Error_1.LiquidSyntaxToTwigError(
      translation_1.i18n.t("twig_error.iteration.limit", {
        error_signal: (0, toString_1.toString)(err),
      })
    );
  }
};
exports.limit = limit;
