"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _draftJs = require("draft-js");

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _Toolbar = require("./Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Sidebar = require("./Sidebar");

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Media = require("./Media");

var _Media2 = _interopRequireDefault(_Media);

var _plugin = require("../plugins/not-found/plugin");

var _plugin2 = _interopRequireDefault(_plugin);

var _default = require("../plugins/default");

var _default2 = _interopRequireDefault(_default);

var _default3 = require("../actions/default");

var _default4 = _interopRequireDefault(_default3);

var _default5 = require("../entity_inputs/default");

var _default6 = _interopRequireDefault(_default5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// i18n shim! I feel bad for doing this =(
// https://github.com/megawac/async/blob/d2dd36b4558f483682f3c672630fdcb36a96d4d2/lib/async.js#L16
((typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" && global.global === global && global || undefined).__ = function (x) {
  return x;
};

var NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

var MegadraftEditor = (_temp = _class = function (_Component) {
  _inherits(MegadraftEditor, _Component);

  function MegadraftEditor(props) {
    _classCallCheck(this, MegadraftEditor);

    var _this = _possibleConstructorReturn(this, (MegadraftEditor.__proto__ || Object.getPrototypeOf(MegadraftEditor)).call(this, props));

    _this.state = {
      readOnly: _this.props.readOnly || false
    };

    _this.onChange = _this.onChange.bind(_this);

    _this.mediaBlockRenderer = _this.mediaBlockRenderer.bind(_this);

    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.handleReturn = _this.handleReturn.bind(_this);

    _this.setReadOnly = _this.setReadOnly.bind(_this);
    _this.getReadOnly = _this.getReadOnly.bind(_this);
    _this.getInitialReadOnly = _this.getInitialReadOnly.bind(_this);
    _this.setInitialReadOnly = _this.setInitialReadOnly.bind(_this);

    _this.externalKeyBindings = _this.externalKeyBindings.bind(_this);

    _this.plugins = _this.getValidPlugins();
    _this.entityInputs = _this.props.entityInputs || _default6.default;
    _this.blocksWithoutStyleReset = _this.props.blocksWithoutStyleReset || NO_RESET_STYLE_DEFAULT;

    _this.pluginsByType = _this.getPluginsByType();

    _this.keyBindings = _this.props.keyBindings || [];

    return _this;
  }

  _createClass(MegadraftEditor, [{
    key: "getValidPlugins",
    value: function getValidPlugins() {
      var plugins = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (this.props.plugins || _default2.default)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (!plugin || typeof plugin.type !== "string") {
            console.warn("Plugin: Missing `type` field. Details: ", plugin);
            continue;
          }
          plugins.push(plugin);
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

      return plugins;
    }
  }, {
    key: "getPluginsByType",
    value: function getPluginsByType() {
      var pluginsByType = {};

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var plugin = _step2.value;

          pluginsByType[plugin.type] = plugin;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return pluginsByType;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.readOnly !== nextProps.readOnly) {
        this.setState({ readOnly: nextProps.readOnly });
      }
    }
  }, {
    key: "onChange",
    value: function onChange(editorState) {
      this.props.onChange(editorState);
    }
  }, {
    key: "externalKeyBindings",
    value: function externalKeyBindings(e) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.keyBindings[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var kb = _step3.value;

          if (kb.isKeyBound(e)) {
            return kb.name;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return (0, _draftJs.getDefaultKeyBinding)(e);
    }
  }, {
    key: "onTab",
    value: function onTab(event) {
      event.preventDefault();
    }
  }, {
    key: "handleKeyCommand",
    value: function handleKeyCommand(command) {
      // external key bindings
      if (this.keyBindings.length) {
        var extKb = this.keyBindings.find(function (kb) {
          return kb.name === command;
        });
        if (extKb) {
          extKb.action();
          return true;
        }
      }

      var editorState = this.props.editorState;

      var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.props.onChange(newState);
        return true;
      }
      return false;
    }

    /*
     * Copyright (c) 2016 Icelab
     *
     * License: MIT
     */
    //Based on https://github.com/icelab/draft-js-block-breakout-plugin

  }, {
    key: "resetBlockStyle",
    value: function resetBlockStyle(editorState, selection, contentState, currentBlock, blockType) {
      var List = _immutable2.default.List;

      var emptyBlockKey = (0, _draftJs.genKey)();

      var emptyBlock = new _draftJs.ContentBlock({
        key: emptyBlockKey,
        text: "",
        type: blockType,
        depth: 0,
        characterList: List(),
        inlineStyleRanges: []
      });
      var blockMap = contentState.getBlockMap();

      var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
        return v === currentBlock;
      });
      var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
        return v === currentBlock;
      }).rest();

      var augmentedBlocks = [[currentBlock.getKey(), currentBlock], [emptyBlockKey, emptyBlock]];

      var focusKey = emptyBlockKey;
      var newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
      var newContentState = contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
          anchorKey: focusKey,
          anchorOffset: 0,
          focusKey: focusKey,
          focusOffset: 0,
          isBackward: false
        })
      });
      var noStyle = _immutable2.default.OrderedSet([]);
      var resetState = _draftJs.EditorState.push(editorState, newContentState, "split-block");
      var emptySelection = _draftJs.SelectionState.createEmpty(emptyBlockKey);
      var editorSelected = _draftJs.EditorState.forceSelection(resetState, emptySelection);
      var noStyleState = _draftJs.EditorState.setInlineStyleOverride(editorSelected, noStyle);
      this.props.onChange(noStyleState);
    }
  }, {
    key: "handleReturn",
    value: function handleReturn(event) {
      if (this.props.softNewLines === false) {
        return false;
      }

      if (!event.shiftKey) {
        var _editorState = this.props.editorState;

        var selection = _editorState.getSelection();
        var contentState = _editorState.getCurrentContent();
        var currentBlock = contentState.getBlockForKey(selection.getEndKey());
        var endOffset = selection.getEndOffset();
        var atEndOfBlock = endOffset === currentBlock.getLength();
        var resetStyleNewLine = this.props.resetStyleNewLine;
        var noReset = this.blocksWithoutStyleReset.includes(currentBlock.type);

        if (atEndOfBlock && resetStyleNewLine) {
          var blockType = noReset ? currentBlock.type : "unstyled";
          this.resetBlockStyle(_editorState, selection, contentState, currentBlock, blockType);
          return true;
        }
        return false;
      }

      var editorState = this.props.editorState;


      var currentContent = editorState.getCurrentContent();
      var currentSelection = editorState.getSelection();
      var contentBlock = currentContent.getBlockMap().get(currentSelection.getFocusKey());
      var contentText = contentBlock.getText();

      if (contentText.charAt(currentSelection.focusOffset - 1) == "\n" || contentText.charAt(currentSelection.focusOffset) == "\n") {
        return false;
      }

      var newState = _draftJs.RichUtils.insertSoftNewline(editorState);
      this.props.onChange(newState);
      return true;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.refs.draft.focus();
    }
  }, {
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      this.setState({ readOnly: readOnly });
    }
  }, {
    key: "getReadOnly",
    value: function getReadOnly() {
      return this.state.readOnly;
    }
  }, {
    key: "getInitialReadOnly",
    value: function getInitialReadOnly() {
      return this.props.readOnly || false;
    }
  }, {
    key: "setInitialReadOnly",
    value: function setInitialReadOnly() {
      var readOnly = this.props.readOnly || false;
      this.setState({ readOnly: readOnly });
    }
  }, {
    key: "handleBlockNotFound",
    value: function handleBlockNotFound(block) {
      if (this.props.handleBlockNotFound) {
        return this.props.handleBlockNotFound(block);
      }
      return _plugin2.default;
    }
  }, {
    key: "mediaBlockRenderer",
    value: function mediaBlockRenderer(block) {
      if (block.getType() !== "atomic") {
        return null;
      }

      var type = block.getData().toObject().type;

      var plugin = this.pluginsByType[type] || this.handleBlockNotFound(block);
      if (!plugin) {
        return null;
      }

      return {
        component: _Media2.default,
        editable: false,
        props: {
          plugin: plugin,
          onChange: this.onChange,
          editorState: this.props.editorState,
          setReadOnly: this.setReadOnly,
          getReadOnly: this.getReadOnly,
          getInitialReadOnly: this.getInitialReadOnly,
          setInitialReadOnly: this.setInitialReadOnly
        }
      };
    }
  }, {
    key: "blockStyleFn",
    value: function blockStyleFn(contentBlock) {
      var type = contentBlock.getType();
      if (type === "unstyled") {
        return "paragraph";
      }
    }
  }, {
    key: "renderSidebar",
    value: function renderSidebar(props) {
      var sidebarRendererFn = this.props.sidebarRendererFn;

      if (typeof sidebarRendererFn === "function") {
        return sidebarRendererFn(props);
      }
      return _react2.default.createElement(_Sidebar2.default, props);
    }
  }, {
    key: "renderToolbar",
    value: function renderToolbar(props) {
      var _props$Toolbar = this.props.Toolbar,
          Toolbar = _props$Toolbar === undefined ? _Toolbar2.default : _props$Toolbar;

      return _react2.default.createElement(Toolbar, props);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "megadraft" },
        _react2.default.createElement(
          "div",
          {
            className: "megadraft-editor",
            id: "megadraft-editor",
            ref: "editor" },
          this.renderSidebar({
            plugins: this.plugins,
            editorState: this.props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            maxSidebarButtons: this.props.maxSidebarButtons,
            modalOptions: this.props.modalOptions
          }),
          _react2.default.createElement(_draftJs.Editor, _extends({}, this.props, {
            ref: "draft",
            readOnly: this.state.readOnly,
            plugins: this.plugins,
            blockRendererFn: this.mediaBlockRenderer,
            blockStyleFn: this.props.blockStyleFn || this.blockStyleFn,
            onTab: this.onTab,
            handleKeyCommand: this.handleKeyCommand,
            handleReturn: this.props.handleReturn || this.handleReturn,
            keyBindingFn: this.externalKeyBindings,
            onChange: this.onChange
          })),
          this.renderToolbar({
            editor: this.refs.editor,
            editorState: this.props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.props.actions,
            entityInputs: this.entityInputs,
            shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn
          })
        )
      );
    }
  }]);

  return MegadraftEditor;
}(_react.Component), _class.defaultProps = {
  actions: _default4.default
}, _temp);
exports.default = MegadraftEditor;