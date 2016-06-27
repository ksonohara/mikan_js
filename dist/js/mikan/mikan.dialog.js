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
mikan.dialog = {};
/** @namespace */
mikan.dialog.consts = {};
/** @namespace */
mikan.dialog.vars = {};
/** @namespace */
mikan.dialog.event = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */
mikan.dialog.consts.modal_defaults = {
	id: 'mikan_dialog',
	icon: null,
	size: null,
	zindex: null,
	class_modal: 'fade',
	class_title: null,
	onclose: null,
	backdrop: false,
	buttons: [{
		caption: mikan.resource.OK,
		close: true,
		onclick: 'mikan.dialog.event.modal_button',
		class_click: 'btn-primary'
	}]
};

mikan.dialog.consts.form_defaults = {
	id: 'mikan_dialog',
	icon: 'fa fa-pencil-square-o',
	size: 'modal-lg'
};

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */
mikan.dialog.event.modal_button = function(id, index) {
	$(id).attr({
		'data-result': index
	});
};

mikan.dialog.event.click_form_back = function(id, index) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([id, index]);
	}

	mikan.form.html.post_json(id, null, true, true);
};

mikan.dialog.event.click_form_submit = function(id, index, url, confirm) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([id, index, url, confirm]);
	}

	if (typeof confirm === 'undefined') {
		confirm = true;
	}
	mikan.form.html.post_json(id, url, confirm);

	mikan.dialog.event.modal_button(id, index);
};
mikan.dialog.event.close_form_submit = function() {
	$('#search_form_submit').click();
};

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */

mikan.dialog.form = function(_form_json_url, _params, _options) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([_form_json_url, _params, _options]);
	}

	var _d = $.extend(true, {}, mikan.dialog.consts.form_defaults, _options);

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		data.url = _form_json_url;
		data.params = _params;
	};
	a.on_success = function(data, result) {
		var form_id = _d.id;
		var form_name = form_id + '_form';

		var h = '';
		h += '<div class="row-fluid">';
		if (result.edit !== false) {
			h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="' + form_name + '">';
		} else {
			h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; ">';
		}
		h += '<div class="col-md-12 col-xs-12" id="' + form_name + '_messages"> ';
		h += '</div>';
		h += '<div class="clearfix"> </div>';
		h += '<div class="row-fluid" id="' + form_name + '"> ';
		h += mikan.form.html.html_json('mikan_dialog', result, form_name, result.edit === false);
		h += '</div>';
		h += '</form>';
		h += '</div>';

		var _o = {
			backdrop: true,
			icon: _d.icon,
			size: _d.size,
			onclose: _d.onclose
		};
		if (result.edit === false) {
			_o.buttons = [{
				caption: mikan.resource.CLOSE,
				close: true,
				class_click: 'btn-default'
			}];
		} else {
			_o.buttons = [{
				caption: mikan.resource.BACK,
				id: 'mikan_dialog_form_back',
				close: false,
				onclick: 'mikan.dialog.event.click_form_back',
				hidden: true,
				class_click: 'btn-default'
			}, {
				//				caption: result.buttons.submit.caption,
				caption: mikan.resource.SUBMIT,
				id: 'mikan_dialog_form_submit',
				close: false,
				url: data.url,
				onclick: 'mikan.dialog.event.click_form_submit',
				confirm: true,
				class_click: 'btn-primary'
			}, {
				caption: mikan.resource.CLOSE,
				close: true,
				class_click: 'btn-default'
			}];
		}

		if (result.icon) {
			_o.icon = result.icon;
		}

		mikan.dialog.show(result.title, h, _o);
	};
	a.on_error = function(data, error) {
		// ログ
		if (MIKAN_DEBUG_ON) {
			console.log([data, error]);
		}

		mikan.dialog.error(mikan.resource.ERROR, error);
	};
	a.run();
};

mikan.dialog.confirm = function(_title, _message, _options, _onclick) {
	var _c = _onclick;
	if (!_c) {
		_c = 'mikan.dialog.event.modal_button';
	}
	var _o = $.extend(true, {}, mikan.dialog.consts.modal_defaults, {
		icon: 'fa fa-question',
		buttons: [{
			caption: mikan.resource.YES,
			close: true,
			onclick: _c,
			class_click: 'btn-primary'
		}, {
			caption: mikan.resource.NO,
			close: true,
			onclick: _c,
			class_click: 'btn-default'
		}]
	}, _options);

	return mikan.dialog.show(_title, _message, _o);
};

