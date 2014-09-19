/*
	* jQuery plugin for content show more/less
	* Author: yatra.com team (http://www.yatra.com)
	* Further changes, comments, commit: https://github.com/mukeshyadav/toggletext/blob/master/jquery.my.wrap.js
	* Licensed under the MIT license
*/

;(function( $, window, document, undefined ){
	"use strict";
	var pluginName = "myToggle", 
		defaults = {
			showItem: 4,
			elemBlock: 'ul',
			elemTag: 'li',
			textHide: 'Hide More',
			textShow: 'Show More'
		};

	function MyToggle( element, options ){
		this.element = element;
		this.options = $.extend( {}, defaults, options ), 
		this._defaults = defaults,
		this._name = pluginName;

		this.init();
	};

	MyToggle.prototype.attachEvents = function() {
		var that = this,
			elem = $(this.element);
		elem.on('click', function(e){
			e.preventDefault();
			if( $(this).hasClass('ico-less') ) {
				elem.text(that.options.textShow).addClass('ico-more')
					.removeClass('ico-less').parent(that.options.elemBlock).find(that.options.elemTag + ':gt('+ that.options.showItem +')').slideUp();
			} else { 
				elem.text(that.options.textHide).addClass('ico-less')
					.removeClass('ico-more').parent(that.options.elemBlock).find(that.options.elemTag).not(':visible').slideDown();
			}
		})
	};

	MyToggle.prototype.init = function() {
		this.setToggle();
		this.attachEvents();
	}

	MyToggle.prototype.setToggle = function() {
		var that = this,
			option = that.options,
			elem = $(this.element);	
			
			elem.parent(option.elemBlock).find(option.elemTag + ':gt('+ option.showItem +')').hide();
	}

	$.fn[pluginName] = function( options ){
		return this.each( function() {
			if( !$.data(this, 'plugin_' + pluginName )) {
				$.data(this, 'plugin_' + pluginName, new MyToggle( this, options ));
			}
		});
	};

})(jQuery);
