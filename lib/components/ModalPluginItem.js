"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalPluginItem = function (_Component) {
  _inherits(ModalPluginItem, _Component);

  function ModalPluginItem(props) {
    _classCallCheck(this, ModalPluginItem);

    var _this = _possibleConstructorReturn(this, (ModalPluginItem.__proto__ || Object.getPrototypeOf(ModalPluginItem)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    _this.renderButton = _this.renderButton.bind(_this);
    return _this;
  }

  _createClass(ModalPluginItem, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.buttonEl.onClick(e);
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.props.toggleModalVisibility();
    }
  }, {
    key: "renderButton",
    value: function renderButton(item) {
      var _this2 = this;

      var Button = item.buttonComponent;

      return _react2.default.createElement(
        "li",
        {
          key: item.type,
          className: "megadraft-modal__item",
          onClick: this.closeModal },
        _react2.default.createElement(Button, {
          ref: function ref(el) {
            _this2.buttonEl = el;
          },
          className: "megadraft-modal__button",
          title: item.title,
          editorState: this.props.editorState,
          onChange: this.props.onChange }),
        _react2.default.createElement(
          "p",
          {
            className: "megadraft-modal__button__label",
            onClick: this.handleClick },
          item.title
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "ul",
        { className: "megadraft-modal__items" },
        this.props.plugins.map(this.renderButton)
      );
    }
  }]);

  return ModalPluginItem;
}(_react.Component);

exports.default = ModalPluginItem;