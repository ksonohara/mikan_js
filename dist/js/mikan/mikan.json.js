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
mikan.json = {};
/** @namespace */
mikan.json.consts = {};
/** @namespace */
mikan.json.vars = {};
/** @namespace */
mikan.json.event = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */

mikan.json.consts.ajax_defaults = {
	type: 'GET',
	scriptCharset: 'utf-8',
	dataType: 'json',
	cache: false,
	async: false
};
mikan.json.consts.options_defaults = {
	escape: true,
	useformdata: false
};

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */
mikan.json.response = function(_responseText, _escape, _jquery) {
	if (MIKAN_DEBUG_ON) {
		console.log([_responseText, _escape, _jquery]);
	}

	var _json = _responseText;

	if (_json) {
		_json = $.parseJSON(_json);
		if (_escape) {
			return mikan.util.escape_json(_json, _jquery);
		} else {
			return _json;
		}
	} else {
		return null;
	}
};
mikan.json.ajax = function(_url, _params, _request, _options) {
	if (MIKAN_DEBUG_ON) {
		console.log([_url, _params, _request, _options]);
	}

	var _a = $.extend(true, {}, mikan.json.consts.ajax_defaults, _request);
	var _o = $.extend(true, {}, mikan.json.consts.options_defaults, _options);

	try {
		_a.url = _url;

		if (_o.useformdata) {
			_a.contentType = false;
			_a.processData = false;
		}
		if (_params) {
			_a.data = _params;
		}

		if (MIKAN_DEBUG_ON) {
			console.log([_a, _o]);
		}

		var _ajax = $.ajax(_a);
		if (!_a.async) {
			return mikan.json.response(_ajax.responseText, _o.escape);
		}
		return _ajax;
	} catch (_e) {
		if (MIKAN_DEBUG_ON) {
			console.log(_e);
		}
		if (_o.error) {
			_o.error(_e);
		}
	}
	return null;
};

mikan.json.get = function(_url, _params, _request, _options) {
	if (MIKAN_DEBUG_ON) {
		console.log([_url, _params, _request, _options]);
	}

	return mikan.json.ajax(_url, _params, _request, _options);
};

mikan.json.post = function(_url, _params, _request, _options) {
	if (MIKAN_DEBUG_ON) {
		console.log([_url, _params, _request, _options]);
	}

	var _a = $.extend(true, mikan.json.consts.ajax_defaults, _request);
	_a.type = 'POST';
	return mikan.json.ajax(_url, _params, _a, _options);
};


/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
