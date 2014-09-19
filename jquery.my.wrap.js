;(function( $, window, document, undefined) {
	"use strict";

	var pluginName = "myWrap",
		config = {
			wrapperName: 		'my-wrap',
			innerWrapElem: 		'p',
			wrapLength: 		100,
			wrapElipsis: 		true,
			wrapClick: 			'my-click',
			textHideClass: 		'hide',
			textVisibleClass: 	'show',
			textElpsClass: 		'ico-elps',
			showText: 			'More',
			hideText: 			'Less',
			icoMore: 			'ico-more',
			icoLess: 			'ico-less'
		};

	function MyWrap( element, options ) {
		this.element = element;
		this.options = $.extend( {}, config, options );

		this._config = config;
		this._name = pluginName;

		this.setWrap();
	}

	MyWrap.prototype.setWrap = function() {
		var opt = this.options,
			wrapElem = $(this.element),
			innerWrapElem =wrapElem.find(opt.innerWrapElem),
			textLength = wrapElem.data('limit') || opt.wrapLength,
			isElips = opt.wrapElipsis;

		this.geTextLength(innerWrapElem) > textLength ? 
					 this.createWrap(wrapElem, innerWrapElem, textLength, isElips, this.geTextLength(innerWrapElem)) : false;
	}

	MyWrap.prototype.geTextLength = function(inElem) {
		return inElem.text().length;
	}

	MyWrap.prototype.createWrap = function(el, inEl, wLen, wElps, elLen) {
		var opt 		= this.options,
			inElm 		= inEl.text(),
			elmLen 		= elLen,
			wrapLen 	= wLen,
			strShow 	= inElm.substr(0, wrapLen),
			strHide 	= inElm.substr(wrapLen, elmLen), 
			strElps 	= ( wElps == true ? "<span class='"+ opt.textElpsClass +"'>&hellip;</span>" : ""),
			newStr 		= strShow 
					 		+ "<span class='"+ opt.textHideClass +"'>" + strHide + "</span>" 
					 		+ strElps; 

			inEl.text("").append(newStr);

			this.clickMore(el);
	}

	MyWrap.prototype.clickMore = function(elem) {
		var opt = this.options,
			_this = this,
			el = elem;

		$(elem).on('click', '.' + opt.wrapClick, function(e){
			e.preventDefault();
			var type = $(this).data('type');
			
			type === 'more' ? _this.showMore(this, el) : _this.showLess(this, el);
		});
	}

	MyWrap.prototype.showMore = function(elThis, elem){
		var opt = this.options,
			hide = opt.textHideClass,
			show = opt.textVisibleClass,
			el = elem,
			elm = $(elThis),
			elmText = elm.text();

		el.find('.' + hide).addClass( show ).removeClass(hide);
		elm.data('type', 'less');
		elm.html( this.textReplace( elm.html(), opt.showText, opt.hideText ));
		elm.find('.' + opt.icoMore).removeClass(opt.icoMore).addClass(opt.icoLess);
		el.find('.' + opt.textElpsClass).addClass(opt.textHideClass);
	}

	MyWrap.prototype.showLess = function(elThis, elem) {
		var opt = this.options,
			hide = opt.textHideClass,
			show = opt.textVisibleClass,
			el = elem,
			elm = $(elThis);
			console.log(elm)

		el.find('.' + show).addClass( hide ).addClass(show);
		elm.data('type', 'more');
		elm.html( this.textReplace( elm.html(), opt.hideText, opt.showText ));
		elm.find('.' + opt.icoLess).removeClass(opt.icoLess).addClass(opt.icoMore);
		el.find('.' + opt.textElpsClass).removeClass(opt.textHideClass);
	}

	MyWrap.prototype.textReplace = function(actStr, acTxt, repTxt){
		var str = actStr.replace(acTxt, repTxt);
		return str;
	}

	$.fn[pluginName] = function( options ) {
		return this.each( function(){
			if(!$.data(this, 'plugin_' + pluginName )) {
				$.data(this, 'plugin_' + pluginName, 
				new MyWrap( this, options ));
			}
		})
	}

})( jQuery, window, document );