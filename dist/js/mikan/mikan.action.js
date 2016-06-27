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
mikan.action = {};
/** @namespace */
mikan.action.consts = {};
/** @namespace */
mikan.action.vars = {};
/** @namespace */
mikan.action.event = {};

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

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */
mikan.action.ACV = function() {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([this]);
	}

	this.on_prepare = null;
	this.on_execute = null;
	this.on_success = null;
	this.on_error = null;
	this.on_end = null;
};

mikan.action.ACV.prototype.run = function(data) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([data]);
	}

	var _data = data;
	if (!data) {
		_data = {};
	}

	try {
		if (this.on_prepare) {
			this.on_prepare(_data);
		}

		setTimeout(function(_a, _d) {
			_a.execute(_d);
		}, 1, this, _data);
	} catch (e) {
		if (MIKAN_DEBUG_ON) {
			console.log(e);
		}
		this.error(data, e);
	}
};

mikan.action.ACV.prototype.ajax = function(data, url, params, option) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([data, url, params, option]);
	}

	var _option = option;
	if (!option) {
		_option = {
			type: 'POST',
			async: true,
			cache: false
		};
	}

	var action = this;
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([action]);
	}

	var ajax = mikan.json.post(url, params, _option);
	ajax.always(function(result, textStatus) {
		// ログ
		if (MIKAN_DEBUG_ON) {
			console.log([result, textStatus]);
		}

		if (textStatus === 'success') {
			action.success(data, result);
		} else {
			action.error(data, textStatus);
		}
	});
};

mikan.action.ACV.prototype.execute = function(data) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([data]);
	}

	if (this.on_execute) {
		try {
			var result = this.on_execute(data);
			if (result) {
				this.success(data, result);
			}
		} catch (e) {
			this.error(data, e);
		}
	} else {
		this.error(data, null);
	}
};

mikan.action.ACV.prototype.error = function(data, error) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([data, error]);
	}

	try {
		if (this.on_error) {
			this.on_error(data, error);
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) {
			console.log([data, error, e]);
		}
	}

	try {
		if (this.on_end) {
			this.on_end(data);
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) {
			console.log([data, error, e]);
		}
	}
};

mikan.action.ACV.prototype.success = function(data, result) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([data, result]);
	}

	try {
		if (this.on_success) {
			this.on_success(data, result);
		}

		try {
			if (this.on_end) {
				this.on_end(data);
			}
		} catch (e) {
			if (MIKAN_DEBUG_ON) {
				console.log([data, result, e]);
			}
		}
	} catch (e) {
		this.error(data, e);
	}
};

mikan.action.AjaxACV = function() {
	this.on_prepare = null;
	this.on_execute = function(data) {
		if (MIKAN_DEBUG_ON) {
			console.log(data);
		}
		if (data.url) {
			this.ajax(data, data.url, data.params, data.option);
		} else {
			this.on_end(data);
		}
	};
	this.on_success = null;
	this.on_error = null;
	this.on_end = null;
};

mikan.action.AjaxACV.prototype = Object.create(mikan.action.ACV.prototype);

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
