(function($) {
    $.fn.formhance = function(options) {

        var $this = this;

        return $this.each(function() {

            var textArea = $this;

            var settings = $.extend({
                debug: false, theme: 'blue',

                //Multiple nested
                suggestions: null,
                item: null,
                title: null,
                description: null,

                //Single use
                suggestion: {
                    title: null,
                    description: null
                }

            }, options);

            if (settings.suggestions !== null) {
                //console.log(settings.suggestions);
            }

            var dynamicElement = '';
            var buttonHTML = '';
            var title = '';
            var description = '';
            if (settings.suggestion) {

                if (settings.suggestion.title) {
                    for (var i = 0; i < settings.suggestion.title.length; i++) {

                        title = settings.suggestion.title;
                        //console.log('Title: ' + settings.suggestion.title[i]);

                        if (settings.suggestion.description != undefined) {

                            if (settings.suggestion.description[i] != undefined) {
                                description = settings.suggestion.description;
                            } else {
                                description = title;
                            }

                            //console.log('Description: ' + settings.suggestion.description[i]);

                        } else {
                            description = title;
                        }

                        dynamicElement += '<span class="fh-prepop" data-description="' + description[i] + '">' + title[i] + '</span>';
                    }
                }
                buttonHTML += dynamicElement;
            }

            var theme = 'blue'
            if (settings.theme == 'red') {
                theme = 'red';
            }

            var themeValue = 'ft-' + theme;
            var form = textArea.closest("form");
            form.addClass(themeValue);

            //If .fh-suggestions div exists, show buttons there
            var buttonArea = form.children(".fh-suggestions");
            if (buttonArea.length > 0) {
                $(buttonArea).append(buttonHTML);
                //Otherwise show buttons by default after targeted textarea element
            } else {
                var buttonOptions = $('<div class="fh-suggestions">' + buttonHTML + '</div>');
                buttonOptions.insertAfter($this);
            }

            $(".fh-prepop").click(function(evt) {
                evt.stopImmediatePropagation(); //Replace this with a better working solution for clicking individual button set instances
                var txt = $(this).attr("data-description");
                var box = textArea;
                box.val(box.val() + txt);
            });

        });

    };
}(jQuery));
