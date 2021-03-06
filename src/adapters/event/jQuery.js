define(function(require) {
    'use strict';

    var $ = window.jQuery;

    /**
     * jQuery event creating and dispatching.
     *
     * @class Adapter.EventjQuery
     * @static
     */
    return {

        /**
         * Create a new jQuery Event object
         *
         * @method create
         * @param {String} type
         * @param {MouseEvent|TouchEvent} originalEvent
         * @param {Object} properties
         * @param {Boolean} [bubbles=true]
         * @return {jQuery.Event} New Pointer Event
         */
        create: function(type, originalEvent, properties, bubbles) {
            var event = $.Event(originalEvent, properties);
            event.type = type;
            event.bubbles = bubbles !== false;

            return event;
        },

        /**
         * Trigger a jQuery Event
         *
         * @method trigger
         * @param {jQuery.Event} event Pointer Event
         * @param {Boolean} [event.bubbles=false]
         * @param {HTMLElement} target
         */
        trigger: function(event, target) {
            // if target element does not have capture methods already defined (Legacy IE),
            // then manually define them so the `setPointerCapture` and `releasePointerCapture`
            // methods can be used.
            if (!target.setPointerCapture) {
                require('event/Tracker').setCaptureMethods(target);
            }

            $.event.trigger(event, null, target, !event.bubbles);
        }

    };

});