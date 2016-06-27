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
 *
 */

/* --------------------------------------------------------------------------
 *  Namespace Section
 * -------------------------------------------------------------------------- */
/** @namespace */
mikan.cordova = {};
/** @namespace */
mikan.cordova.consts = {};
/** @namespace */
mikan.cordova.vars = {};
/** @namespace */
mikan.cordova.event = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */
mikan.cordova.init_cordova = function() {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([]);
	}

	try {
		mikan.cordova.init_touch_onclick();
	} catch (e) {
		if (MIKAN_DEBUG_ON) {
			console.log([e]);
		}
	}

	try {
		var deviceType = (navigator.userAgent.match(/iPad/i)) === 'iPad' ? 'iOS' : (navigator.userAgent.match(/iPhone/i)) === 'iPhone' ? 'iOS' : (navigator.userAgent.match(/Android/i)) === 'Android' ? 'Android' : (navigator.userAgent.match(/BlackBerry/i)) === 'BlackBerry' ? 'BlackBerry' : 'null';

		if (deviceType === 'iOS') {
			$('.navbar-fixed-top').css('padding-top', '20px');
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) {
			console.log([e]);
		}
	}
};

mikan.cordova.init_touch_onclick = function() {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([]);
	}

	mikan.page.touch_onclick('a', 'onclick');
};

mikan.cordova.init_ios = function() {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([]);
	}

	$('.navbar-fixed-top').css('padding-top', '24px');
};


/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */

mikan.page.onload = mikan.cordova.init_cordova;
