(function () {
  var namespace = 'o-collectorium';

  var classNameMain = namespace;
  var selectorMain = '.' + classNameMain;

  var classNameTabLink = namespace + '__tab-link';
  var selectorTabLink = '.' + classNameTabLink;

  var Collectorium = function (collectorium, options) {
    var self = this;
    var defaults = {
      disableHistory: true
    };

    options = options || {};

    if (defaults.disableHistory) {
      $.bind(collectorium, {
        'click': function (event) {
          if (event.target.className.indexOf(classNameTabLink) >= 0) {
            event.preventDefault();

            $$('.is-active', collectorium).forEach(function (activeElement) {
              activeElement.className = activeElement.className.replace(' is-active', '');
            });

            var tabContent = $(event.target.hash, collectorium).nextElementSibling;
            tabContent.className = tabContent.className + ' is-active';
          }
        }
      });
    }
  };

  // Helpers
  var slice = Array.prototype.slice;

  function $(selector, context) {
    return typeof selector === "string"? (context || document).querySelector(selector) : selector || null;
  }

  function $$(selector, context) {
    return slice.call((context || document).querySelectorAll(selector));
  }

  $.bind = function(element, o) {
    if (element) {
      for (var event in o) {
        var callback = o[event];

        event.split(/\s+/).forEach(function (event) {
          element.addEventListener(event, callback);
        });
      }
    }
  };

  // Initialization
  function init() {
    $$(selectorMain).forEach(function (collectorium) {
      new Collectorium(collectorium);
    });
  }

  // DOM already loaded?
  if (document.readyState !== 'loading') {
    init();
  }
  else {
    // Wait for it
    document.addEventListener('DOMContentLoaded', init);
  }
}());