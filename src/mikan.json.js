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
mikan.json = {};

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.json.response = function(ajax, html) {
	var JSON = ajax.responseText;
	mikan.log_debug(JSON);
	if (JSON) {
		if (html) {
			JSON = mikan.util.escape(JSON, true);
		}
		return $.parseJSON(JSON);
	} else {
		return JSON;
	}
};
mikan.json.ajax = function(url, method, params, async, success, error, html, useformdata) {
	if (async == undefined) var async = false;
	if (html == undefined) var html = true;
	if (useformdata == undefined) var useformdata = false;

	try {
		var a = {
			type: method,
			scriptCharset: 'utf-8',
			url: url,
			dataType: "json",
			async: async
		};
	mikan.log_debug(a);
		if (useformdata) {
			a.contentType= false;
			a.processData= false;
		}
		if (params) {
			a.data = params;
		}
		if (success) {
			a.success = success;
		}
		if (error) {
			a.error = error;
		}

		var ajax = $.ajax(a);
		if (!async) {
			return mikan.json.response(ajax, html);
		}
		return ajax;
	}catch(e){
		if (error) {
			error(e);
		}
	}
	return null;
};

mikan.json.load = function(url, params, async, success, error,  html, useformdata) {
	return mikan.json.ajax(url, "GET", params, async, success, error,  html, useformdata);
};

mikan.json.post = function(url, params, async, success, error,  html, useformdata) {
	return mikan.json.ajax(url, "POST", params, async, success, error,  html, useformdata);
};

mikan.json.list = function(id, url, rss) {
	try {
		var jsons = mikan.json.load(url, null, false, null, null);
		var h = '';
		if (jsons) {
			h = mikan.html.bootstrap.rss(jsons.items, false);
		}
		$(id).html(h);
		return jsons;
	} catch(e) {
		mikan.log_debug(e);
		$(id).html(e);
	}
	return null;
};

mikan.json.table = function(id, url, params, header, icon, footer, paneltype, vertical, rowid, rowclick) {
	try {
		var jsons = mikan.json.load(url, null, false, null, null, false, null);
		var h = mikan.html.bootstrap.table(jsons.keys, jsons.columns, jsons.items, header, icon, footer, paneltype, vertical, rowid, rowclick);
		$("#" + id).html(h);
		return jsons;
	} catch(e) {
		mikan.log_debug(e);
		$("#" + id).html('');
	}
	return null;
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