mikan.dialog.about = function(_title, _messages, _options) {
	var _o = $.extend(true, {}, mikan.dialog.consts.modal_defaults, {
		icon: 'info-sign'
	}, _options);

	var _m = '';

	for (var _i in _messages) {
		var _message = _messages[_i];
		_m += '<div>';
		_m += _message;
		_m += '</div>';
	}


	return mikan.dialog.show(_title, _m, _o);
};

mikan.dialog.ok = function(_title, _message, _options) {
	var _o = $.extend(true, {}, mikan.dialog.consts.modal_defaults, {
		icon: 'glyphicon glyphicon-info-sign'
	}, _options);

	return mikan.dialog.show(_title, _message, _o);
};

mikan.dialog.error = function(_title, _message, _options) {
	var _o = $.extend(true, {}, mikan.dialog.consts.modal_defaults, {
		icon: 'glyphicon glyphicon-warning-sign',
		class_title: 'text-danger'
	}, _options);

	return mikan.dialog.show(_title, _message, _o);
};

mikan.dialog.show = function(_title, _message, _options) {
	var _d = $.extend(true, {}, mikan.dialog.consts.modal_defaults, _options);

	var h = '';
	h += '<div class="modal ';
	if (_d.class_modal) {
		h += _d.class_modal;
	}
	if (_d.backdrop) {
		h += '" data-backdrop="static';
	}
	h += '" id="' + _d.id + '">';


	h += '<div class="modal-dialog ';
	if (_d.size) {
		h += _d.size;
	}
	h += '">';
	h += '<div class="modal-content">';


	h += '<div class="modal-header">';
	h += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
	h += '<h4 class="modal-title ';
	if (_d.class_title) {
		h += _d.class_title;
	}
	h += '">';
	if (_d.icon) {
		h += '<span class="' + _d.icon + '"> </span> ';
	}
	h += _title;
	h += '</h4>';
	h += '</div>';

	h += '<div class="modal-body">' +
		_message +
		'</div>';

	if (_d.buttons && (_d.buttons.length > 0)) {
		h += '<div class="modal-footer">';
		for (var i in _d.buttons) {
			var button = _d.buttons[i];
			h += '<button type="button" class="btn ';
			if (button.class_click) {
				h += button.class_click;
			}
			if (button.hidden) {
				h += ' hidden';
			}
			if (button.onclick) {
				h += '" onclick="';
				h += button.onclick;
				h += '(\'';
				h += _d.id;
				h += '\', \'';
				h += i;
				h += '\', \'';
				if (button.url) {
					h += button.url;
				}
				h += '\'';
				if (button.confirm === false) {
					h += ', false';
				}
				h += '); ';
			}
			if (button.id) {
				h += '" id="';
				h += button.id;
			}
			if (button.close) {
				h += '" data-dismiss="modal';
			}
			h += '">';
			if (button.icon) {
				h += '<span class="' + button.icon + '"> </span> ';
			}
			h += button.caption;
			h += ' </button>';
		}
		h += '</div>';
	}


	h += '</div>';

	h += '</div>';
	h += '</div>';


	var dialog = $('#' + _d.id);
	dialog.remove();


	$('body').prepend(h);

	dialog = $('#' + _d.id);
	dialog.on('hidden.bs.modal', _d.onclose);
	if (_d.zindex) {
		dialog.css('z-index', _d.zindex);
		dialog.parent().css('z-index', _d.zindex);
	}

	if (_d.size === 'modal-full') {
		var content = $('.modal-body');
		content.css('height', window.innerHeight - 185);
		content.css('max-height', window.innerHeight - 185);
		content.css('overflow', 'auto');
		//		content.scrollTop(0);
	}

	mikan.form.init_plugin();

	dialog.modal('show');

	return dialog;
};

mikan.dialog.picture = function(_elements, _options) {
	var _d = $.extend(true, {
		icon: 'fa fa-image',
		size: 'modal-full'
	}, _options);

	_elements.each(function() {
		var _this = $(this);

		var _title = this.title;
		var _href = this.href;

		this.href = '#';

		_this.click(function() {
			mikan.dialog._picture(_title, _href, _d);
		});
	});
};

mikan.dialog._picture = function(_title, _href, _options) {
	var h = '';
	h += '<img class="modal_picture" src="' + _href + '" alt="' + _title + '" />';

	mikan.dialog.ok(_title, h, _options);
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
