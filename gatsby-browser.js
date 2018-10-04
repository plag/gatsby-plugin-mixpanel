"use strict";

var _react = _interopRequireDefault(require("react"));

var _mixpanelBrowser = _interopRequireDefault(require("mixpanel-browser"));

var _reactMixpanel = _interopRequireDefault(require("react-mixpanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isEnable = function isEnable(options) {
  return (process.env.NODE_ENV === "production" || options.enableOnDevMode) && options.apiToken;
};

var getOptions = function getOptions(options) {
  return _extends({}, {
    apiToken: null,
    enableOnDevMode: true,
    debug: false
  }, options);
};

exports.onRouteUpdate = function (_ref, pluginOptions) {
  var location = _ref.location;
  var options = getOptions(pluginOptions);

  if (!isEnable(options)) {
    return;
  }

  if (options.pageViews) {
    var mixpanelEvent = options.pageViews[location.pathname];

    if (mixpanelEvent) {
      _mixpanelBrowser.default.track(mixpanelEvent, location);
    }
  }
};

exports.onClientEntry = function (skip, pluginOptions) {
  var options = getOptions(pluginOptions);

  if (!isEnable(options)) {
    _mixpanelBrowser.default.init('disable', {
      autotrack: false
    });

    _mixpanelBrowser.default.disable();

    return;
  }

  _mixpanelBrowser.default.init(options.apiToken, {
    debug: options.debug
  });
};

exports.wrapPageElement = function (_ref2) {
  var element = _ref2.element;
  return _react.default.createElement(_reactMixpanel.default, {
    mixpanel: _mixpanelBrowser.default
  }, element);
};