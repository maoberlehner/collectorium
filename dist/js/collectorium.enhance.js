(function () {
  var namespace = 'o-collectorium';

  var classNameMain = namespace;
  var selectorMain = '.' + classNameMain;

  var classNameTabLink = namespace + '__tab-link';
  var selectorTabLink = '.' + classNameTabLink;

  var classNameContent = namespace + '__content';
  var selectorContent = '.' + classNameContent;

  var _ = function (collectorium, options) {
    var defaults = {
      disableHistory: true,
      addActiveClass: true,
      activateTab: 1
    };

    options = options || {};

    // Merge options with defaults
    for (var attrname in defaults) {
      if (typeof options[attrname] == 'undefined') {
        options[attrname] = defaults[attrname];
      }
    }

    $.bind(collectorium, {
      'click': function (event) {
        if (event.target.className.indexOf(classNameTabLink) >= 0) {
          if (options.disableHistory) {
            // Disable hash link history
            event.preventDefault();
          }

          if (options.addActiveClass) {
            // Remove active classes from tab contents and tab links
            $$('.is-active', collectorium).forEach(function (activeElement) {
              activeElement.className = activeElement.className.replace(' is-active', '');
            });

            // Add active classe to the active tab link
            event.target.className = event.target.className + ' is-active';

            // Add active classes to the active tab content
            var tabContent = $(event.target.hash, collectorium).nextElementSibling;
            tabContent.className = tabContent.className + ' is-active';
          }
        }
      }
    });

    // Make tab n active
    if (options.activateTab) {
      var nTabLink = $$(selectorTabLink, collectorium)[options.activateTab - 1];
      nTabLink.className = nTabLink.className + ' is-active';

      var nContent = $(nTabLink.hash, collectorium).nextElementSibling;
      nContent.className = nContent.className + ' is-active';
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

  // Make sure to export Awesomplete on self when in a browser
  if (typeof self !== 'undefined') {
    self.Collectorium = _;
  }

  return _;
}());