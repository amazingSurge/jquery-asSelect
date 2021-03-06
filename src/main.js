import $ from 'jquery';
import asSelect from './asSelect';
import info from './info';

const NAMESPACE = 'asSelect';
const OtherAsSelect = $.fn.asSelect;

const jQueryAsSelect = function(options, ...args) {
  if (typeof options === 'string') {
    const method = options;

    if (/^_/.test(method)) {
      return false;
    } else if ((/^(get)/.test(method))) {
      const instance = this.first().data(NAMESPACE);
      if (instance && typeof instance[method] === 'function') {
        return instance[method](...args);
      }
    } else {
      return this.each(function() {
        const instance = $.data(this, NAMESPACE);
        if (instance && typeof instance[method] === 'function') {
          instance[method](...args);
        }
      });
    }
  }

  return this.each(function() {
    if (!$(this).data(NAMESPACE)) {
      $(this).data(NAMESPACE, new asSelect(this, options));
    }
  });
};

$.fn.asSelect = jQueryAsSelect;

$.asSelect = $.extend({
  setDefaults: asSelect.setDefaults,
  noConflict: function() {
    $.fn.asSelect = OtherAsSelect;
    return jQueryAsSelect;
  }
}, info);
