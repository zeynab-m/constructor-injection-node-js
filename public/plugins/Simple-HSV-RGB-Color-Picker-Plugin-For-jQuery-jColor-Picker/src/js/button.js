(function($){
    'use strict';

    /**
     * set color
     * @param {Object} context
     * @param {Object} color - r, g, b
     */
    var setColor = function(context, color){

        var arrowColor = Math.round(256 - (color.r + color.g + color.b) / 3);

        if(arrowColor >= 256/2 - 20 && arrowColor <= 256/2 + 20){
            arrowColor = 0;
        }

        context.$btn.css({
            'background-color': 'rgb(' + Math.round(color.r) +', ' + Math.round(color.g) +', ' + Math.round(color.b) +')'
        });

        context.$btnArr.css({
            'border-top-color': 'rgb(' + arrowColor +', ' + arrowColor +', ' + arrowColor +')'
        });
    };

    /**
     * init application events
     * @param {Object} context
     */
    var initEvents = function(context){

        /**
         * on btn click
         */
        context.$btn.on('click', function(evt){

            evt.stopPropagation();

            context.$holder.toggleClass('jcp-visible');

            var rect = context.$holder.get(0).getBoundingClientRect();

            if(rect.left + rect.width > window.innerWidth){
                context.$holder.addClass('jcp-right');
            }
            else{
                context.$holder.removeClass('jcp-right');
            }
        });

        /**
         * on btn click
         */
        context.$holder.on('click', function(evt){

            evt.stopPropagation();
        });

        $(document).on('click', function(){
            context.$holder.removeClass('jcp-visible');
        });
    };

    /**
     * button
     * @param {jQueryObject} $root
     */
    jQuery.fn.jColorPicker.button = function($root) {

        this.$root = $root;
        this.$holder = this.$root.find('[data-type="holder"]');

        this.$root.prepend('<div data-type="btn"><div data-type="arrow"></div></div>');
        this.$btn = this.$root.find('[data-type="btn"]');
        this.$btnArr = this.$btn.find('[data-type="arrow"]');

        this.$holder.css({
            top: this.$btn.height()
        });

        //init events
        initEvents(this);
    };

    /**
     * API: set color
     * @param {Object} color - r, g, b
     */
    jQuery.fn.jColorPicker.button.prototype.setColor = function(color){

        setColor(this, color);
    };

})(jQuery);