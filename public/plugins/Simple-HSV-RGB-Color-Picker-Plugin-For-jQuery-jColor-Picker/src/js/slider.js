(function($){
    'use strict';

    /**
     * set handle position
     * @param {Object} context
     * @param {number} y
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var setHandle = function(context, y, r, g, b){

        var yRadius = Math.round(context.$sliderHandle.outerHeight() / 2);
        var color = Math.round(256 - (r + g + b) / 3);

        if(color >= 256/2 - 20 && color <= 256/2 + 20){
            color = 0;
        }

        context.$sliderHandle.css({
            left: '-1px',
            top: (y - yRadius) + 'px',
            'background-color': 'rgba(' + color + ', ' + color + ',' + color + ', 0.5)'
        });
    };

    /**
     * move action
     * @param {Object} context
     * @param {number} x
     * @param {number} y
     * @param {boolean} if action started
     */
    var move = function(context, x, y){

        var height,
            data;

        if(context.sliderMouseDown){

            y = Math.round(y);

            height = Math.round(context.$slider.height());

            if(y < 0){
                y = 0;
            }

            if(y >= height){
                y = height - 1;
            }

            data = context.sliderCtx.getImageData(0, y, 1, 1).data;

            //set handle position
            setHandle(context, y, data[0], data[1], data[2]);

            context.$root.trigger('jcp-color-changed', [data[0], data[1], data[2], 'slider']);
        }

        return context.sliderMouseDown;
    };

    /**
     *  set handle by color
     * @param {Object} context
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var setHandleByColor = function(context, type, r, g, b){

        var handlePos;

        switch(type){

            case 'h':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                handlePos = 256 - Math.round(256 * hsv.h);
                break;
            }

            case 's':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                handlePos = 256 - Math.round(256 * hsv.s);
                break;
            }

            case 'v':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                handlePos = 256 - Math.round(256 * hsv.v);
                break;
            }

            case 'r':{
                handlePos = 256 - r;
                break;
            }

            case 'g':{
                handlePos = 256 - g;
                break;
            }

            case 'b':{
                handlePos = 256 - b;
                break;
            }
        }

        //set handle position
        setHandle(context, handlePos, r, g, b);
    };

    /**
     * init slider
     * @param {Object} context
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var drawSlider = function(context, type, r, g, b){

        var width = 20,
            height = 256,
            idata,
            buffer = new Uint8ClampedArray(width * height * 4); //The * 4 at the end represent RGBA

        switch(type){

            case 'h':{
                jQuery.fn.jColorPicker.helpers.drawHew(buffer, width, height);
                break;
            }

            case 's':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                jQuery.fn.jColorPicker.helpers.drawSaturation(buffer, width, height, hsv.h, hsv.v);
                break;
            }

            case 'v':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                jQuery.fn.jColorPicker.helpers.drawValue(buffer, width, height, hsv.h, hsv.v);
                break;
            }

            case 'r':{
                jQuery.fn.jColorPicker.helpers.drawRed(buffer, width, height, g, b);
                break;
            }

            case 'g':{
                jQuery.fn.jColorPicker.helpers.drawGreen(buffer, width, height, r, b);
                break;
            }

            case 'b':{
                jQuery.fn.jColorPicker.helpers.drawBlue(buffer, width, height, r, g);
                break;
            }
        }

        // create imageData object
        idata = context.sliderCtx.createImageData(width, height);

        // set our buffer as source
        idata.data.set(buffer);

        // update canvas with new data
        context.sliderCtx.putImageData(idata, 0, 0);
    };

    // --------------- COMMON -----------------------------------------

    /**
     * init slider
     * @param {Object} context
     */
    var initSlider = function(context){

        context.$root.find('[data-type="holder"]').append('<div data-type="slider-box"><canvas width="20" height="256" data-type="slider" /><div data-type="slider-handle" /></div>');

        context.$sliderBox = context.$root.find('[data-type="slider-box"]');
        context.$sliderHandle = context.$root.find('[data-type="slider-handle"]');
        context.$slider = context.$sliderBox.find('[data-type="slider"]');

        context.slider = context.$slider.get(0);
        context.sliderCtx = context.slider.getContext('2d');
    };

    /**
     * init application events
     * @param {Object} context
     */
    var initEvents = function(context){

        /**
         * on mouse over
         */
        context.$sliderHandle.on('mousedown', function(evt){

            evt.preventDefault();
            context.sliderMouseDown = true;
        });

        /**
         * on mouse over
         */
        $(document).on('mouseup', function(){

            context.sliderMouseDown = false;
        });

        /**
         * on mouse over
         */
        $(document).on('mousemove', function(evt){

             var parentOffset = context.$slider.parent().offset();
             var relX = evt.pageX - parentOffset.left;
             var relY = evt.pageY - parentOffset.top;

             if(move(context, relX, relY)){

                evt.preventDefault();
             }
        });

        /**
         * touch start
         */
        context.$sliderHandle.on('touchstart', function(evt){

            evt.preventDefault();
            context.sliderMouseDown = true;
        });

        /**
         * touch move
         */
        context.$sliderHandle.on('touchmove', function(evt){

            var touches = evt.changedTouches;

            if(touches.length > 0){

                var parentOffset = context.$slider.parent().offset();
                var relX = touches[0].pageX - parentOffset.left;
                var relY = touches[0].pageY - parentOffset.top;

                if(move(context, relX, relY)){

                    evt.preventDefault();
                }
            }
        });

        /**
         * touch end
         */
        context.$sliderHandle.on('touchend', function(evt){

            context.sliderMouseDown = true;
        });

        /**
         * slider onclick
         */
        context.$slider.on('click', function(evt){

            var parentOffset = context.$slider.parent().offset();
            var relY = evt.pageY - parentOffset.top;

            var data = context.sliderCtx.getImageData(0, relY, 1, 1).data;

            //set handle position
            setHandle(context, relY, data[0], data[1], data[2]);

            context.$root.trigger('jcp-color-changed', [data[0], data[1], data[2], 'slider']);
        });
    };

    /**
     * slider
     * @param {jQueryObject} $root
     */
    jQuery.fn.jColorPicker.slider = function($root){

        this.$root = $root;

        //slider
        this.$sliderBox = null;
        this.$sliderHandle = null;
        this.$slider = null;
        this.slider = null;
        this.sliderCtx = null;

        this.sliderMouseDown = false;

        //init slider
        initSlider(this);

        //init events
        initEvents(this);
    };

    // ------------------ API ------------------------------------------

    /**
     * API: draw slider
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    jQuery.fn.jColorPicker.slider.prototype.draw = function(type, r, g, b){

        drawSlider(this, type, r, g, b);
    };

    /**
     *  set handle by color
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    jQuery.fn.jColorPicker.slider.prototype.setHandleByColor = function(type, r, g, b){
        setHandleByColor(this, type, r, g, b);
    };

})(jQuery);