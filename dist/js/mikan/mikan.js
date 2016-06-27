/*
 * mikan.js JavaScript Web Library
 *  JavaScript Module
 *
 * Copyright (C) 1997-2016 K.Sonohara All Rights Reserved.
 *   Deploy by ExpertSoftware Inc.
 *   配布: 株式会社エキスパートソフトウェア
 *
 * Code released under [Mozilla Public License, version 2.0]
 *   https://github.com/ksonohara/mikan_js/blob/master/LICENSE)
 *
 * https://github.com/ksonohara/mikan_js/
 * https://www.e-software.company/
 */

if (!window.console) {
	window.console = {
		log: function(msg) {}
	};
	console = window.console;
}

if ("undefined" == typeof MIKAN_URL_ROOT) {
	var MIKAN_URL_ROOT = './';
}

if ("undefined" == typeof MIKAN_URL_HTDOCS) {
	var MIKAN_URL_HTDOCS = './';
}

if ("undefined" == typeof MIKAN_URL_IMAGES) {
	var MIKAN_URL_IMAGES = mikan_url_htdocs() + 'images/';
}

if ("undefined" == typeof MIKAN_URL_CSS) {
	var MIKAN_URL_CSS = mikan_url_htdocs() + 'css/';
}

if ("undefined" == typeof MIKAN_URL_JS) {
	var MIKAN_URL_JS = mikan_url_htdocs() + 'js/';
}

if ("undefined" == typeof MIKAN_URL_WSGI) {
	var MIKAN_URL_WSGI = MIKAN_URL_ROOT;
}

if ("undefined" == typeof MIKAN_URL_CSS_MIKAN) {
	var MIKAN_URL_CSS_MIKAN = mikan_url_css() + 'mikan/';
}

if ("undefined" == typeof MIKAN_URL_JS_MIKAN) {
	var MIKAN_URL_JS_MIKAN = mikan_url_js() + 'mikan/';
}

if ("undefined" == typeof MIKAN_JS_MIN) {
	var MIKAN_JS_MIN = false;
}

/* --------------------------------------------------------------------------
 *  Namespace Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */
if (typeof MIKAN_JS_ON === 'undefined') {
	/*global MIKAN_JS_ON */
	var MIKAN_JS_ON = false;
}
if (typeof MIKAN_DEBUG_ON === 'undefined') {
	/*global MIKAN_DEBUG_ON */
	var MIKAN_DEBUG_ON = false;
}
if (typeof MIKAN_TOOL_ON === 'undefined') {
	/*global MIKAN_TOOL_ON */
	var MIKAN_TOOL_ON = false;
}

if (typeof MIKAN_LANG === 'undefined') {
	/*global MIKAN_LANG */
	try {
		var MIKAN_LANG =
			(navigator.userLanguage || navigator.browserLanguage || navigator.language).substr(0, 2);
	} catch (e) {
		var MIKAN_LANG = "ja";
	}
}

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */
if (typeof mikan === 'undefined') {
	/** @namespace */
	var mikan = {};
}
if (typeof mikan.resource === 'undefined') {
	/** @namespace */
	mikan.resource = {};
}
if (typeof mikan.page === 'undefined') {
	/** @namespace */
	mikan.page = {};
}

if (MIKAN_JS_ON === false) {
	var MIKAN_JS_MIKAN_FILES = [];
	if (!MIKAN_JS_MIN) {
		MIKAN_JS_MIKAN_FILES = [
			'mikan.const.js',
			'mikan.resource.js',
			'mikan.util.js',
			'mikan.action.js',
			'mikan.json.js',
			'mikan.html.js',
			'mikan.dialog.js',
			'mikan.form.js',
			'mikan.canvas.js',
			'mikan.media.js',
			'mikan.page.js'
		];
	}

	MIKAN_JS_MIKAN_FILES.push('i18n/' + MIKAN_LANG + '/mikan.resource.js');

	if (typeof MIKAN_JS_FILES === 'undefined') {
		var MIKAN_JS_FILES = [];
	}
}


/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */
function mikan_url_root() {
	return MIKAN_URL_ROOT;
}

function mikan_url_js() {
	return MIKAN_URL_JS;
}

function mikan_url_js_mikan() {
	return MIKAN_URL_JS_MIKAN;
}

function mikan_url_css() {
	return MIKAN_URL_CSS;
}

function mikan_url_images() {
	return MIKAN_URL_IMAGES;
}

function mikan_url_wsgi() {
	return MIKAN_URL_WSGI;
}

function mikan_url_htdocs() {
	return MIKAN_URL_HTDOCS;
}

function mikan_url_css_mikan() {
	return MIKAN_URL_CSS_MIKAN;
}


mikan.js_load = function(base, name, charset) {
	// log
	if (MIKAN_DEBUG_ON) console.log([base, name, charset]);

	var c = charset;
	if (typeof charset === "undefined") c = "utf-8";

	return '<script type="text/javascript" src="' + base + name + '" charset="' + c + '">;</script>';
};
mikan.jss_load = function(base, names, charset) {
	// log
	if (MIKAN_DEBUG_ON) console.log([base, name, charset]);

	var c = charset;
	if (typeof charset === "undefined") c = "utf-8";

	var h = '';
	for (var i = 0; i < names.length; i++) {
		h += mikan.js_load(base, names[i], c);
	}

	document.writeln(h);
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
if (MIKAN_JS_ON == false) {
	if (MIKAN_DEBUG_ON) {
		console.log([
			"MIKAN_JS_ON: " + MIKAN_JS_ON,
			"MIKAN_JS_MIN: " + MIKAN_JS_MIN,
			"MIKAN_URL_ROOT: " + mikan_url_root(),
			"MIKAN_URL_HTDOCS: " + mikan_url_htdocs(),
			"MIKAN_URL_WSGI: " + mikan_url_wsgi(),
			"MIKAN_URL_JS: " + mikan_url_js(),
			"MIKAN_URL_CSS: " + mikan_url_css()
		]);
	}

	try {
		mikan.jss_load(mikan_url_js_mikan(), MIKAN_JS_MIKAN_FILES, 'utf-8');
		mikan.jss_load(mikan_url_js(), MIKAN_JS_FILES, 'utf-8');

		MIKAN_JS_ON = true;
	} catch (e) {
		if (console) console.error(e);

		MIKAN_JS_ON = false;
	}

	// jQuery
	(function($) {
		$.fn.mikan_dialog_picture = function(_options) {
			mikan.dialog.picture($(this), _options);
		};
	})(jQuery);
}
