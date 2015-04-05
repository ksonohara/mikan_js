/*
 * mikan.js JavaScript Web Library
 *  JavaScript Module
 *
 * Copyright (C) 2008-15 K.Sonohara
 * Code released under [Mozilla Public License, version 2.0](https://github.com/ksonohara/mikan_js/blob/master/LICENSE)
 *
 * https://github.com/ksonohara/mikan_js/
 * http://www.expertsoftware-i.com/
 *
 */

/* ---------------------------------------------------------------------------------------------
 *  Import Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Constant Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Variable Section
 * --------------------------------------------------------------------------------------------- */
mikan.page = {};
mikan.page.onload = null;
mikan.page.onloads = {};
mikan.page.url = {};
mikan.page.url.wsgi = MIKAN_CGI_ROOT;
mikan.page.url.js = MIKAN_JS_ROOT;
mikan.page.url.image = MIKAN_IMAGE_ROOT;
mikan.page.url.htdocs = MIKAN_HTDOCS_ROOT;
mikan.page.book = {};
mikan.page.book.current = null;


/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.page.load = function() {
	try {
		mikan.form.tooltip();
	} catch(e) {
	}
	if (mikan.page.onload) {
		mikan.page.onload();
	}
	for(var l in mikan.page.onloads) {
		try {
			mikan.page.onloads[l]();
		} catch(e) {
			console.log(e);
		}
	}
};

mikan.page.unload = function() {
};

mikan.page.back = function() {
	history.back();
};

mikan.page.showbook = function(id) {
	if (mikan.page.book.current != null) {
		try {
			$(mikan.page.book.current).addClass('hidden').hide();
		} catch(e) {
		}
	} else {
		try {
			$("#summary_jumbotron").addClass('hidden').hide();
		} catch(e) {
		}
	}
	if (id == null) {
		$("#summary_jumbotron").removeClass('hidden').show();
	} else {
		$(id).removeClass('hidden').show();
	}

	mikan.page.book.current = id;
	try {
		mikan.page.setfooterid();
	} catch(e) {
	}
};
mikan.page.setfooter = function() {
	mikan.page.setfooterid("page_footer");
};
mikan.page.setfooterid = function(id) {
	if (id == undefined) var id = "page_footer";

	var fi = $("#" + id);
	if (fi.length) {
		try {
			fi.css("top", "0px");
			var dh = document.getElementsByTagName("body")[0].clientHeight;
			var ft = document.getElementById(id).offsetTop;
			var fh = document.getElementById(id).offsetHeight;

			var wh = document.documentElement.clientHeight;

			mikan.log_debug(dh + ":" + ft + ":" + fh + ":" + wh);

			fi.css("position", "relative");
			if (dh<wh) {
				mikan.log_debug("<");
				fi.css("top", (wh-dh)+"px");
			} else {
				mikan.log_debug("-");
				fi.css("top", (dh-ft)+"px");
			}
		} catch(e) {
			mikan.log_debug(e);
		}
	}
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
mikan.page.onloads._footer = function(){
	try {
		var footerId = "page_footer";
		if ($("#" + footerId).length) {
/*			function checkFontSize(func){
				var e = document.createElement("div");
				var s = document.createTextNode("S");
				e.appendChild(s);
				e.style.visibility="hidden";
				e.style.position="absolute";
				e.style.top="0";
				document.body.appendChild(e);
				var defHeight = e.offsetHeight;
				
				function checkBoxSize(){
					if(defHeight != e.offsetHeight){
						func();
						defHeight= e.offsetHeight;
					}
				}
				setInterval(checkBoxSize,1000);
			}
*/
			function addEvent(elm,listener,fn){
				try{
					elm.addEventListener(listener, fn, false);
				}catch(e){
					elm.attachEvent("on"+listener, fn);
				}
			}

			addEvent(window,"load", mikan.page.setfooter);
//			addEvent(window,"load", function() {
//				checkFontSize(mikan.page.setfooter);
//			});
			addEvent(window,"resize" , mikan.page.setfooter);
		}
	}catch(e) {
		mikan.log_debug(e);
	}
	
	mikan.page.setfooter();
};
