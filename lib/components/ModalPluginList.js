"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _backstageModal = require("backstage-modal");

var _ModalPluginItem = require("./ModalPluginItem");

var _ModalPluginItem2 = _interopRequireDefault(_ModalPluginItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ModalPluginList = function (_Component) {
  _inherits(ModalPluginList, _Component);

  function ModalPluginList(props) {
    _classCallCheck(this, ModalPluginList);

    var _this = _possibleConstructorReturn(this, (ModalPluginList.__proto__ || Object.getPrototypeOf(ModalPluginList)).call(this, props));

    _this.modalClose = _this.modalClose.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ModalPluginList, [{
    key: "modalClose",
    value: function modalClose() {
      this.props.toggleModalVisibility();
    }
  }, {
    key: "onChange",
    value: function onChange() {
      var _props;

      this.props.toggleModalVisibility();
      (_props = this.props).onChange.apply(_props, arguments);
    }
  }, {
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        _backstageModal.ModalBody,
        null,
        _react2.default.createElement(_ModalPluginItem2.default, {
          toggleModalVisibility: this.modalClose,
          plugins: this.props.plugins,
          onChange: this.onChange,
          editorState: this.props.editorState
        })
      );
    }
  }]);

  return ModalPluginList;
}(_react.Component);

exports.default = ModalPluginList;