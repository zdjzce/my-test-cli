'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ProjectName) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            // 项目名不能为空
            if (ProjectName === undefined) {
              console.log(_logSymbols2.default.error, _chalk2.default.red('创建项目的时候，请输入项目名'));
            } else {
              // 如果文件名不存在则继续执行,否则退出
              (0, _util.notExistFold)(ProjectName).then(function () {

                // 用户询问交互
                (0, _util.prompt)().then(function (answer) {

                  // 目前只建了一个vue的模板，所以只能先跳过react🌶 
                  if (answer.frame === 'react') {
                    console.log(_logSymbols2.default.warning, _chalk2.default.yellow('react模板还在路上，莫急莫急~'));
                    process.exit(1);
                  }

                  /**
                   * 根据用户输入的配置信息下载模版&更新模版配置
                   * 下载模版比较耗时,这里通过ora插入下载loading, 提示用户正在下载模版
                   */
                  var loading = (0, _ora2.default)('模板下载中...');
                  loading.start('模板下载中...');

                  var Api = '';
                  switch (answer.frame) {
                    case 'vue':
                      Api = 'direct:https://github.com/For-Article/vue-temlate.git';
                      break;
                    case 'react':
                      Api = 'direct:https://github.com/LuoYangYY/react-template.git';
                      break;
                    default:
                      break;
                  }

                  (0, _util.downloadTemplate)(ProjectName, Api).then(function () {

                    loading.succeed('模板下载完成');

                    // 下载完成后,根据用户输入更新配置文件
                    var fileName = ProjectName + '/package.json';
                    answer.name = ProjectName;
                    (0, _util.updateJsonFile)(fileName, answer).then(function () {
                      console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完的。'));
                    });
                  }, function () {
                    loading.fail('模板下载失败');
                  });
                });
              });
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = create;