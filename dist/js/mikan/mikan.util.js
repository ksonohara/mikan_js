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
mikan.util = {};
/** @namespace */
mikan.util.consts = {};
/** @namespace */
mikan.util.vars = {};
/** @namespace */
mikan.util.event = {};

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
/**
 * 未定義変数かチェック
 *
 * @param {string} _v 対象変数
 *
 * @returns {boolean} trueなら未定義
 */
mikan.util.is_undefined = function(_v) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([_v]);
	}

	// 処理
	return typeof _v === 'undefined';
};

/**
 * テキストのHTMLエスケープ
 *
 * @param {string} _v 対象変数
 * @param {string} _jquery trueならjQueryを使ってエスケープするそうで無い場合簡易
 *
 * @returns {string} 処理結果
 */
mikan.util.escape = function(_v, _jquery) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([_v, _jquery]);
	}

	// 引数初期値
	if (mikan.util.is_undefined(_jquery)) {
		_jquery = false;
	}

	// 処理
	try {
		if (_jquery) {
			return _v.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		} else {
			return $('<div />').text(_v).html();
		}
	} catch (_e) {
		return '';
	}
};

/**
 * JSONのHTMLエスケープ
 *
 * @param {object} _json 対象JSON
 * @param {string} _jquery trueならjQueryを使ってエスケープするそうで無い場合簡易
 *
 * @returns {string} 処理結果
 */
mikan.util.escape_json = function(_json, _deep, _jquery) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([_json, _deep, _jquery]);
	}

	// 引数初期値
	if (mikan.util.is_undefined(_deep)) {
		_deep = true;
	}
	if (mikan.util.is_undefined(_jquery)) {
		_jquery = false;
	}

	// 処理
	if (_json) {
		try {
			for (var key in _json) {
				var _item = _json[key];
				if (typeof _item === 'string') {
					_item = mikan.util.escape(_item, _jquery);
				} else if (typeof _item === 'function') {
					_item = null;
				} else if (mikan.util.is_undefined(_item)) {
					//
				} else if (typeof _item === 'number') {
					//
				} else if (typeof _item === 'boolean') {
					//
				} else if (typeof _item === 'object') {
					if (_deep) {
						_item = mikan.util.escape_json(_item, _deep, _jquery);
					}
				} else {
					console.log(typeof _item);
				}

				_json[key] = _item;
			}
		} catch (_e) {
			console.error(_e);
		}
	}

	return _json;
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
