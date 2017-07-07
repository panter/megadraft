"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _backstageModal = require("backstage-modal");

var _backstageModal2 = _interopRequireDefault(_backstageModal);

var _ModalPluginList = require("./ModalPluginList");

var _ModalPluginList2 = _interopRequireDefault(_ModalPluginList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PluginsModal = function (_Component) {
  _inherits(PluginsModal, _Component);

  function PluginsModal(props) {
    _classCallCheck(this, PluginsModal);

    var _this = _possibleConstructorReturn(this, (PluginsModal.__proto__ || Object.getPrototypeOf(PluginsModal)).call(this, props));

    _this.onCloseRequest = _this.onCloseRequest.bind(_this);
    _this.modalOptions = _this.props.modalOptions ? _this.props.modalOptions : {};
    _this.modalWidth = _this.modalOptions.width || 528;
    _this.modalHeight = _this.modalOptions.height || 394;
    return _this;
  }

  _createClass(PluginsModal, [{
    key: "onCloseRequest",
    value: function onCloseRequest() {
      if (!this.props.isOpen) {
        return;
      }
      document.body.classList.remove("megadraft-modal--open");
      this.props.toggleModalVisibility();
    }
  }, {
    key: "render",
    value: function render() {
      /* global __ */
      return _react2.default.createElement(
        _backstageModal2.default,
        {
          className: "megadraft-modal",
          title: __("Blocks"),
          isOpen: this.props.isOpen,
          onCloseRequest: this.onCloseRequest,
          width: this.modalWidth,
          height: this.modalHeight },
        _react2.default.createElement(_ModalPluginList2.default, {
          toggleModalVisibility: this.onCloseRequest,
          plugins: this.props.plugins,
          onChange: this.props.onChange,
          editorState: this.props.editorState
        })
      );
    }
  }]);

  return PluginsModal;
}(_react.Component);

exports.default = PluginsModal;