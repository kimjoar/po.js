(function (root, factory) {

    /*
     * Export magic for node, AMD and the browser.
     */
    if (typeof define === 'function' && define.amd) define(factory);
    else if (typeof exports === 'object') module.exports = factory();
    else root.po = factory();

}(this, function () {

    var slice = Array.prototype.slice;

    var toArray = function (array) {
        return slice.call(array);
    };

    var extend = function (src) {
        var objs = slice.call(arguments, 1);
        for (var i = 0; i < objs.length; i++) {
            for (var key in objs[i]) {
                src[key] = objs[i][key];
            }
        }
        return src;
    };

    var merge = function(args) {
        var argsArray = [{}].concat(toArray(args));
        return extend.apply(null, argsArray);
    };

    return {
        create: function() {
            var attrs = merge(arguments);
            return function ($el) {
                return extend({
                    $el: $el,
                    $: function(selector) {
                        return this.$el.find(selector);
                    }
                }, attrs);
            }
        },
        input: function(selector) {
            return function(val) {
                this.$(selector).val(val).change();
                return this;
            }
        },
        button: function(selector) {
            return function() {
                this.$(selector).click();
                return this;
            }
        }
    };

}));

