"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var program = require('commander');
var create = require('./create.js'); // 项目创建
var init = require('./init.js'); // 项目初始化

/**
 * cli 命令列表
 */

var actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    // 描述
    usages: [
    // 使用方法
    'cverse-cli create ProjectName', 'cv create ProjectName'],
    alias: 'cvc' // 命令简称
  }
  // 项目初始化
  /* init: {
    description: '初始化项目',
    usages: [
      'e-cli init',
      'ec init',
    ],
    alias: 'tci'
  }, */
};

// 添加create,init命令
Object.keys(actionMap).forEach(function (action) {
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(function (option) {
      var obj = actionMap[action].options[option];
      program.option(obj.flags, obj.description, obj.defaultValue);
    });
  }
  program.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(function () {
    switch (action) {
      case 'create':
        create.apply(void 0, _toConsumableArray(process.argv.slice(3)));
        break;
      case 'init':
        init();
        break;
      default:
        break;
    }
  });
});

// 项目版本
program.version(require('../package.json').version, '-v --version').parse(process.argv);

/**
 * test-cli命令后不带参数的时候，输出帮助信息
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
//# sourceMappingURL=main.js.map