(function($){
    'use strict';

    jQuery.fn.jColorPicker.helpers = jQuery.fn.jColorPicker.helpers || {};

    /**
     * canvas supported?
     * @return {boolean}
     */
    jQuery.fn.jColorPicker.helpers.isCanvasSupported = function(){
        return !!document.createElement('canvas').getContext;
    };

    // --------------- COLOR CONVERSIONS ------------------------------

    /**
     * RGB to Hex Helper
     * param {number} c
     */
    var rgbToHexHelper = function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    /**
     * RGB to Hex
     * @param {number} r
     * @param {number} g
     * @param {number} b
     */
    jQuery.fn.jColorPicker.helpers.rgbToHex = function(r, g, b) {
        return rgbToHexHelper(r) + rgbToHexHelper(g) + rgbToHexHelper(b);
    };

    /**
     * Hex to RGB
     * @param {string} hex
     * @return {Object} - r, g, b
     */
    jQuery.fn.jColorPicker.helpers.hexToRgb = function(hex) {

        //expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
    };

    /**
     * HSV to RGB
     * @param {number} h - hue (0 <= h <= 1)
     * @param {number} s - saturation (0 <= s <= 1)
     * @param {number} v - value (0 <= v <= 1)
     * @return {Object} 0 <= r, g, b <= 255 are rounded to the nearest integer
     */
    jQuery.fn.jColorPicker.helpers.HSVtoRGB = function(h, s, v){

        var r, g, b, i, f, p, q, t;

        //6 colors: red, green, blue, cyan, magenta, yellow
        i = Math.floor(h * 6);

        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    };

    /**
     * RGB to HSV
     * @param {number} r - hue (0 <= h <= 255)
     * @param {number} g - saturation (0 <= s <= 255)
     * @param {number} b - value (0 <= v <= 255)
     * @return {Object} 0 <= h, s, v <= 1
     */
    jQuery.fn.jColorPicker.helpers.RGBtoHSV = function(r, g, b) {

        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;

        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;
        }

        return {
            h: h,
            s: s,
            v: v
        };
    };

    // --------------- DRAWINGS ------------------------------

    /**
     * draw a pixel
     * @param {Uint8ClampedArray} buffer
     * @param {Object} rgb
     * @param {number} x
     * @param {number} y
     * @param {number} width
     */
    var drawPixel = function(buffer, rgb, x, y, width){

        var pos = (y * width + x) * 4;          // position in buffer based on x and y
        buffer[pos] = Math.round(rgb.r);        // some R value [0, 255]
        buffer[pos + 1] = Math.round(rgb.g);    // some G value
        buffer[pos + 2] = Math.round(rgb.b);    // some B value
        buffer[pos + 3] = 255;                  // set alpha channel
    };

    /**
     * draw red with gradient from 255 to 0
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} r
     * @param {number} b
     */
    jQuery.fn.jColorPicker.helpers.drawRed = function(buffer, width, height, g, b){

        var r = 0;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                //draw one pixel
                drawPixel(buffer, {
                    r: 255 - r,
                    g: g,
                    b: b
                }, x, y, width);
            }

            r++;
        }
    };

    /**
     * draw green with gradient from 255 to 0
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} r
     * @param {number} b
     */
    jQuery.fn.jColorPicker.helpers.drawGreen = function(buffer, width, height, r, b){

        var g = 0;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                //draw one pixel
                drawPixel(buffer, {
                    r: r,
                    g: 255 - g,
                    b: b
                }, x, y, width);
            }

            g++;
        }
    };

    /**
     * draw blue with gradient from 255 to 0
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} r
     * @param {number} b
     */
    jQuery.fn.jColorPicker.helpers.drawBlue = function(buffer, width, height, r, g){

        var b = 0;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                //draw one pixel
                drawPixel(buffer, {
                    r: r,
                    g: g,
                    b: 255 - b
                }, x, y, width);
            }

            b++;
        }
    };

    /**
     * draw hew with gradient from 1 to 0 with step 1/256
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     */
    jQuery.fn.jColorPicker.helpers.drawHew = function(buffer, width, height){

        var h = 1;
        var v = 1;
        var s = 1;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                if(y === height - 1){
                    h = 0;
                }

                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, s, v);

                //draw one pixel
                drawPixel(buffer, rgb, x, y, width);
            }

            h-=1/256;
        }
    };

    /**
     * draw saturation with gradient from 1 to 0 with step 1/256
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} h
     * @param {number} v
     */
    jQuery.fn.jColorPicker.helpers.drawSaturation = function(buffer, width, height, h, v){

        var s = 1;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                if(y === height - 1){
                    s = 0;
                }

                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, s, v);

                //draw one pixel
                drawPixel(buffer, rgb, x, y, width);
            }

            s-=1/256;
        }
    };

    /**
     * draw value with gradient from 1 to 0 with step 1/256
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} h
     * @param {number} s
     */
    jQuery.fn.jColorPicker.helpers.drawValue = function(buffer, width, height, h, s){

        var v = 1;

        for(var y = 0; y < height; y++) {

            //one line
            for(var x = 0; x < width; x++) {

                if(y === height - 1){
                    v = 0;
                }

                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, s, v);

                //draw one pixel
                drawPixel(buffer, rgb, x, y, width);
            }

            v-=1/256;
        }
    };


    /**
     * draw red-green gradient with a static blue
     * red: 0 -> 255
     * green: 255 -> 0
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} blue 0 - 255
     */
    jQuery.fn.jColorPicker.helpers.drawRedGreen = function(buffer, width, height, blue){

        var g = 255;

        for(var y = 0; y < height; y++) {

            var r = 0;

            //one line
            for(var x = 0; x < width; x++) {

                /*
                 if(x === width - 1){
                 h = 1;
                 }

                 if(y === height - 1){
                 s = 0;
                 }*/

                //draw one pixel
                drawPixel(buffer, {
                    r: r,
                    g: g,
                    b: blue
                }, x, y, width);

                r+=1;
            }

            g-=1;
        }
    };

    /**
     * draw red-blue gradient with a static green
     * red: 255 -> 0
     * blue: 0 -> 255
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} green 0 - 255
     */
    jQuery.fn.jColorPicker.helpers.drawRedBlue = function(buffer, width, height, green){

        var r = 255;

        for(var y = 0; y < height; y++) {

            var b = 0;

            //one line
            for(var x = 0; x < width; x++) {

                /*
                 if(x === width - 1){
                 h = 1;
                 }

                 if(y === height - 1){
                 s = 0;
                 }*/

                //draw one pixel
                drawPixel(buffer, {
                    r: r,
                    g: green,
                    b: b
                }, x, y, width);

                b+=1;
            }

            r-=1;
        }
    };

    /**
     * draw green-blue gradient with a static red
     * green: 255 -> 0
     * blue: 0 -> 255
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} red 0 - 255
     */
    jQuery.fn.jColorPicker.helpers.drawGreenBlue = function(buffer, width, height, red){

        var g = 255;

        for(var y = 0; y < height; y++) {

            var b = 0;

            //one line
            for(var x = 0; x < width; x++) {

                /*
                 if(x === width - 1){
                 h = 1;
                 }

                 if(y === height - 1){
                 s = 0;
                 }*/

                //draw one pixel
                drawPixel(buffer, {
                    r: red,
                    g: g,
                    b: b
                }, x, y, width);

                b+=1;
            }

            g-=1;
        }
    };


    /**
     * draw value-saturation gradient with a static hew
     * value: 1 -> 0
     * saturation: 0 -> 1
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} hew 0 - 1
     */
    jQuery.fn.jColorPicker.helpers.drawValueSaturation = function(buffer, width, height, hew){

        var v = 1;

        for(var y = 0; y < height; y++) {

            var s = 0;

            //one line
            for(var x = 0; x < width; x++) {

                if(x === width - 1){
                    s = 1;
                }

                if(y === height - 1){
                    v = 0;
                }

                //draw one pixel
                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(hew, s, v);
                drawPixel(buffer, rgb, x, y, width);

                s+=1/256;
            }

            v-=1/256;
        }
    };

    /**
     * draw value-hew gradient with a static saturation
     * value 1 -> 0
     * hew: 0 -> 1
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} saturation 0 - 1
     */
    jQuery.fn.jColorPicker.helpers.drawValueHew = function(buffer, width, height, saturation){

        var v = 1;

        for(var y = 0; y < height; y++) {

            var h = 0;

            //one line
            for(var x = 0; x < width; x++) {

                if(x === width - 1){
                    h = 1;
                }

                if(y === height - 1){
                    v = 0;
                }

                //draw one pixel
                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, saturation, v);
                drawPixel(buffer, rgb, x, y, width);

                h+=1/256;
            }

            v-=1/256;
        }
    };

    /**
     * draw saturation-hew gradient with a static value
     * saturation 1 -> 0
     * hew: 0 -> 1
     * @param {Uint8ClampedArray} buffer
     * @param {number} width
     * @param {number} height
     * @param {number} saturation 0 - 1
     */
    jQuery.fn.jColorPicker.helpers.drawSaturationHew = function(buffer, width, height, value){

        var s = 1;

        for(var y = 0; y < height; y++) {

            var h = 0;

            //one line
            for(var x = 0; x < width; x++) {

                if(x === width - 1){
                    h = 1;
                }

                if(y === height - 1){
                    s = 0;
                }

                //draw one pixel
                var rgb = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, s, value);
                drawPixel(buffer, rgb, x, y, width);

                h+=1/256;
            }

            s-=1/256;
        }
    };

})(jQuery);