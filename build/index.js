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

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

    _initialiseProps.call(_this);

    var reverseOrder = props.reverseOrder,
        listVisible = props.listVisible;
    var entries = props.entries,
        buttonId = props.buttonId;
    var keyName = _this.keyName;

    entries = reverseOrder ? _this.reverseArray(entries) : entries;
    var keyProp = keyName(props.label) + Math.floor(Math.random() * 1000000);
    buttonId = buttonId || 'svzDropButton' + Math.floor(Math.random() * 1000000);
    var lastVisible = void 0;
    var dropDirection = props.dropDirection,
        popDirection = props.popDirection,
        delay = props.delay;

    var popStyle = _this.listStyle(dropDirection, popDirection);
    _this.state = {
      popDirection: popDirection,
      dropDirection: dropDirection,
      lastVisible: lastVisible,
      listVisible: listVisible,
      heightOf: 0,
      entries: entries,
      keyProp: keyProp,
      buttonId: buttonId,
      popStyle: popStyle,
      isOpen: delay ? false : undefined,
      listClickable: true
    };
    !props.keepOpen ? window.addEventListener('click', _this.onClickClose.bind(_this)) : void 0;
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.state.lastVisible = this.state.listVisible;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var listStyle = this.listStyle;
      var dropDirection = nextProps.dropDirection,
          popDirection = nextProps.popDirection;

      var popStyle = listStyle(dropDirection, popDirection);
      this.state.popDirection != popDirection || this.state.dropDirection != dropDirection ? this.setState({ popStyle: popStyle, popDirection: popDirection, dropDirection: dropDirection }) : void 0;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.lastVisible != this.state.listVisible) {
        this.props.onToggle ? this.props.onToggle(this.state.listVisible) : void 0;
        this.props.onOpen ? this.state.listVisible ? this.props.onOpen() : void 0 : void 0;
        this.props.onClose ? !this.state.listVisible ? this.props.onClose() : void 0 : void 0;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props,
          renderMenu = this.renderMenu,
          onToggle = this.onToggle,
          buttonClick = this.buttonClick;
      var buttonStyle = props.buttonStyle,
          menuStyle = props.menuStyle,
          style = props.style,
          className = props.className,
          id = props.id,
          menuClass = props.menuClass,
          menuId = props.menuId;
      var popStyle = state.popStyle,
          keyProp = state.keyProp,
          buttonId = state.buttonId,
          listClickable = state.listClickable,
          listVisible = state.listVisible,
          isOpen = state.isOpen;

      return _react2.default.createElement(
        'div',
        { style: _extends({ position: 'relative', display: 'inline-block' }, style), className: className, id: id },
        _react2.default.createElement(
          'div',
          { id: buttonId, style: _extends({ cursor: 'pointer' }, buttonStyle), onClick: function onClick() {
              return buttonClick();
            } },
          this.props.label
        ),
        _react2.default.createElement(
          'div',
          { style: { pointerEvents: listClickable ? 'auto' : 'none' }, hidden: typeof isOpen != 'undefined' ? !isOpen : !listVisible },
          _react2.default.createElement(
            'div',
            { className: menuClass, id: menuId, style: _extends({}, popStyle, menuStyle) },
            renderMenu()
          )
        )
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.reverseArray = function (array) {
    var newArray = [];
    for (var entry in array) {
      newArray.splice(0, 0, array[entry]);
    }
    return newArray;
  };

  this.onClickClose = function (event) {
    if (_this2.state.listVisible) {
      var label = document.getElementById(_this2.state.buttonId);
      var currentTarg = event.target;
      while (currentTarg) {
        if (currentTarg === label) {
          return;
        }
        currentTarg = currentTarg.parentNode;
      }
    }
    _this2.closeMenu();
  };

  this.closeMenu = function () {
    if (_this2.props.delay) {
      _this2.delayer ? clearTimeout(_this2.delayer) : void 0;
      !_this2.props.clickableInDelay ? _this2.setState({ listVisible: false, listClickable: false }) : void 0;
      _this2.delayer = setTimeout(function () {
        return _this2.setState({ isOpen: false, listClickable: true });
      }, _this2.props.delay);
    } else _this2.setState({ listVisible: false });
  };

  this.listStyle = function (dropDirection, popDirection) {
    var all = { position: 'absolute', display: 'flex' };
    switch (popDirection || dropDirection) {
      case 'right':
      case 'left':
        all.flexDirection = 'row';
        break;
      case 'down':
      case 'up':
      default:
        all.flexDirection = 'column';
    }
    switch (dropDirection) {
      case 'up':
        all.bottom = '100%';
        switch (popDirection) {
          case 'left':
            all.right = 0;
            return all;
          case 'right':
            all.left = 0;
            return all;
          case 'up':
          default:
            return all;
        }
      case 'left':
        all.right = '100%';
        switch (popDirection) {
          case 'up':
            all.bottom = 0;
            return all;
          default:
            all.top = 0;
            return all;
        }
      case 'right':
        all.left = '100%';
        switch (popDirection) {
          case 'up':
            all.bottom = 0;
            return all;
          default:
            all.top = 0;
            return all;
        }
      case 'down':
      default:
        switch (popDirection) {
          case 'left':
            all.right = 0;
            return all;
          case 'right':
            all.left = 0;
            return all;
          case 'down':
          default:
            return all;
        }
    }
  };

  this.keyName = function (label) {
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

            key = _this2.keyName(i);
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

  this.renderMenu = function () {
    var _props = _this2.props,
        listItemStyle = _props.listItemStyle,
        entries = _props.entries;
    var keyProp = _this2.state.keyProp;

    return entries.map(function (entry, index) {
      if (entry.id) return _react2.default.createElement(
        'div',
        { key: keyProp.concat(index), style: listItemStyle, id: entry.id, className: 'listEntry', onClick: function onClick() {
            return _this2.props.onSelect ? _this2.props.onSelect(entry.children) : void 0;
          } },
        entry.children
      );else return _react2.default.createElement(
        'div',
        { key: keyProp.concat(index), style: listItemStyle, className: 'listEntry', onClick: function onClick() {
            return _this2.props.onSelect ? _this2.props.onSelect(entry) : void 0;
          } },
        entry
      );
    });
  };

  this.buttonClick = function () {
    _this2.delayer ? clearTimeout(_this2.delayer) : void 0;
    _this2.setState({ listVisible: !_this2.state.listVisible });
    _this2.props.delay ? _this2.state.listVisible ? _this2.closeMenu() : _this2.setState({ isOpen: true }) : void 0;
  };
};

exports.default = Dropdown;

/***/ })
/******/ ]);