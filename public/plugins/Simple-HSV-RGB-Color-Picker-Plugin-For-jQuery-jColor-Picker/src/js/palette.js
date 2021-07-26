(function($){
    'use strict';

    /**
     * set handle position
     * @param {Object} context
     * @param {number} x
     * @param {number} y
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var setHandle = function(context, x, y, r, g, b){

        var radius = Math.round(context.$paletteHandle.outerWidth() / 2);
        var color = Math.round(256 - (r + g + b) / 3);

        if(color >= 256/2 - 20 && color <= 256/2 + 20){
            color = 0;
        }

        context.$paletteHandle.css({
            left: (x - radius) + 'px',
            top: (y - radius) + 'px',
            'border-color': 'rgb(' + color + ', ' + color + ',' + color + ')'
        });
    };

    /**
     * set handle position by color
     * @param {Object} context
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var setHandleByColor = function(context, type, r, g, b){

        var handlePosX,
            handlePosY;

        switch(type){

            case 'h':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                handlePosX = Math.round(256 * hsv.s);
                handlePosY = 256 - Math.round(256 * hsv.v);
                break;
            }

            case 's':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                handlePosX = Math.round(256 * hsv.h);
                handlePosY = 256 - Math.round(256 * hsv.v);
                break;
            }

            case 'v':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);

                handlePosX = Math.round(256 * hsv.h);
                handlePosY = 256 - Math.round(256 * hsv.s);
                break;
            }

            case 'r':{
                handlePosX = b; //g
                handlePosY = 256 - g; //256 - b
                break;
            }

            case 'g':{
                handlePosX = b;
                handlePosY = 256 - r;
                break;
            }

            case 'b':{
                handlePosX = r;
                handlePosY = 256 - g;
                break;
            }
        }

        //set handle position
        setHandle(context, handlePosX, handlePosY, r, g, b);
    };

    /**
     * draw palette
     * @param {Object} context
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    var drawPalette = function(context, type, r, g, b){

        var width = 256,
            height = 256,
            idata,
            buffer = new Uint8ClampedArray(width * height * 4); //The * 4 at the end represent RGBA

        switch(type){

            case 'h':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                jQuery.fn.jColorPicker.helpers.drawValueSaturation(buffer, width, height, hsv.h);
                break;
            }

            case 's':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                jQuery.fn.jColorPicker.helpers.drawValueHew(buffer, width, height, hsv.s);
                break;
            }

            case 'v':{
                var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(r, g, b);
                jQuery.fn.jColorPicker.helpers.drawSaturationHew(buffer, width, height, hsv.v);
                break;
            }

            case 'r':{
                jQuery.fn.jColorPicker.helpers.drawGreenBlue(buffer, width, height, r);
                break;
            }

            case 'g':{
                jQuery.fn.jColorPicker.helpers.drawRedBlue(buffer, width, height, g);
                break;
            }

            case 'b':{
                jQuery.fn.jColorPicker.helpers.drawRedGreen(buffer, width, height, b);
                break;
            }
        }

        // create imageData object
        idata = context.paletteCtx.createImageData(width, height);

        // set our buffer as source
        idata.data.set(buffer);

        // update canvas with new data
        context.paletteCtx.putImageData(idata, 0, 0);
    };

    /**
     * move action
     * @param {Object} context
     * @param {number} x
     * @param {number} y
     * @param {boolean} if action started
     */
    var move = function(context, x, y){

        var data,
            width,
            height;

        if(context.paletteMouseDown){

            x = Math.round(x);
            y = Math.round(y);

            width = Math.round(context.$palette.width());
            height = Math.round(context.$palette.height());

            if(x < 0){
                x = 0;
            }

            if(x >= width){
                x = width - 1;
            }

            if(y < 0){
                y = 0;
            }

            if(y >= height){
                y = height - 1;
            }

            data = context.paletteCtx.getImageData(x, y, 1, 1).data;

            //set handle position
            setHandle(context, x, y, data[0], data[1], data[2]);

            context.$root.trigger('jcp-color-changed', [data[0], data[1], data[2], 'palette']);
        }

        return context.sliderMouseDown;
    };

    /**
     * init application events
     * @param {Object} context
     */
    var initEvents = function(context){

        /**
         * on mouse over
         */
        context.$paletteHandle.on('mousedown', function(evt){

            evt.preventDefault();
            context.paletteMouseDown = true;
        });

        /**
         * on mouse over
         */
        $(document).on('mouseup', function(){

            context.paletteMouseDown = false;
        });

        /**
         * on mouse over
         */
        $(document).on('mousemove', function(evt){

            var parentOffset = context.$palette.parent().offset();
            var relX = evt.pageX - parentOffset.left;
            var relY = evt.pageY - parentOffset.top;

            if(move(context, relX, relY)){

                evt.preventDefault();
            }
        });

        /**
         * touch start
         */
        context.$paletteHandle.on('touchstart', function(evt){

            evt.preventDefault();
            context.paletteMouseDown = true;
        });

        /**
         * touch move
         */
        context.$paletteHandle.on('touchmove', function(evt){

            var touches = evt.changedTouches;

            if(touches.length > 0){

                var parentOffset = context.$palette.parent().offset();
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
        context.$paletteHandle.on('touchend', function(evt){

            context.paletteMouseDown = true;
        });

        /**
         * on click
         */
        context.$palette.on('click', function(evt){

            var parentOffset = context.$palette.parent().offset();
            var relX = evt.pageX - parentOffset.left;
            var relY = evt.pageY - parentOffset.top;

            var data = context.paletteCtx.getImageData(relX, relY, 1, 1).data;

            //set handle position
            setHandle(context, relX, relY, data[0], data[1], data[2]);

            context.$root.trigger('jcp-color-changed', [data[0], data[1], data[2], 'palette']);
        });
    };

    /**
     * init palette
     * @param {Object} context
     */
    var initPalette = function(context){

        context.$root.find('[data-type="holder"]').append('<div data-type="palette-box"><canvas width="256" height="256" data-type="palette" /><div data-type="palette-handle" /></div>');

        context.$paletteBox = context.$root.find('[data-type="palette-box"]');
        context.$paletteHandle = context.$root.find('[data-type="palette-handle"]');
        context.$palette = context.$paletteBox.find('[data-type="palette"]');

        context.palette = context.$palette.get(0);
        context.paletteCtx = context.palette.getContext('2d');
    };

    /**
     * palette
     * @param {jQueryObject} $root
     */
    jQuery.fn.jColorPicker.palette = function($root){

        this.$root = $root;

        this.$paletteBox = null;
        this.$palette = null;
        this.$paletteHandle = null;
        this.palette = null;
        this.paletteCtx = null;

        //drag
        this.paletteMouseDown = false;

        //init palette
        initPalette(this);

        //init events
        initEvents(this);
    };

    /**
     * API: draw palette
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    jQuery.fn.jColorPicker.palette.prototype.draw = function(type, r, g, b){

        drawPalette(this, type, r, g, b);
    };

    /**
     * set handle by color
     * @param {string} type
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    jQuery.fn.jColorPicker.palette.prototype.setHandleByColor = function(type, r, g, b){
        setHandleByColor(this, type, r, g, b);
    };

})(jQuery);