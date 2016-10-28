/*
 * Help race Vietnamese on typeracer.com on ubuntu
 * On ubuntu, typeracer has problem with ibus - Vietnamese Unikey
 * It doesn't finish word after hit space, so I make a trigger
 *
 * Created by Hai Le (@hailerity)
 *
 * Just put this script into console only in the first time load page
 * (typracer doesn't reload page each new race)
 *
 */

(function() {
  // Load the jquery script
  var script = document.createElement("script");
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName("head")[0].appendChild(script);


  var checkReady = function(callback) {
    if (window.jQuery) {
      callback(jQuery);
    }
    else {
      window.setTimeout(function() { checkReady(callback); }, 100);
    }
  };

  var setupTrigger = function() {
    var triggerSpace = function(textBox) {
      // Setup event
      var press = jQuery.Event("keypress");
      press.altGraphKey = false;
      press.altKey = false;
      press.bubbles = true;
      press.cancelBubble = false;
      press.cancelable = true;
      press.charCode = 32;
      press.clipboardData = undefined;
      press.ctrlKey = false;
      press.defaultPrevented = false;
      press.detail = 0;
      press.eventPhase = 2;
      press.keyCode = 32;
      press.keyIdentifier = "";
      press.keyLocation = 0;
      press.layerX = 0;
      press.layerY = 0;
      press.metaKey = false;
      press.pageX = 0;
      press.pageY = 0;
      press.returnValue = true;
      press.shiftKey = false;
      press.type = "keypress";
      press.view = Window;
      press.which = 32;
      press.currentTarget = textBox[0];
      press.srcElement = textBox[0];
      press.target = textBox[0];

      textBox.trigger(press);
    }

    var shouldTrigger = true;

    $(document).on('input', ".txtInput", function(e){
      var $textBox = $(".txtInput");
      var text = $textBox.val();

      if (text.charCodeAt(text.length - 1) == 32) {
        if (shouldTrigger) {
          shouldTrigger = false;
          triggerSpace($textBox);
        }
      } else {
        shouldTrigger = true;
      }
    });
  }

  checkReady(function($) {
    setupTrigger();
  });
})();
