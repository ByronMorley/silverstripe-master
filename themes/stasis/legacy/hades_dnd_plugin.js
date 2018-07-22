/*---------------- HADES DRAG AND DROP PLUGIN -----------------*/
;(function($, doc, win) {
    "use strict";

    /*---------------------- GLOBAL VARIABLES ------------------------*/

    var name = 'hades_dnd';
    var $self;
    var $el;
    var defaults;

    var over_another_element = false;
    var $hover_element;
    var draggable_item_is_active = true;
    var $active_drag_item;
    var clicked_item_selected = false;
    var $clicked_item = null;
    var hovering_over_an_item = false;

    /*---------------------- INITIALISATION ------------------------*/

    function App(el, opts) {
        console.log("Hades Drag and Drop Activated");

        this.$el = $(el);
        this.$el.data(name, this);

        this.defaults = {

            dnd_tag_type: 'li',

            area_class_name: 'area',
            highlight_class_name: 'highlight',

            click_and_drop_active:true,
            drag_and_drop_active:true

        };

        var meta = this.$el.data(name + '-opts');
        this.opts = $.extend(this.defaults,opts, meta);

        this.init();
    }

    App.prototype.init = function() {

        /*---------------------- VARIABLES ------------------------*/

        $self = this;
        $el = $self.$el;
        defaults = $self.defaults;

        bind_events();
    };
    /*---------------------- PRIVATE FUNCTIONS ------------------------*/

    /**
     * Create an object that contains all variables need to manipulate a drag and drop event
     * The function is polymorphic and will construct the object based on the input outlined in the param opts below
     *
     * @param opts  {origin_element: jquery_element,  destination_area: jquery_element, destination_element}
     * @returns {{}}
     */
    function create_dnd_object(opts) {
        var dnd_object =  {};

        if (opts.origin_element) {
            var $origin_area = opts.origin_element.parent();

            dnd_object.origin_element = opts.origin_element;
            dnd_object.origin_element_id = opts.origin_element.attr('id');
            dnd_object.origin_element_inner_html = opts.origin_element.html();

            dnd_object.origin_area = $origin_area;
            dnd_object.origin_area_id = $origin_area.attr('id');
            dnd_object.origin_index = opts.origin_element.index();
        }
        
        if (opts.destination_area) {
            dnd_object.destination_area = opts.destination_area;
            dnd_object.destination_area_id = opts.destination_area.attr('id');
        }
        
        if (opts.destination_element) {
            dnd_object.destination_element = opts.destination_element;
            dnd_object.destination_element_id = opts.destination_element.attr('id');
            dnd_object.destination_index = opts.destination_element.index();

            dnd_object.destination_area = opts.destination_element.parent();
            dnd_object.destination_area_id = opts.destination_element.parent().attr('id');
        }

        return dnd_object;
    }

    /*---------------------- BINDING FUNCTIONS ------------------------*/
    function bind_events() {
        var $areas = $el.find('.'+defaults.area_class_name);
        var $dnd_items = $areas.find(defaults.dnd_tag_type);

        if (defaults.click_and_drop_active) {
            $dnd_items.add_click_to_drop_function();
        }
        
        if (defaults.drag_and_drop_active) {
            $dnd_items
                .add_drag_function_to_element()
                .add_drop_function_to_element();
            $areas.add_drop_function_to_area();
        }
        click_elsewhere();
    }
    
    function click_elsewhere() {
        $('body').on('click', function() {
            if (clicked_item_selected) {
               if (!hovering_over_an_item) {
                   $clicked_item.removeClass('selected');
                   $clicked_item = null;
                   clicked_item_selected = false;
               }
            }
        });
    }

    function swap_elements(dnd_event, tag) {
        dnd_event.origin_area.find(tag).eq(dnd_event.origin_index).before(dnd_event.destination_element);

        if (dnd_event.destination_index<dnd_event.origin_index) {
            dnd_event.destination_area.find(tag).eq(dnd_event.destination_index).before(dnd_event.origin_element);
        }
        else {
            dnd_event.destination_area.find(tag).eq(dnd_event.destination_index).after(dnd_event.origin_element);
        }
    }
    /*---------------------- CUSTOM BINDING EVENTS ------------------------*/

    $.fn.add_click_to_drop_function = function() {
        return this.each(function () {
            $(this).on('click', function() {
                console.log('click');

                if (clicked_item_selected) {
                    console.log('swap items');

                    var tag = defaults.dnd_tag_type;
                    var dnd_event = create_dnd_object({origin_element:$clicked_item, destination_element:$(this)});

                    swap_elements(dnd_event, tag);

                    $clicked_item.removeClass('selected');
                    $clicked_item = null;
                    clicked_item_selected = false;

                }
                else {
                    console.log('item selected');
                    $clicked_item = $(this);
                    clicked_item_selected = true;
                    $clicked_item.addClass('selected');
                }
            });

            $(this).on('mouseover', function() {
                //console.log("mouseover");
                hovering_over_an_item = true;
            });
            $(this).on('mouseleave', function() {
                //console.log("mouseLeave");
                hovering_over_an_item = false;
            });
        });
    };

    $.fn.add_drag_function_to_element = function() {
        return this.each(function () {
            $(this).draggable({
                helper:'clone',
                start: function(event, ui) {
                    if ($clicked_item!=null) {
                        $clicked_item.removeClass('selected');
                        $clicked_item = null;
                        clicked_item_selected = false;
                    }

                    draggable_item_is_active = true;
                    $active_drag_item = $(this);

                    console.log("Started dragging "+ $(this).attr('id'));
                    $(this).css('visibility', 'hidden');
                },
                stop:function(event, ui) {
                    draggable_item_is_active = false;
                    console.log("Stopped dragging "+ $(this).attr('id'));
                    $(this).css('visibility', 'visible');
                }
            });
        });
    };

    $.fn.add_drop_function_to_element = function() {
        return this.each(function() {
            $(this).droppable({
                over: function(event, ui) {
                    over_another_element = true;
                    $hover_element = $(this);
                    $hover_element.addClass(defaults.highlight_class_name);
                },
                out: function (event, ui) {
                    over_another_element = false;
                    $hover_element = $(this);
                    $hover_element.removeClass(defaults.highlight_class_name);
                },
                deactivate: function(event, ui) {
                    //console.log("deactivate droppable "+ $(this).attr('id'));
                }
            });
        });
    };

    $.fn.add_drop_function_to_area = function() {
        return this.each(function () {
            $(this).droppable({
                drop: function(event, ui) {
                    var dnd_event = create_dnd_object({origin_element:$(ui.draggable),  destination_area:$(this)});
                    var tag = defaults.dnd_tag_type;
                    var new_element = '<'+tag+' id="' + dnd_event.origin_element_id + '" answer-id="'+dnd_event.origin_element.attr('answer-id')+'">' + dnd_event.origin_element_inner_html + '</>';
                    dnd_event.origin_element.remove();

                    if (over_another_element) { //swap places with item
                        $hover_element.removeClass(defaults.highlight_class_name);
                        var hover_element_index = $hover_element.index();
                        $(this).find(tag).eq(hover_element_index).before(new_element);
                        $('#'+dnd_event.origin_area_id+' '+tag).eq(dnd_event.origin_index).before($hover_element);
                    }
                    else {
                        $('#' + dnd_event.destination_area_id).append(new_element);
                    }
                    
                    // re-bind events to the new element
                    $('#' + dnd_event.origin_element_id)
                        .add_drag_function_to_element()
                        .add_drop_function_to_element()
                        .add_click_to_drop_function();
                }
            });
        });
    };

    //-----------------------------------------
    //				INVOCATION
    //-----------------------------------------

    $.fn.hades_dnd = function(opts) {
        return this.each(function() {
            new App(this, opts);
        });
    };

})(jQuery, document, window);