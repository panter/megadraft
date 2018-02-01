"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                    *
                    * License: MIT
                    */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require("draft-js");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _ToolbarItem = require("./ToolbarItem");

var _ToolbarItem2 = _interopRequireDefault(_ToolbarItem);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = (_temp = _class = function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.state = {
      show: false,
      editingEntity: null,
      link: "",
      error: null
    };
    _this.renderButton = _this.renderButton.bind(_this);
    _this.cancelEntity = _this.cancelEntity.bind(_this);
    _this.removeEntity = _this.removeEntity.bind(_this);
    _this.setError = _this.setError.bind(_this);
    _this.cancelError = _this.cancelError.bind(_this);
    _this.setBarPosition = (0, _utils.delayCall)(_this.setBarPosition.bind(_this));
    return _this;
  }

  _createClass(Toolbar, [{
    key: "toggleInlineStyle",
    value: function toggleInlineStyle(inlineStyle) {
      var newEditorState = _draftJs.RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
      this.props.onChange(newEditorState);
    }
  }, {
    key: "toggleBlockStyle",
    value: function toggleBlockStyle(blockType) {
      this.props.onChange(_draftJs.RichUtils.toggleBlockType(this.props.editorState, blockType));
    }
  }, {
    key: "toggleEntity",
    value: function toggleEntity(entity) {
      this.setState({ editingEntity: entity });
    }
  }, {
    key: "renderButton",
    value: function renderButton(item, position) {
      var _this2 = this;

      var current = null;
      var toggle = null;
      var active = null;
      var key = item.label;

      switch (item.type) {
        case "custom":
          {
            key = "custom-" + position;
            toggle = function toggle() {
              return item.action(_this2.props.editorState);
            };
            break;
          }
        case "inline":
          {
            current = this.props.editorState.getCurrentInlineStyle();
            toggle = function toggle() {
              return _this2.toggleInlineStyle(item.style);
            };
            active = current.has(item.style);
            break;
          }
        case "block":
          {
            var selection = this.props.editorState.getSelection();
            current = this.props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
            toggle = function toggle() {
              return _this2.toggleBlockStyle(item.style);
            };
            active = item.style === current;
            break;
          }
        case "separator":
          {
            key = "sep-" + position;
            break;
          }
        case "entity":
          {
            var _item$entity = item.entity,
                entity = _item$entity === undefined ? "LINK" : _item$entity;

            key = "entity-" + entity;
            toggle = function toggle() {
              return _this2.toggleEntity(entity);
            };
            active = this.hasEntity(entity);
            break;
          }
      }

      return _react2.default.createElement(_ToolbarItem2.default, { key: key, active: active, toggle: toggle, item: item });
    }
  }, {
    key: "setError",
    value: function setError(errorMsg) {
      this.setState({ error: errorMsg });
    }
  }, {
    key: "cancelError",
    value: function cancelError() {
      this.setState({ error: null });
    }
  }, {
    key: "setBarPosition",
    value: function setBarPosition() {
      var editor = this.props.editor;
      var toolbar = this.toolbarEl;
      var arrow = this.arrowEl;
      var selectionCoords = (0, _utils.getSelectionCoords)(editor, toolbar);

      if (!selectionCoords) {
        return null;
      }

      if (selectionCoords && !this.state.position || this.state.position.bottom !== selectionCoords.offsetBottom || this.state.position.left !== selectionCoords.offsetLeft || !this.state.show) {
        this.setState({
          show: true,
          position: {
            bottom: selectionCoords.offsetBottom,
            left: selectionCoords.offsetLeft
          }
        }, function (state) {
          var minOffsetLeft = 5;
          var minOffsetRight = 5;
          var toolbarDimensions = toolbar.getBoundingClientRect();

          if (toolbarDimensions.left < minOffsetLeft) {
            toolbar.style.left = -(toolbarDimensions.width / 2 + toolbarDimensions.left - minOffsetLeft) + "px";
            arrow.style.left = toolbarDimensions.width / 2 + toolbarDimensions.left - minOffsetLeft + "px";
          }
          if (toolbarDimensions.left + toolbarDimensions.width > window.innerWidth - minOffsetRight) {
            toolbar.style.left = -(toolbarDimensions.right - selectionCoords.offsetLeft + minOffsetRight) + "px";
            arrow.style.left = toolbarDimensions.right - selectionCoords.offsetLeft + minOffsetRight + "px";
          }
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // reset toolbar position every time
      if (this.toolbarEl && this.arrowEl) {
        this.toolbarEl.style.left = "";
        this.arrowEl.style.left = "";
      }
      if (this.props.shouldDisplayToolbarFn(this.props, this.state)) {
        return this.setBarPosition();
      } else {
        if (this.state.show) {
          this.setState({
            show: false,
            editingEntity: null,
            link: "",
            error: null
          });
        }
      }
    }
  }, {
    key: "getCurrentEntityKey",
    value: function getCurrentEntityKey() {
      var selection = this.props.editorState.getSelection();
      var anchorKey = selection.getAnchorKey();
      var contentState = this.props.editorState.getCurrentContent();
      var anchorBlock = contentState.getBlockForKey(anchorKey);
      var offset = selection.anchorOffset;
      var index = selection.isBackward ? offset - 1 : offset;
      return anchorBlock.getEntityAt(index);
    }
  }, {
    key: "getCurrentEntity",
    value: function getCurrentEntity() {
      var contentState = this.props.editorState.getCurrentContent();
      var entityKey = this.getCurrentEntityKey();
      if (entityKey) {
        return contentState.getEntity(entityKey);
      }
      return null;
    }
  }, {
    key: "hasEntity",
    value: function hasEntity(entityType) {
      var entity = this.getCurrentEntity();
      if (entity && entity.getType() === entityType) {
        return true;
      }
      return false;
    }
  }, {
    key: "setEntity",
    value: function setEntity(entityType, data) {
      var mutability = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "MUTABLE";
      var editorState = this.props.editorState;

      var contentState = editorState.getCurrentContent();
      var contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      var newState = _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
      var selectionState = _draftJs.EditorState.forceSelection(newState, editorState.getSelection());

      this.props.onChange(selectionState);
    }
  }, {
    key: "removeEntity",
    value: function removeEntity() {
      var editorState = this.props.editorState;

      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        // toggleLink should be named toggleEntity: https://github.com/facebook/draft-js/issues/737
        this.props.onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
      this.cancelEntity();
    }
  }, {
    key: "cancelEntity",
    value: function cancelEntity() {
      var _this3 = this;

      this.setState({
        editingEntity: null,
        error: null
      }, function () {
        _this3.props.draft && _this3.props.draft.focus();
      });
    }
  }, {
    key: "renderEntityInput",
    value: function renderEntityInput(entityType) {
      var _this4 = this;

      if (!this.props.entityInputs) {
        console.warn("no entityInputs provided");
        return null;
      }
      var Component = this.props.entityInputs[entityType];
      var setEntity = function setEntity(data, mutability) {
        return _this4.setEntity(entityType, data, mutability);
      };
      var entityData = {};
      var entity = null;
      if (this.hasEntity(entityType)) {
        entity = this.getCurrentEntity();
        if (entity) {
          entityData = entity.getData();
        }
      }
      if (Component) {
        return _react2.default.createElement(Component, _extends({
          editorState: this.props.editorState,
          setEntity: setEntity,
          entityType: entityType,
          onChange: this.props.onChange,
          cancelEntity: this.cancelEntity,
          removeEntity: this.removeEntity,
          setError: this.setError,
          cancelError: this.cancelError,
          entity: entity
        }, entityData));
      } else {
        console.warn("unknown entity type: " + entityType);
        return null;
      }
    }
  }, {
    key: "renderToolList",
    value: function renderToolList() {
      return _react2.default.createElement(
        "ul",
        { className: "toolbar__list" },
        this.props.actions.map(this.renderButton)
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (this.props.readOnly) {
        return null;
      }

      var toolbarClass = (0, _classnames2.default)("toolbar", {
        "toolbar--open": this.state.show,
        "toolbar--error": this.state.error
      });

      return _react2.default.createElement(
        "div",
        {
          className: toolbarClass,
          style: this.state.position,
          ref: "toolbarWrapper",
          onMouseDown: function onMouseDown(e) {
            e.preventDefault();
          }
        },
        _react2.default.createElement(
          "div",
          { style: { position: "absolute", bottom: 0 } },
          _react2.default.createElement(
            "div",
            { className: "toolbar__wrapper", ref: function ref(el) {
                _this5.toolbarEl = el;
              } },
            this.state.editingEntity ? this.renderEntityInput(this.state.editingEntity) : this.renderToolList(),
            _react2.default.createElement(
              "p",
              { className: "toolbar__error-msg" },
              this.state.error
            ),
            _react2.default.createElement("span", { className: "toolbar__arrow", ref: function ref(el) {
                _this5.arrowEl = el;
              } })
          )
        )
      );
    }
  }]);

  return Toolbar;
}(_react.Component), _class.defaultProps = {
  shouldDisplayToolbarFn: function shouldDisplayToolbarFn(props, state) {

    return (props.editorHasFocus || state.editingEntity) && !props.editorState.getSelection().isCollapsed();
  }
}, _class.propTypes = {
  editorHasFocus: _propTypes2.default.bool
}, _temp);
exports.default = Toolbar;