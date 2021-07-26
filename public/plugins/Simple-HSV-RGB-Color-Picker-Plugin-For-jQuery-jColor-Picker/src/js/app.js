;(function(){
    'use strict';

    /**
     * redraw all
     * @param {Object} context
     */
    var redraw = function(context){

        context.palette.draw(context.type, context.color.r, context.color.g, context.color.b);
        context.slider.draw(context.type, context.color.r, context.color.g, context.color.b);
        context.controls.setColor(context.color);
        context.button.setColor(context.color);
    };

    /**
     * set handler
     * @param {Object} context
     */
    var setHandler = function(context){

        context.slider.setHandleByColor(context.type, context.color.r, context.color.g, context.color.b);
        context.palette.setHandleByColor(context.type, context.color.r, context.color.g, context.color.b);
    };

    /**
     * init events
     * @param {Object} context
     */
    var initEvents = function(context){

        /**
         * on palette type change
         */
        context.$root.on('jcp-type-changed', function(e, type){

            context.type = type;

            redraw(context);
            setHandler(context);
        });

        /**
         * on color change
         */
        context.$root.on('jcp-color-changed', function(e, r, g, b, source){

            context.color = {
                r: r,
                g: g,
                b: b
            };

            redraw(context);

            if(source === 'controls'){
                setHandler(context);
            }
        });
    };

    /**
     * pluginName constructor
     * @param {Object} userOptions - plugin user options
     * @param {jQueryObject} $root - plugin container
     * @constructor
     */
    var Init = function(userOptions, $root){

        this.$root = $root;
        this.palette = null;
        this.slider = null;
        this.control = null;
        this.button = null;

        this.type = 'h';
        this.color = {
            r: 255,
            g: 255,
            b: 255
        };

        this.options = jQuery.extend(true, {

        }, userOptions);

        if(jQuery.fn.jColorPicker.helpers.isCanvasSupported()){

            this.$root.addClass('jcolor-picker');

            this.$root.append('<div data-type="holder"></div>');

            //init palette
            this.palette = new jQuery.fn.jColorPicker.palette(this.$root);

            //init slider
            this.slider = new jQuery.fn.jColorPicker.slider(this.$root);

            //init controls
            this.controls = new jQuery.fn.jColorPicker.controls(this.$root);

            //init button
            this.button = new jQuery.fn.jColorPicker.button(this.$root);

            //init events
            initEvents(this);

            //draw first time
            redraw(this);
            setHandler(this);
        }
    };

    /**
     * jQuery Color Picker main constructor
     * @param {Object} userOptions
     */
    jQuery.fn.jColorPicker = function(userOptions){

        return this.each(function(){

            var context,
                $root = jQuery(this);

            context = new Init(userOptions, $root);
            $root.data('jColorPicker', context);
        });
    };

})();
