module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

    _this.reverseArray = function (array) {
      var newArray = [];
      for (var entry in array) {
        newArray.splice(0, 0, array[entry]);
      }
      return newArray;
    };

    _this.onClickClose = function (event) {
      if (_this.state.listVisible) {
        var label = document.getElementById('label');
        var currentTarg = event.target;
        while (currentTarg) {
          if (currentTarg === label) {
            return;
          }
          currentTarg = currentTarg.parentNode;
        }
        _this.setState({ listVisible: false });
      }
    };

    _this.listStyle = function (popDirection, dropDirection) {
      var all = { position: 'absolute' };
      switch (popDirection) {
        case 'up':
          switch (dropDirection) {
            case 'left':
              return _extends({}, all, {
                display: 'flex',
                flexDirection: 'row-reverse',
                bottom: '100%',
                right: '0'
              });
            case 'right':
              return _extends({}, all, {
                display: 'flex',
                flexDirection: 'row',
                bottom: '100%',
                left: '0'
              });
            case 'up':
            default:
              return _extends({}, all, {
                bottom: '100%',
                display: 'flex',
                flexDirection: 'column-reverse'
              });
          }
        case 'left':
          switch (dropDirection) {
            case 'up':
              return _extends({}, all, {
                bottom: 0,
                display: 'flex',
                flexDirection: 'column-reverse',
                left: '-100%'
              });
            case 'down':
              return _extends({}, all, {
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                left: '-100%'
              });
            case 'left':
            default:
              return _extends({}, all, {
                right: '100%',
                top: 0,
                display: 'flex',
                flexDirection: 'row-reverse'
              });
          }
        case 'right':
          switch (dropDirection) {
            case 'up':
              return _extends({}, all, {
                bottom: 0,
                display: 'flex',
                flexDirection: 'column-reverse',
                right: '-100%'
              });
            case 'down':
              return _extends({}, all, {
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                right: '-100%'
              });
            case 'right':
            default:
              return _extends({}, all, {
                top: 0,
                display: 'flex',
                flexDirection: 'row',
                left: '100%'
              });
          }
        case 'down':
        default:
          switch (dropDirection) {
            case 'left':
              return _extends({}, all, {
                right: 0,
                display: 'flex',
                flexDirection: 'row-reverse'
              });
            case 'right':
              return _extends({}, all, {
                display: 'flex',
                left: 0,
                flexDirection: 'row'
              });
            case 'down':
            default:
              return _extends({}, all, {
                display: 'flex',
                flexDirection: 'column'
              });
          }
      }
    };

    _this.keyName = function (label) {
      var key = void 0;
      if (label.props) {
        if (label.props.children) {
          if (typeof label.props.children === 'string') {
            return label.props.children;
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = label.props.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var i = _step.value;

              key = _this.keyName(i);
              if (key !== 'dropElem') return key;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
      return 'dropElem';
    };

    var listItemStyle = props.listItemStyle,
        reverseOrder = props.reverseOrder,
        listVisible = props.listVisible;
    var entries = props.entries;
    var keyName = _this.keyName;

    entries = reverseOrder ? _this.reverseArray(entries) : entries;
    var keyProp = keyName(props.label);
    _this.state = {
      listVisible: listVisible || false,
      heightOf: 0,
      listItemStyle: listItemStyle,
      entries: entries,
      keyProp: keyProp
    };
    !props.keepOpen ? window.addEventListener('click', _this.onClickClose.bind(_this)) : void 0;
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props,
          listStyle = this.listStyle;
      var popDirection = props.popDirection,
          dropDirection = props.dropDirection;

      var popStyle = listStyle(popDirection, dropDirection);
      this.setState({ popStyle: popStyle });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state,
          props = this.props;
      var buttonStyle = props.buttonStyle,
          menuStyle = props.menuStyle,
          listItemStyle = props.listItemStyle;
      var popStyle = state.popStyle,
          listVisible = state.listVisible,
          keyProp = state.keyProp,
          entries = state.entries;

      return _react2.default.createElement(
        'div',
        { style: { position: 'relative', display: 'inline-block' } },
        _react2.default.createElement(
          'div',
          { id: 'label', style: _extends({ cursor: 'pointer' }, buttonStyle), onClick: function onClick() {
              return _this2.setState({ listVisible: !listVisible });
            } },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { hidden: !listVisible, id: keyProp.concat('menu') },
          _react2.default.createElement(
            'div',
            { style: _extends({}, popStyle, menuStyle) },
            entries.map(function (entry, index) {
              return _react2.default.createElement(
                'div',
                { key: keyProp.concat(index), style: listItemStyle, className: 'listEntry', onClick: function onClick() {
                    return _this2.props.onSelect(entry);
                  } },
                entry
              );
            })
          )
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

exports.default = Dropdown;

/***/ })
/******/ ]);