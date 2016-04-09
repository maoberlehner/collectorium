/**
 * collectorium - pure CSS tabs
 * @author Markus Oberlehner https://collectorium.oberlehner.net/
 *
 * Parts of this file are copied from the code of the great awesomeplete
 * autocomplete widget by Lea Verou (http://leaverou.github.io/awesomplete)
 */

(function () {
  var _ = function (element, o) {
    var me = this;

    // Make it possible to initialize collectorium on multiple elements at once.
    if (typeof element === 'string' && $$(element).length > 1) {
      var object = [];
      $$(element).forEach(function (element) {
        object.push(new _(element, o));
      });
      return object;
    }

    me.element = $(element);
    me.options = {};

    // Return an empty object if the element does not exist.
    if (!me.element) {
      return {};
    }

    o = o || {};

    configure(me, {
      disableHistory: false,
      classNames: {
        link: 'js-tab-link',
        active: 'is-active'
      }
    }, o);

    // Activate the first tab if no tab is set active by default.
    if (!$('.' + me.options.classNames.active, me.element)) {
      var firstTabLink = $('.' + me.options.classNames.link, me.element);
      me.activate(firstTabLink);
    }

    $.bind($$('.' + me.options.classNames.link, me.element), {
      click: function (e) {
        if (me.options.disableHistory) {
          e.preventDefault();
        }
        me.activate(this);
      }
    });
  };

  _.prototype = {
    activate: function (tabLink) {
      var me = this;
      var tabAnchor = $(tabLink.getAttribute('href'));
      var tabContent = $(tabAnchor).nextElementSibling;
      me.deactivate();
      tabLink.classList.add(me.options.classNames.active);
      if (me.options.disableHistory) {
        tabContent.classList.add(me.options.classNames.active);
      }
    },
    deactivate: function () {
      var me = this;
      $$('.' + me.options.classNames.active, me.element).forEach(function (activeElement) {
        activeElement.classList.remove(me.options.classNames.active);
      });
    }
  };

  // Private functions.
  function configure(instance, properties, o) {
    for (var i in properties) {
      var initial = properties[i];
      var attrValue = instance.element.getAttribute('data-' + i.toLowerCase());

      if (typeof initial === 'number') {
        instance.options[i] = parseInt(attrValue);
      }
      else if (initial === false) {
        instance.options[i] = attrValue !== null;
      }
      else if (initial instanceof Function) {
        instance.options[i] = null;
      }
      else {
        instance.options[i] = attrValue;
      }

      if (!instance.options[i] && instance.options[i] !== 0) {
        instance.options[i] = (i in o) ? o[i] : initial;
      }
    }
  }

  // Helpers.
  var slice = Array.prototype.slice;

  function $(expr, con) {
    return typeof expr === 'string' ? (con || document).querySelector(expr) : expr || null;
  }

  function $$(expr, con) {
    return slice.call((con || document).querySelectorAll(expr));
  }

  $.bind = function(elements, o) {
    if (elements) {
      elements = elements.length ? elements : [elements];
      elements.forEach(function (element) {
        for (var event in o) {
          var callback = o[event];
          event.split(/\s+/).forEach(function (event) {
            element.addEventListener(event, callback);
          });
        }
      });
    }
  };

  _.$ = $;
  _.$$ = $$;

  // Make sure to export collectorium on self when in a browser.
  if (typeof self !== 'undefined') {
    self.collectorium = _;
  }

  // Expose collectorium as a CJS module.
  if (typeof module === 'object' && module.exports) {
    module.exports = _;
  }

  return _;
}());
