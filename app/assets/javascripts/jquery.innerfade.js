/* =========================================================
 
// jquery.innerfade.js
// Version 1.2
// Datum: 2009-09-14
 
// Original Credits
// Firma: Medienfreunde Hofmann & Baldes GbR
// Author: Torsten Baldes
// Mail: t.baldes@medienfreunde.com
// Web: http://medienfreunde.com
// based on the work of Matt Oakes http://portfolio.gizone.co.uk/applications/slideshow/
// and Ralf S. Engelschall http://trainofthoughts.org/
 
// Callback and slidestart functionality developed by 
//	Matt Kornatz
//	mk@cqlabs.net
 
 *
 *  <ul id="news"> 
 *      <li>content 1</li>
 *      <li>content 2</li>
 *      <li>content 3</li>
 *  </ul>
 *  
 *  $('#news').innerfade({ 
 *	  animationtype: Type of animation 'fade' or 'slide' (Default: 'fade'), 
 *	  speed: Fading-/Sliding-Speed in milliseconds or keywords (slow, normal or fast) (Default: 'normal'), 
 *	  timeout: Time between the fades in milliseconds (Default: '2000'), 
 *	  type: Type of slideshow: 'sequence', 'random', 'random_start', or 'numbered_start' (Default: 'sequence'),
 *	  slidestart: Slide to start with using numbered_start (Default: '0')
 * 	  containerheight: Height of the containing element in any css-height-value (Default: 'auto'),
 *	  runningclass: CSS-Class which the container gets applied (Default: 'innerfade'),
 *	  children: optional children selector (Default: null)
 *  }, callbackfunction() ); 
 *
 
// ========================================================= */
 
 
(function($) {
 
    $.fn.innerfade = function(options, callback_ptr) {
	return this.each(function() {   
            $.innerfade(this, options, callback_ptr);
        });
    };
 
    $.innerfade = function(container, options, callback_ptr) {
        var settings = {
            'animationtype':    'fade',
            'speed':            'normal',
            'type':             'sequence',
	    'slidestart':       0,
            'timeout':          2000,
            'containerheight':  'auto',
            'runningclass':     'innerfade',
            'children':         null
        };
        if (options)
            $.extend(settings, options);
        if (settings.children === null)
            var elements = $(container).children();
        else
            var elements = $(container).children(settings.children);
        if (elements.length > 1) {
            $(container).css('position', 'relative').css('height', settings.containerheight).addClass(settings.runningclass);
	    
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).css('z-index', String(elements.length-i)).css('position', 'absolute').hide();
            };
            
	    if (settings.type == "sequence") {
                setTimeout(function() {
                    $.innerfade.next(elements, settings, 1, 0, callback_ptr);
                }, settings.timeout);
                $(elements[0]).show();
            
	    } else if (settings.type == "random") {
            		var last = Math.floor ( Math.random () * ( elements.length ) );
                setTimeout(function() {
                    do { 
			current = Math.floor ( Math.random ( ) * ( elements.length ) );
		    } while (last == current );             
		    $.innerfade.next(elements, settings, current, last, callback_ptr);
                }, settings.timeout);
                $(elements[last]).show();
	    
	    } else if ( settings.type == 'random_start' ) {
		settings.type = 'sequence';
		var current = Math.floor ( Math.random () * ( elements.length ) );
		setTimeout(function(){
		    $.innerfade.next(elements, settings, (current + 1) %  elements.length, current, callback_ptr);
		}, settings.timeout);
		$(elements[current]).show();
	    } else if (settings.type == 'numbered_start' ){
		settings.type = 'sequence';
		var current = settings.slidestart;
		setTimeout(function(){
		    $.innerfade.next(elements, settings, (current + 1) %  elements.length, current, callback_ptr);
		}, settings.timeout);
		$(elements[current]).show();
	    } else {
		alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
	    }
	}
    };
 
    $.innerfade.next = function(elements, settings, current, last, callback_ptr) {
        if (settings.animationtype == 'slide') {
            $(elements[last]).slideUp(settings.speed);
            $(elements[current]).slideDown(settings.speed);
	    if(callback_ptr != null) callback_ptr(elements[current]);
	    
        } else if (settings.animationtype == 'fade') {
            $(elements[last]).fadeOut(settings.speed);
            $(elements[current]).fadeIn(settings.speed, function() {
		removeFilter($(this)[0]);
	    });
	    if(callback_ptr != null) callback_ptr(elements[current]);
	    
        } else
            alert('Innerfade-animationtype must either be \'slide\' or \'fade\'');
	    
        if (settings.type == "sequence") {
            if ((current + 1) < elements.length) {
                current = current + 1;
                last = current - 1;
            } else {
                current = 0;
                last = elements.length - 1;
            }
        } else if (settings.type == "random") {
            last = current;
            while (current == last)
                current = Math.floor(Math.random() * elements.length);
        } else
            alert('Innerfade-Type must either be \'sequence\', \'random\' or \'random_start\'');
	    
	setTimeout((function() {
	    $.innerfade.next(elements, settings, current, last, callback_ptr);
        }), settings.timeout);
    };
 
})(jQuery);
 
// **** remove Opacity-Filter in ie ****
function removeFilter(element) {
	if(element.style.removeAttribute){
		element.style.removeAttribute('filter');
	}
}