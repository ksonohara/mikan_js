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
if( MIKAN_JS_ON == undefined) {
	var MIKAN_JS_ON = false;
}
if( MIKAN_JS_MIN == undefined) {
	var MIKAN_JS_MIN = false;
}
if( MIKAN_DEBUG_ON == undefined) {
	var MIKAN_DEBUG_ON = true;
}
if( MIKAN_TOOL_ON == undefined) {
	var MIKAN_TOOL_ON = false;
}
if( MIKAN_HTDOCS_ROOT == undefined) {
	var MIKAN_HTDOCS_ROOT = "./";
}
// Duplicated
if( MIKAN_WSGI_ROOT == undefined) {
	var MIKAN_WSGI_ROOT = MIKAN_HTDOCS_ROOT;
}
if( MIKAN_CGI_ROOT == undefined) {
	var MIKAN_CGI_ROOT = MIKAN_WSGI_ROOT;
}
if( MIKAN_JS_ROOT == undefined) {
	var MIKAN_JS_ROOT = MIKAN_HTDOCS_ROOT + "js/";
}
if( MIKAN_IMAGE_ROOT == undefined) {
	var MIKAN_IMAGE_ROOT = MIKAN_HTDOCS_ROOT + "images/";
}
if( MIKAN_JS_MIKAN == undefined) {
	var MIKAN_JS_MIKAN = MIKAN_JS_ROOT + "mikan/";
}

if( MIKAN_LANG == undefined) {
	try {
		var MIKAN_LANG = (navigator.userLanguage||navigator.browserLanguage||navigator.language).substr(0,2);
	}catch(e){
		var MIKAN_LANG = "ja";
	}
}

/* ---------------------------------------------------------------------------------------------
 *  Variable Section
 * --------------------------------------------------------------------------------------------- */
if (MIKAN_JS_ON == false) {
	var MIKAN_JS_MIKAN_FILES = [];
	if (!MIKAN_JS_MIN) {
		MIKAN_JS_MIKAN_FILES = [
			'mikan.const.js',
			'mikan.resource.js',
			'mikan.util.js',
			'mikan.html.js',
			'mikan.css.js',
			'mikan.dialog.js',
			'mikan.page.js',
			'mikan.form.js',
			'mikan.json.js',
			'mikan.tree.js',
			'mikan.admin.js'
		];
	}
	MIKAN_JS_MIKAN_FILES.push('i18n/' + MIKAN_LANG + '/mikan.resource.js');

	if( MIKAN_TOOL_ON == true) {
		MIKAN_JS_MIKAN_FILES.push('mikan.tool.js');
	}

	if( MIKAN_JS_FILES == undefined) {
		var MIKAN_JS_FILES = [
		];
	}

	var mikan = {};
	mikan.resource = {};
}

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.log = function(message) {
	try {
		console.log(message);
	}catch(e){
		try {
			console.log(message);
		}catch(e){
		}
	}
};

mikan.log_debug = function(message) {
	if (MIKAN_DEBUG_ON) {
		try {
			console.debug(message);
		}catch(e){
			try {
				console.log(message);
			}catch(e){
			}
		}

		try {
			console.trace();
		}catch(e){
		}
	}
};

mikan.log_error = function(message) {
	try {
		console.error(message);
	}catch(e){
		try {
			console.log(message);
		}catch(e){
		}
	}
	try {
		console.trace();
	}catch(e){
	}
};

mikan.js_load = function(base, name, charset) {
	c = charset;
	if (charset != null) {
		c = "utf-8";
	}
	document.write('<script type="text/javascript" src="' + base + name + '" charset="' + c + '">;</script>');
}
mikan.jss_load = function(base, names, charset) {
	c = charset;
	if (charset != null) {
		c = "utf-8";
	}
	for ( var i in names ) {
		mikan.js_load(base, names[i], c);
	}
}

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
if (MIKAN_JS_ON == false) {
	if( MIKAN_JS_ROOT != undefined) {
		try {
			mikan.jss_load(MIKAN_JS_MIKAN, MIKAN_JS_MIKAN_FILES, 'utf-8');
			mikan.jss_load(MIKAN_JS_ROOT, MIKAN_JS_FILES, 'utf-8');

			MIKAN_JS_ON = true;
		} catch(e) {
			mikan.log_error(e);

			MIKAN_JS_ON = false;
		}
	}
}
