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
mikan.media = {};
mikan.media.vars = {};
mikan.media.vars.url = null;
mikan.media.camera = {};

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.media.camera.init = function() {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia;
	mikan.media.vars.media = navigator.getUserMedia;

	window.URL = window.URL || window.webkitURL;
	mikan.media.vars.url = window.URL;
};

mikan.media.camera.connection = function(video, audio, success, error) {
	try {
		navigator.getUserMedia({video: video, audio: audio}, success, error);
	} catch(e) {
		error(e);
	}
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
