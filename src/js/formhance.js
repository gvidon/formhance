(function($) {
  $.fn.formhance = function(options) {

    var $this = this;

    return $this.each(function() {

      var textArea = $this;

      var settings = $.extend({
        debug: false,
        theme: 'blue',
        overrite: false,
        spaceAfter: false,

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

      console.log(settings.suggestions); //Multiple objects
      console.log(settings.suggestion); //One blob object

      var dynamicElement = '';
      var buttonHTML = '';
      var title = '';
      var description = '';
      if (settings.suggestions) {
        for (var i = 0; i < settings.suggestions.length; i++) {
          if (settings.suggestions[i].item.title) {
            title = settings.suggestions[i].item.title;
            if (settings.suggestions[i].item.description != undefined) {

              if (settings.suggestions[i].item.description != undefined) {
                description = settings.suggestions[i].item.description;
              } else {
                description = title;
              }
            } else {
              description = title;
            }
            if (settings.spaceAfter == true) { description = description + ' '; }
            dynamicElement += '<span class="fh-prepop" data-description="' + description + '">' + title + '</span>';
          }
        }
        buttonHTML += dynamicElement;
      }

      if (settings.suggestion) {

        if (settings.suggestion.title) {
          for (var i = 0; i < settings.suggestion.title.length; i++) {
            title = settings.suggestion.title;
            if (settings.suggestion.description != undefined) {
              if (settings.suggestion.description[i] != undefined) {
                description = settings.suggestion.description;
              } else {
                description = title;
              }
            } else {
              description = title;
            }
            if (settings.spaceAfter == true) { description[i] = description[i] + ' '; }
            dynamicElement += '<span class="fh-prepop" data-description="' + description[i] + '">' + title[i] + '</span>';
          }
        }
        buttonHTML += dynamicElement;
      }

      var theme = settings.theme;

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
        if (settings.overrite == true) {
          box.val('');
        }
        box.val(box.val() + txt);
      });

    });

  };
}(jQuery));
