(function($){
    'use strict';

    /**
     * set color
     * @param {Object} context
     * @param {Object} color - r, g, b
     */
    var setColor = function(context, color){

        var hex = jQuery.fn.jColorPicker.helpers.rgbToHex(color.r, color.g, color.b);
        var hsv = jQuery.fn.jColorPicker.helpers.RGBtoHSV(color.r, color.g, color.b);
        var activeElType = $(document.activeElement).attr('data-type');

        context.$color.css({
            'background-color': '#' + hex
        });

        //if not in focus -> set color
        if(activeElType !== 'color-tb') {
            context.$colorTB.val(hex);
        }

        if(activeElType !== 'input-h'){
            context.$h.val(Math.round(hsv.h*360));
        }

        if(activeElType !== 'input-s'){
            context.$s.val(Math.round(hsv.s*100));
        }

        if(activeElType !== 'input-v'){
            context.$v.val(Math.round(hsv.v*100));
        }

        if(activeElType !== 'input-r'){
            context.$r.val(color.r);
        }

        if(activeElType !== 'input-g'){
            context.$g.val(color.g);
        }

        if(activeElType !== 'input-b'){
            context.$b.val(color.b);
        }

        context.$rgbLabel.text('rgb(' + Math.round(color.r) + ', ' +  Math.round(color.g) + ', ' +  Math.round(color.b) + ')');

        /*
        var c = Math.round((256 - color.r) / 256 * 100);
        var m = Math.round((256 - color.g) / 256 * 100);
        var y = Math.round((256 - color.b) / 256 * 100);
        var k = Math.round((256 - color.r) / 256 * 100);
        context.$cmykLabel.text('cmyk(' + c + '%, ' + m + '%, ' + y + '%, ' + k + '%)');*/
    };

    /**
     * validate input
     * @param {Object} context
     * @param {string} type
     * @param {number} val
     * @return {number}
     */
    var validate = function(context, type, val){

        var isValid = true;

        switch(type){

            case 'h':{

                if(val < 0){
                    val = 0;
                    isValid = false;
                }

                if(val > 359){
                    val = 0;
                    isValid = false;
                }
                break;
            }

            case 's':
            case 'v':{
                if(val < 0){
                    val = 0;
                    isValid = false;
                }

                if(val > 100){
                    val = 100;
                    isValid = false;
                }
                break;
            }

            case 'r':
            case 'g':
            case 'b':{
                if(val < 0){
                    val = 0;
                    isValid = false;
                }

                if(val > 255){
                    val = 255;
                    isValid = false;
                }
                break;
            }
        }

        return {
            isValid: isValid,
            val: val
        };
    };

    /**
     * send color event from the given input field
     * @param {Object} context
     * @param {jQueryElement} $input
     */
    var sendColorEventFromInput = function(context, $input){

        var type = $input.attr('data-type').replace('input-', '');

        if(type === 'h' || type === 's' || type === 'v'){

            var h = validate(context, 'h', (Number($.trim(context.$h.val())) || 0) / 360).val;
            var s = validate(context, 's',(Number($.trim(context.$s.val())) || 0) / 100).val;
            var v = validate(context, 'v', (Number($.trim(context.$v.val())) || 0) / 100).val;
            var hsv = jQuery.fn.jColorPicker.helpers.HSVtoRGB(h, s, v);

            var selectedType = $('[data-type="types"] [type="radio"]:checked').val();
            var colorChangeSource = (type === selectedType)? 'controls-selected-type' : 'controls';

            context.$root.trigger('jcp-color-changed', [hsv.r, hsv.g, hsv.b, colorChangeSource]);
        }
        else{
            var r = validate(context, 'r', Number($.trim(context.$r.val())) || 0).val;
            var g = validate(context, 'g', Number($.trim(context.$g.val())) || 0).val;
            var b = validate(context, 'b', Number($.trim(context.$b.val())) || 0).val;

            context.$root.trigger('jcp-color-changed', [r, g, b, 'controls']);
        }
    };

    /**
     * init events
     * @param {Object} context
     */
    var initEvents = function(context){

        /**
         * on type value change
         */
        context.$root.on('keydown', '[data-type="types"] [type="text"]', function(evt){

            var type = $(this).attr('data-type').replace('input-', '');

            if (evt.which === 38 || evt.keyCode == 38) {

                var val = Number($.trim($(this).val())) || 0;
                $(this).val(validate(context, type, val + 1).val);
                evt.preventDefault();
            }

            if (evt.which === 40 || evt.keyCode == 40) {

                var val = Number($.trim($(this).val())) || 0;
                $(this).val(validate(context, type, val - 1).val);
                evt.preventDefault();
            }

            //send color event
            sendColorEventFromInput(context, $(this));
        });

        /**
         * on type textboxes blur
         */
        context.$root.on('blur', '[data-type="types"] [type="text"]', function(evt){

            var type = $(this).attr('data-type').replace('input-', '');
            var val = $.trim($(this).val());

            if(!$.isNumeric(val) || !validate(context, type, Number(val) || 0).isValid){

                //send color event
                sendColorEventFromInput(context, $(this));
            }
        });

        /**
         * on type change
         */
        context.$root.on('change', '[data-type="types"] [type="radio"]', function(){

            context.$root.trigger('jcp-type-changed', [$(this).val()]);
        });

        /**
         * on color change in input box
         */
        context.$colorTB.on('keyup blur', function(){

            var color = $.trim($(this).val());
            var isOk  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(color);

            if(isOk){
                if(color.length < 6){

                    var len = 6 - color.length;
                    for(var i=0; i<len; i++){
                        color = '0' + color;
                    }
                }
            }
            else{
                color = '000000';
            }

            var rgb = jQuery.fn.jColorPicker.helpers.hexToRgb(color);

            context.$root.trigger('jcp-color-changed', [rgb.r, rgb.g, rgb.b, 'controls']);
        });
    };

    /**
     * init types
     * @param {Object} context
     */
    var initTypes = function(context){

        var types = [
            {
                val: 'h',
                name: 'H',
                char: '&deg;',
                selected: true
            },
            {
                val: 's',
                name: 'S',
                char: '%'
            },
            {
                val: 'v',
                name: 'V',
                char: '%'
            },
            {
                val: 'r',
                name: 'R',
                char: ''
            },
            {
                val: 'g',
                name: 'G',
                char: ''
            },
            {
                val: 'b',
                name: 'B',
                char: ''
            }
        ];

        var html = '',
            selected;

        for(var i=0; i<types.length; i++){

            if(types[i].selected){
                selected = ' checked ';
            }
            else{
                selected = '';
            }

            var type = types[i];

            html += '<div class="jcp-type"><input type="radio" ' + selected + ' name="type" value="' + type.val +'" id="radio-' + type.val +'" /><label for="radio-' + type.val +'">' + type.name + ': </label><input type="text" name="input-' +  type.val + '" data-type="input-' +  type.val + '" maxlength="3" /> ' + type.char + ' </div>';
        }

        context.$controls.append('<div data-type="types">' + html + '</div>');

        for(var t=0; t<types.length; t++){

            context['$' + types[t].val] = context.$controls.find('[data-type="input-' + types[t].val + '"]');
        }
    };

    /**
     * init controls
     * @param {Object} context
     */
    var initControls = function(context){

        //init color preview
        context.$root.find('[data-type="holder"]').append('<div data-type="controls"><div data-type="color" /></div>');
        context.$controls = context.$root.find('[data-type="controls"]');
        context.$color = context.$root.find('[data-type="color"]');

        //init types
        initTypes(context);

        //init labels
        context.$controls.append('<div data-type="rgb-label"></div><div data-type="cmyk-label"></div>');
        context.$rgbLabel = context.$root.find('[data-type="rgb-label"]');
        //context.$cmykLabel = context.$root.find('[data-type="cmyk-label"]');

        //init hex color textbox
        context.$controls.append('<div class="jcp-color-preview"><label>#</label> <input type="text" data-type="color-tb" maxlength="6" /></div>');
        context.$colorTB = context.$root.find('[data-type="color-tb"]');

        context.$controls.append('<button class="jcp-btn">Select</button>');
    };

    /**
     * controls
     * @param {jQueryObject} $root
     */
    jQuery.fn.jColorPicker.controls = function($root){

        this.$root = $root;
        this.$controls = null;
        this.$color = null;
        this.$colorTB = null;

        //init controls
        initControls(this);

        //init events
        initEvents(this);
    };

    /**
     * API: set color
     * @param {Object} color - r, g, b
     */
    jQuery.fn.jColorPicker.controls.prototype.setColor = function(color){

        setColor(this, color);
    };

})(jQuery);