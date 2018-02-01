"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorStateToJSON = editorStateToJSON;
exports.editorStateFromRaw = editorStateFromRaw;
exports.getSelectedBlockElement = getSelectedBlockElement;
exports.getSelectionCoords = getSelectionCoords;
exports.createTypeStrategy = createTypeStrategy;
exports.delayCall = delayCall;

var _draftJs = require("draft-js");

var _defaultDecorator = require("./decorators/defaultDecorator");

var _defaultDecorator2 = _interopRequireDefault(_defaultDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, Andrew Coelho <info@andrewcoelho.com>
 *
 * License: MIT
 */

function editorStateToJSON(editorState) {
  if (editorState) {
    var content = editorState.getCurrentContent();
    return JSON.stringify((0, _draftJs.convertToRaw)(content), null, 2);
  }
}

function editorStateFromRaw(rawContent) {
  var decorator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultDecorator2.default;

  if (rawContent) {
    var content = (0, _draftJs.convertFromRaw)(rawContent);
    return _draftJs.EditorState.createWithContent(content, decorator);
  } else {
    return _draftJs.EditorState.createEmpty(decorator);
  }
}

function getSelectedBlockElement(range) {
  var node = range.startContainer;
  do {
    var nodeIsDataBlock = node.getAttribute ? node.getAttribute("data-block") : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
}

function getSelectionCoords(editor, toolbar) {
  var editorBounds = editor.getBoundingClientRect();
  var rangeBounds = (0, _draftJs.getVisibleSelectionRect)(window);

  if (!rangeBounds || !toolbar) {
    return null;
  }

  var rangeWidth = rangeBounds.right - rangeBounds.left;

  var toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  var offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  var offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  var offsetBottom = editorBounds.bottom - rangeBounds.top + 14;
  return { offsetLeft: offsetLeft, offsetTop: offsetTop, offsetBottom: offsetBottom };
}

function createTypeStrategy(type) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
    }, callback);
  };
}

/**
 * Returns a wrapper for the given function which cannot be called
 * more often than the given interval. Every time the wrapper is called
 * a timeout gets reset to the interval's number of ms before calling the fn.
 *
 * Keep attention to bind the correct context to the provided funtion using bind() or '::'!
 *
 * @export
 * @param {function} fn The function to execute after the given interval.
 * @param {number} [interval=100] The interval to wait for before calling the wrapped function.
 * @example
 * ```
 * const delayedLog = delayCall(::console.log, 200);
 * delayedLog('hans');
 * delayedLog('heiri');
 * // logs 'heiri' after 200ms, 'hans' won't be logged at all.
 * ```
 * @returns {void}
 */
function delayCall(fn) {
  var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(function () {
      return fn.apply(window, args);
    }, interval);
  };
}