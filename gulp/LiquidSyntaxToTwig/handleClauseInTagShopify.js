"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClauseInTagShopify = void 0;
var translation_1 = require("../translation");
var ramda_1 = require("ramda");
var Error_1 = require("./Error");
var handleReplaceSchemaSettingToLiquidVariables_1 = require("./handleReplaceSchemaSettingToLiquidVariables");
var handleReplaceToGeneralAssign_1 = require("./preprocess/handleReplaceToGeneralAssign");
var handleReplaceToGeneralIfElseElseIf_1 = require("./preprocess/handleReplaceToGeneralIfElseElseIf");
var handleReplaceToGeneralOpenCloseBlock_1 = require("./preprocess/handleReplaceToGeneralOpenCloseBlock");
var replaceExactKeyword_1 = require("./utils/replaceExactKeyword");
var handlBOCDelimiters_1 = require("./preprocess/handlBOCDelimiters");
var handleSchemaSetting = function (_a) {
  var parentName = _a.parentName,
    shopify_clause = _a.shopify_clause,
    settings = _a.settings;
  var _result = shopify_clause;
  settings.forEach(function (item) {
    var _name = [parentName, item.name]
      .filter(function (item) {
        return !!item;
      })
      .join(".");
    _result = _result.replace(
      new RegExp("({{|{%).*".concat(_name, ".*(%}|}})"), "g"),
      function (value) {
        if (item.type === "color")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "date")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "flexOrder") {
          Object.entries(item.children).forEach(function (_a) {
            var itemName = _a[0],
              order = _a[1];
            return (0,
            replaceExactKeyword_1.replaceExactKeyword)(value, [_name, itemName].join("."), JSON.stringify(order));
          });
        }
        if (item.type === "font")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "icon")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "image")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "linkPicker")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "navigation")
          throw new Error(
            translation_1.i18n.t("twig_error.clause_in_shopify.navigation")
          );
        if (item.type === "radioGroup")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "responsive") {
          Object.entries(item.children).forEach(function (_a) {
            var key = _a[0],
              valueOfKey = _a[1];
            return (0,
            replaceExactKeyword_1.replaceExactKeyword)(value, [_name, key].join("."), JSON.stringify(valueOfKey));
          });
        }
        if (item.type === "select")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "slider")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "space")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "styleBox")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "switch")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "text")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "textarea")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        if (item.type === "video")
          return (0, replaceExactKeyword_1.replaceExactKeyword)(
            value,
            _name,
            JSON.stringify(item.children)
          );
        return value;
      }
    );
  });
  return _result;
};
var handleSchemaBlock = function (_a) {
  var shopify_clause = _a.shopify_clause,
    blocks = _a.blocks;
  var _result = shopify_clause;
  blocks.forEach(function (block) {
    if (block.type === "array")
      throw new Error_1.LiquidSyntaxToTwigError(
        translation_1.i18n.t("twig_error.clause_in_shopify.array")
      );
    if (block.type === "object")
      _result = handleSchemaSetting({
        shopify_clause: _result,
        parentName: block.name,
        settings: block.children,
      });
  });
  return _result;
};
/** Thế các biến của builder cho các phần tử bên trong tag "shopify" */
var handleClauseInTagShopify = function (_a) {
  var shopify_clause = _a.shopify_clause,
    settings = _a.settings;
  var schema_blocks = settings.filter(function (item) {
    return item.type === "array" || item.type === "object";
  });
  var schema_settings = settings.filter(function (item) {
    return item.type !== "array" && item.type !== "object";
  });
  var preprocessData = (0, ramda_1.compose)(
    handleReplaceToGeneralOpenCloseBlock_1.handleReplaceGeneralOpenCloseBlock,
    handleReplaceToGeneralIfElseElseIf_1.handleReplaceToGeneralIfElseElseIf,
    handleReplaceToGeneralAssign_1.handleReplaceToGeneralAssign,
    handlBOCDelimiters_1.handleBOCDelimiters,
    function (liquid) {
      return (0,
      handleReplaceSchemaSettingToLiquidVariables_1.handleReplaceSchemaSettingToLiquidVariables)(
        { liquid: liquid, settings: settings }
      );
    }
  )(shopify_clause);
  return handleSchemaSetting({
    shopify_clause: handleSchemaBlock({
      blocks: schema_blocks,
      shopify_clause: preprocessData,
    }),
    settings: schema_settings,
  });
};
exports.handleClauseInTagShopify = handleClauseInTagShopify;
