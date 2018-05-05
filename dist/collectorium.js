(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.collectorium = factory());
}(this, (function () { 'use strict';

  function configure(element, userOptions, defaultOptions) {
    return Object.keys(defaultOptions).reduce(function (options, key) {
      var attrValue = element.getAttribute("data-" + key.toLowerCase());

      // eslint-disable-next-line no-param-reassign
      options[key] = attrValue || userOptions[key] || defaultOptions[key];

      return options;
    }, {});
  }

  var defaultOptions = {
    disableHistory: true,
    classNames: {
      link: "collectorium__tab-link",
      content: "collectorium__content",
      active: "is-active"
    }
  };

  function Collectorium(dependencies, target) {
    var _this = this;

    var userOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var configure = dependencies.configure,
        context = dependencies.context,
        defaultOptions = dependencies.defaultOptions;

    var elements = typeof target === "string" ? context.querySelectorAll(target) : target;

    if (elements.length > 1) {
      return [].slice.call(elements).map(function (element) {
        return new Collectorium(dependencies, element, userOptions);
      });
    }

    this.context = context;
    this.element = elements[0] || elements;
    this.options = configure(this.element, userOptions, defaultOptions);
    this.links = this.element.querySelectorAll("." + this.options.classNames.link);
    this.contents = this.element.querySelectorAll("." + this.options.classNames.content);

    // Activate the first tab if no tab is set active by default.
    if (!this.element.querySelector("." + this.options.classNames.active)) {
      this.activateTab(1);
    }

    if (this.options.disableHistory) {
      var _loop = function _loop(i) {
        _this.links[i - 1].addEventListener("click", function (e) {
          e.preventDefault();

          _this.activateTab(i);
        });
      };

      for (var i = 1; i <= this.links.length; i += 1) {
        _loop(i);
      }
    }

    return this;
  }

  Collectorium.prototype.activateTab = function activateTab(n) {
    for (var i = 1; i <= this.links.length; i += 1) {
      this.deactivateTab(i);
    }this.links[n - 1].classList.add(this.options.classNames.active);
    this.nthContentElement(n).classList.add(this.options.classNames.active);
  };

  Collectorium.prototype.deactivateTab = function deactivateTab(n) {
    this.links[n - 1].classList.remove(this.options.classNames.active);
    this.nthContentElement(n).classList.remove(this.options.classNames.active);
  };

  Collectorium.prototype.nthContentElement = function nthContentElement(n) {
    if (n === 1) return this.contents[this.contents.length - 1];

    return this.contents[n - 2];
  };

  var index = (function (selector, userOptions) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
    return new Collectorium({ configure: configure, context: context, defaultOptions: defaultOptions }, selector, userOptions);
  });

  return index;

})));
