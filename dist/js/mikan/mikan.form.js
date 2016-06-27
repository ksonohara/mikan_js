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

/* --------------------------------------------------------------------------
 *  Namespace Section
 * -------------------------------------------------------------------------- */
/** @namespace */
mikan.form = {};
/** @namespace */
mikan.form.consts = {};
/** @namespace */
mikan.form.vars = {};
/** @namespace */
mikan.form.event = {};
/** @namespace */
mikan.form.html = {};
/** @namespace */
mikan.form.items = {};
/** @namespace */
mikan.form.bootstrap = {};
/** @namespace */
mikan.consts.form = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */
mikan.form.consts.REG_EMAIL = '^.+[@]...+[.]..+$}';
mikan.form.consts.ICON_CHECK = 'fa-check-square';
mikan.form.consts.ICON_UNCHECKED = 'fa-square-o';

mikan.consts.form.init_plugin_defaults = {
	color: {
		id: 'input.form_color',
		options: {}
	},
	toggle: {
		id: 'input.toggle',
		options: {
			off: ' ',
			on: '有効'
		}
	},
	checkboxpicker: {
		id: 'input.checkboxpicker',
		options: {
			defaultClass: 'btn-default',
			onClass: 'btn-primary',
			onIconClass: 'fa fa-ok',
			offLabel: 'いいえ',
			onLabel: 'はい'
		}
	},
	tagsinput: {
		id: 'input.tagsinput',
		options: {
			tagClass: 'label label-primary big'
		}
	},
	datetimepicker: {
		id: 'input.form_date',
		options: {
			language: 'ja',
			format: 'yyyy/mm/dd',
			weekStart: 0,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		}
	},
	selectpicker: {
		id: '.selectpicker'
	},
	multiselect: {
		id: '.multiple',
		options: {
			enableFiltering: true,
			includeSelectAllOption: true,
			maxHeight: 400
		}
	}
};
/** @namespace */
mikan.consts.form.input = {};
/** @namespace */
mikan.consts.form.input.text = {};
mikan.consts.form.input.text.defaults = {
	event: {
		keyup: null,
		change: null,
		keypress: ' return mikan.form.event.keypress(this, event);'
	}
};

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */
mikan.form.clear_input = function(element) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([element]);
	}

	switch (element.type) {
		case 'hidden':
		case 'submit':
		case 'reset':
		case 'button':
		case 'image':
			return;
		case 'file':
			return;
		case 'text':
		case 'password':
		case 'textarea':
			element.value = '';
			return;
		case 'checkbox':
		case 'radio':
			element.checked = false;
			return;
		case 'select-one':
		case 'select-multiple':
			element.selectedIndex = 0;
			return;
		default:
	}
};

mikan.form.clear = function(form) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([form]);
	}

	// 変数初期化
	var f = form;
	if (typeof form === 'undefined') {
		f = document.item;
	}

	// 処理
	var fc = function(e) {
		// ログ
		if (MIKAN_DEBUG_ON) {
			console.log([e]);
		}

		if (mikan.dialog.result) {
			for (var i = 0; i < f.elements.length; ++i) {
				mikan.form.clear_input(f.elements[i]);
			}
		}
	};

	// 確認
	mikan.dialog.confirm(mikan.resource.CONFIRM, '入力値を全てクリアしますか？', fc);
};

mikan.form.reset = function(f) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([f]);
	}

	var f = f === undefined ? document.item : f;

	var fc = function(e) {
		// ログ
		if (MIKAN_DEBUG_ON) {
			console.log([f]);
		}

		if (mikan.dialog.result) {
			f.reset();
		}
	};

	mikan.dialog.confirm(mikan.resource.CONFIRM, '入力値を初期状態にしますか？', fc);
};

mikan.form.submit = function(f) {
	if (f === undefined) {
		try {
			$('a.btn').addClass('disabled');
		} catch (e) {}
	}

	var f = f === undefined ? document.item : f;

	f.submit();
};

mikan.form.tooltip = function() {
	try {
		$('button').tooltip();
	} catch (e) {}
	try {
		$('a.btn').tooltip();
	} catch (e) {}
	try {
		$('span.tooltip').tooltip();
	} catch (e) {}
	try {
		$('span.fa-question').tooltip();
	} catch (e) {}
};
mikan.form.event.select_radio = function(name, id, value) {
	var target = $('#' + id);
	if (!target.hasClass('active')) {
		// 選択解除
		var seleced = $('button.' + name);
		seleced.removeClass('active');
		seleced.removeClass('btn-primary');
		seleced.addClass('btn-default');
		seleced.removeAttr('checked');
		var seleced_icon = $('button.' + name + ' span.' + mikan.form.consts.ICON_CHECK);
		seleced_icon.removeClass(mikan.form.consts.ICON_CHECK);
		seleced_icon.addClass(mikan.form.consts.ICON_UNCHECKED);

		// 選択表示
		target.addClass('active');
		target.addClass('btn-primary');
		target.attr('checked', 'true');
		var target_icon = $('#' + id + ' span.fa');
		target_icon.removeClass(mikan.form.consts.ICON_UNCHECKED);
		target_icon.addClass(mikan.form.consts.ICON_CHECK);

		// データ設定
		$('#' + name).attr('value', value);
	}
};
mikan.form.event.zipcode = function(s, e) {
	var _this = $(s);
	var _v = _this.val();

	if (_v.length > 3) {
		if (_v[3] != '-') {
			_this.val(_v.substring(0, 3) + '-' + _v.substring(3));
		}
	}

	return true;
};
mikan.form.event.keypress = function(s, e) {
	if (e.keyCode == 13) {
		return false;
	}

	return true;
};
mikan.form.event.changecolor = function(e) {
	if (MIKAN_DEBUG_ON) console.log([e]);
	if (MIKAN_DEBUG_ON) console.log(e.color.toString());

	$(e.target).parent().children('span.input-group-addon').children('span.fa-square').css('color', e.color.toString());

	return true;
};

mikan.form.html.input_date = function(formname, item, confirm) {
	return mikan.form.html.input_text(formname, item, confirm, "form_date", ' <span class="fa fa-calendar"> </span> ');
};

mikan.form.html.input_color = function(formname, item, confirm) {
	return mikan.form.html.input_text(formname, item, confirm, "form_color", '<span class="fa fa-lg fa-square" style="color: ' + item.value + ';"></span>', {
		type: 'text'
	});
};

mikan.form.html.input_zipcode = function(formname, item, confirm) {
	var name = formname + "_" + item.name;
	item.maxlength = 8;

	var addon = null;
	if (!confirm) {
		addon = '<span onclick="mikan.form.html.zipcode_to(\'' + item.rpc + '\',\'' + formname + '\', \'' + item.name + '\', \'' + item.zipcode.ken_id + '\', \'' + item.zipcode.city_name + '\');">住所に変換</span>';
	}
	var h = mikan.form.html.input_text(formname, item, confirm, null, addon, {
		event: {
			keyup: ' return mikan.form.event.zipcode(this, event);'
		}
	});

	return h;
};

mikan.form.html.zipcode_to = function(rpc, formname, zipcode, ken_id, city_name) {
	mikan.form.clear_input_error(formname, zipcode);

	var v_zipcode = $("#" + formname + "_" + zipcode)[0];
	if (v_zipcode.value) {
		if ((v_zipcode.value.length > 4) && v_zipcode.value[3] != "-") {
			v_zipcode.value = v_zipcode.value.substring(0, 3) + "-" + v_zipcode.value.substring(3);
		}

		var a = mikan.json.load(mikan_url_wsgi() + rpc + "?c=" + v_zipcode.value, null, false, null, null, false, false);

		if (MIKAN_DEBUG_ON) console.log(a);
		if (a) {
			var v_ken_id = $("#" + formname + "_" + ken_id)[0];
			var v_city_name = $("#" + formname + "_" + city_name)[0];

			if (a.ken_id && a.city_name) {
				v_ken_id.value = a.ken_id;
				v_city_name.value = a.city_name;
				return;
			}
		}

		mikan.form.set_input_error(formname, zipcode, mikan.resource.form.messages.NOTFOUNTZIPCODE);
	}
};

mikan.form.html.input_text = function(formname, item, confirm, _clazz, _addon, _options) {
	var _o = $.extend(true, {}, mikan.consts.form.input.text.defaults, _options);
	if (MIKAN_DEBUG_ON) console.log(_o);

	var name = formname + "_" + item.name;

	var h = '<div class="col-xs-9 col-md-' + item.width + '">';
	if (confirm) {
		if (item.type != 'password') {
			h += '<p class="form-control-static">';
			h += item.value ? item.value : "";
			h += '</p>';
			//h += mikan.form.html.input_hidden(formname, item);
		} else {
			h += '<p> </p>';
		}
	} else {
		if (_addon) {
			h += '<div class="input-group">';
		}
		var clazz = "form-control";
		if (_clazz) {
			clazz += " " + _clazz;
		}
		h += '<input class="' + clazz + '" name="' + item.name + '" id="' + name + '"';
		if (_o.type) {
			h += ' type="' + _o.type + '"';
		} else {
			h += ' type="' + item.type + '"';
		}
		if (item.maxlength) {
			h += ' maxlength="' + item.maxlength + '"';
		}
		if (item.hint) {
			h += ' placeholder="' + item.hint + '"';
		}
		if (item.edit == false) {
			h += ' disabled="disabled"';
		}
		if (item.required) {
			h += ' required="true"';
		}
		if (_o.event.change) {
			h += ' onchange="';
			h += _o.event.change;
			h += '"';
		}
		if (_o.event.keyup) {
			h += ' onkeyup="';
			h += _o.event.keyup;
			h += '"';
		}
		if (_o.event.keypress) {
			h += ' onkeypress="';
			h += _o.event.keypress;
			h += '"';
		}
		h += ' value="';
		h += item.value ? item.value : '';
		h += '" />';
		if (_addon) {
			h += '<span class="input-group-addon">';
			h += _addon;
			h += '</span>';
			h += '</div>';
		}
	}


	h += '</div>';
	return h;
};

mikan.form.html.input_tag = function(formname, item, confirm, _clazz, _date) {
	var name = formname + "_" + item.name;

	var h = '<div class="col-xs-9 col-md-' + item.width + '">';
	if (confirm) {
		h += '<p class="form-control-static">';
		h += item.value ? item.value : "";
		h += '</p>';
		//h += mikan.form.html.input_hidden(formname, item);
	} else {
		h += '<div class="input-group">';

		var clazz = "form-control";
		if (_clazz) {
			clazz += " " + _clazz;
		}
		h += '<input data-role="tagsinput" type="text" class="tagsinput ' + clazz + '" name="' + item.name + '" id="' + name + '"';
		if (item.maxlength) {
			h += ' maxlength="' + item.maxlength + '"';
		}
		if (item.hint) {
			h += ' placeholder="' + item.hint + '"';
		}
		if (item.edit == false) {
			h += ' disabled="disabled"';
		}
		if (item.required) {
			h += ' required="true"';
		}
		h += ' value="';
		h += item.value ? item.value : "";
		h += '"';
		h += ' onkeypress=" return mikan.form.event.keypress(this, event); " />';

		h += '<span class="input-group-addon">';
		h += '<span class="fa fa-tag"> </span>';
		h += '</span>';
		h += '</div>';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_label = function(formname, item, confirm) {
	return '';
};

mikan.form.html.input_textonly = function(formname, item, confirm) {
	var h = '<div class="col-xs-9 col-md-' + item.width + '">';
	h += item.value ? item.value : "";
	h += '</div>';
	return h;
};

mikan.form.html.input_iframe = function(formname, item, confirm) {
	return '<iframe class="form_iframe" frameborder="1" src="' + item.value + '" width="75%" height="250px" max-height="300px"> </iframe>';
};

mikan.form.html.input_select = function(formname, item, confirm) {
	return mikan.form.html.input_multi(formname, item, false, confirm);
};

mikan.form.html.input_multi = function(formname, item, multi, confirm) {
	if (multi === undefined) {
		var multi = true;
	}
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-9 col-md-' + item.width + '">';


	if (MIKAN_DEBUG_ON) console.log(item);
	var v = item.value;
	if (v) {
		try {
			v = v.split(",");
		} catch (e) {
			v = [v];
		}
	} else {
		v = [];
	}
	for (var k in v) {
		v[k] = String(v[k]);
	}
	if (MIKAN_DEBUG_ON) console.log(v);

	if (confirm) {
		h += '<input type="hidden" id="' + name + '" name="' + item.name + '" value="' + item.value + '" />';

		for (var i in item.select) {
			if (jQuery.inArray(i, v) != -1) {
				h += item.select[i];
				h += ' ';
				break;
			}
		}
	} else {
		var clazz = name + " form-control input-xlarge";
		var disabled = "";
		if (item.edit == false) {
			clazz += ' disabled';
			disabled = ' disabled="disabled"';
		}
		if (multi) {
			clazz += ' multiple';
			//	} else {
			//		clazz += ' selectpicker';
		}

		h += '<select id="' + name + '" name="' + item.name + '" class="' + clazz + '"';
		if (item.onchange != undefined) {
			h += ' onchange="' + item.onchange + '"';
		}
		h += disabled;
		if (multi) {
			h += ' multiple="multiple"';
		}
		h += ">";

		if (!item.required) {
			h += '<option value="">';
			h += '</option>';
		}

		for (var i in item.select) {
			h += '<option value="' + i + '"';
			if (jQuery.inArray(i, v) != -1) {
				h += ' selected="True"';
			}
			h += '>';
			h += item.select[i];
			h += '</option>';
		}
		h += '</select>';
	}
	h += '</div>';

	return h;
};

mikan.form.html.input_radio = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-9 col-md-' + item.width + '">';
	h += '<input type="hidden" id="' + name + '" name="' + item.name + '" value="' + item.value + '" />';

	if (confirm) {
		for (var i in item.select) {
			if (item.value == i) {
				h += item.select[i];
			}
		}
	} else {
		h += '<div class="btn-group" data-toggle="buttons">';
		for (var i in item.select) {
			var clazz = name + " btn";
			var disabled = "";
			var checked = "";
			var icon = mikan.html.icon.unchecked();
			if (item.value == i) {
				clazz += " btn-primary active";
				icon = mikan.html.icon.check();
				checked = 'checked="true"';
			} else {
				clazz += " btn-default";
			}
			if (item.edit == false) {
				clazz += ' disabled';
				disabled = ' disabled="disabled"';
			}

			h += '<button name="' + item.name + '" id="' + name + i + '" class="' + clazz + '" onclick="mikan.form.event.select_radio(\'' + name + '\',\'' + name + i + '\',\'' + i + '\'); "';
			h += disabled;
			h += ' onkeypress=" return mikan.form.event.keypress(this, event); ">';
			h += icon;
			h += ' ';
			h += item.select[i];
			h += '</button> ';
		}
	}
	if (!confirm) {
		h += '</div>';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_message = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '<div class="col-xs-9 col-md-' + item.width + '">';
	h += '<p>';
	h += item.value;
	h += '</p>';
	return h;
}

mikan.form.html.input_checkbox = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var right = true;
	if (item.right != undefined) {
		right = item.right;
	}

	var h = '';
	h += '<div class="controls col-xs-9 col-md-';
	h += item.width;
	if (right) {
		h += ' ';
		h += 'text-right';
	}
	h += '">';

	var clazz = "control-label";

	if (right) {
		h += ' &nbsp;';
		h += '<label for="' + name + '" class="' + clazz + '">';
		if (item.check != undefined) {
			h += item.check;
		}
		h += '</label> ';
	}

	var checked = "";
	if (item.value == true) {
		checked = 'checked="true"';
	} else {}
	if (confirm) {
		if (item.value == true) {
			h += '<p class="form-control-static">';
			h += '<span class="fa ' + mikan.form.consts.ICON_CHECK + '"> </span>';
			h += '</p>';
		} else {
			//			h += '<span class="fa ' + mikan.form.consts.ICON_UNCHECKED + '"> </span>';
		}
	} else {
		var disabled = "";
		if (item.edit == false) {
			clazz += ' disabled';
			disabled = ' disabled="disabled"';
		}

		h += '<input class="checkboxpicker" type="checkbox" name="' + item.name + '" id="' + name + '" placeholder="" value=" ' + item.value + '" ' + checked + disabled + ' ';
		if (item.onchange != undefined) {
			h += ' onchange="' + item.onchange + '"';
		}
		if (item.edit == false) {
			disabled = ' disabled="disabled"';
		}
		h += disabled;
		h += " /> ";
	}
	if (!right) {
		h += ' &nbsp;';
		h += '<label for="' + name + '" class="' + clazz + '">';
		if (item.check != undefined) {
			h += item.check;
		}
		h += '</label> ';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_textarea = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-9 col-md-' + item.width + '">';

	if (confirm) {
		h += mikan.form.html.input_hidden(formname, item);
		h += '<p>';
		if (item.value) {
			h += item.value.replace(/\n/g, "<br />");
		} else {
			h += "";
		}
		h += '</p>';
	} else {
		var disabled = "";
		var clazz = "form-control";
		if (item.edit == false) {
			clazz += ' disabled';
			disabled = ' readonly="readonly"';
		}
		h += '<textarea';
		h += ' class="' + clazz + '"';
		h += ' cols="' + item.width * 10 + '"';
		h += ' maxlength="' + item.maxlength + '"';
		h += ' rows="8"';
		if (item.hint) {
			h += ' placeholder="' + item.hint + '"';
		}
		h += ' id="' + name + '"';
		h += ' name="' + item.name + '"';
		h += disabled;
		h += '>';
		if (item.value) {
			h += item.value;
		}
		h += '</textarea>';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_hidden = function(formname, item) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<input type="hidden" name="' + item.name + '" id="' + name + '""';
	h += ' value="';
	h += item.value ? item.value : "";
	h += '"';
	h += ' />';
	return h;
};

mikan.form.html.input_file = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	if (!confirm) {
		h += '<input type="file" name="' + item.name + '" id="' + name + '""';
		h += ' />';
	}
	return h;
};

mikan.form.html.separator = function(item) {
	var h = '';
	h += '<div class="controls col-xs-' + item.width + ' col-md-' + item.width + '">';
	h += '<hr />';
	h += '</dir>';

	return h;
};

mikan.form.value6select = function(name, selects) {
	for (var key in selects) {
		if (selects[key] == name) {
			return key;
		}
	}

	return null;
};


mikan.form.html.table_json = function(_id, _json, _form_name, _readonly) {
	mikan.form.items[_form_name] = _json;

	var h = mikan.form.html.create_table_inputs(_form_name, mikan.form.items[_form_name], _readonly, null);
	if (_id) {
		$("#" + _id).html(h);
		$("#" + _id + '_messages').html("");
	}
	$('#' + _form_name + '_submit').removeClass("disabled");

	return h;
};

mikan.form.html.html_json = function(_id, _json, _form_name, _readonly) {
	mikan.form.items[_form_name] = _json;

	var h = mikan.form.html.create_inputs(_form_name, mikan.form.items[_form_name], _readonly, null);
	if (_id) {
		$("#" + _id).html(h);
		$("#" + _id + '_messages').html("");
	}
	$('#' + _form_name + '_submit').removeClass("disabled");

	return h;
};

mikan.form.html.load_json = function(id, url, formname) {
	mikan.form.items[_form_name] = mikan.json.get(url);

	var h = mikan.form.html.create_inputs(_form_name, mikan.form.items[_form_name], null, false);
	if (id) {
		$("#" + _id).html(h);
		$("#" + _id + '_messages').html("");
	}
	$('#' + formname + '_submit').removeClass("disabled");

	return h;
};


mikan.form.html.back_json = function(id, formname, message) {
	if (message == undefined) var message = "";
	var h = mikan.form.html.create_inputs(formname, mikan.form.items[formname], false);
	if (id) {
		$("#" + id).html(h);
		$("#" + id + '_messages').html(message);
	}
	$('#' + formname + '_submit').removeClass("hidden");
	$('#' + formname + '_back').addClass("hidden");

	$('html,body').animate({
		scrollTop: 0
	}, 'fast');

	return h;
};

mikan.form.confirm_json = function(id, formname, post_url, confirm) {
	mikan.form.html.post_json(id, post_url, confirm);
};

mikan.form.validate_json = function(formname) {
	return mikan.form.validate(formname, mikan.form.items[formname]);
};

mikan.form.html.confirm_inputs = function(formname, items) {
	return mikan.form.html.create_inputs(formname, items, true);
};

mikan.form.create_inputs = function(_form_name, _json, _confirm, _required_mark) {
	return mikan.form.html.create_inputs(_form_name, _json, null._confirm, _required_mark);
};

mikan.form.html.create_table_inputs = function(formname, json, confirm, required_mark) {
	if (MIKAN_DEBUG_ON) console.log([formname, json, confirm, required_mark]);

	if (confirm == undefined) var confirm = false;
	if (!required_mark) var required_mark = mikan.resource.REQUIRED;
	var is = json.items;
	try {
		is.sort(
			function(a, b) {
				try {
					var a_sort = a.sort;
					var b_sort = b.sort;
					if (a_sort == undefined) return 0;
					if (b_sort == undefined) return 0;
					if (a_sort < b_sort) return -1;
					if (a_sort > b_sort) return 1;
					return 0;
				} catch (e) {
					return 0;
				}
			}
		);
	} catch (e) {}
	var ic = json.columns;
	try {
		ic.sort(
			function(a, b) {
				try {
					var a_sort = a.sort;
					var b_sort = b.sort;
					if (a_sort == undefined) return 0;
					if (b_sort == undefined) return 0;
					if (a_sort < b_sort) return -1;
					if (a_sort > b_sort) return 1;
					return 0;
				} catch (e) {
					return 0;
				}
			}
		);
	} catch (e) {}

	// 表示
	var h = '';
	h += '<table class="table table-bordered table-condensed table-hover display compact">';
	h += '<colgroup>';
	h += '<col';
	h += ' width="20%"';
	h += ' align="right"';
	h += ' />';
	for (var c = 0; c < ic.length; c++) {
		var _column = ic[c];
		h += '<col';
		if (_column.width) {
			h += ' width="' + _column.width + '"';
		}
		if (_column.align) {
			h += ' align="' + _column.align + '"';
		}
		h += ' />';
	}
	h += '</colgroup>';
	h += '<thead>';
	h += '<tr>';
	h += '<th> </th>';
	for (var c = 0; c < ic.length; c++) {
		var _column = ic[c];
		h += '<th>';
		h += _column.caption;
		h += '</th>';
	}
	h += '<tr>';
	h += '</thead>';
	h += '<tbody>';

	h += '</tbody>';

	for (var key in is) {
		var item = is[key];
		var name = formname + "_" + item.name;


	}

	h += '</table>';
	return h;
};

mikan.form.html.create_inputs = function(formname, items, confirm, required_mark) {
	if (MIKAN_DEBUG_ON) console.log([formname, items, confirm, required_mark]);

	if (!confirm) var confirm = false;
	if (!required_mark) var required_mark = mikan.resource.REQUIRED;
	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	} catch (e) {}
	try {
		is.sort(
			function(a, b) {
				try {
					var a_sort = a.sort;
					var b_sort = b.sort;
					if (a_sort == undefined) return 0;
					if (b_sort == undefined) return 0;
					if (a_sort < b_sort) return -1;
					if (a_sort > b_sort) return 1;
					return 0;
				} catch (e) {
					return 0;
				}
			}
		);
	} catch (e) {}

	// 表示
	var h = '';
	h += '<div class="row-fluid bootstrap-form">';

	// 表示
	var fg = false;
	for (var key in is) {
		var item = is[key];
		var name = formname + "_" + item.name;

		if (!(confirm && (item.type == 'iframe'))) {
			if (item.type != 'hidden') {
				if (item.type != 'separator') {
					if (item.formgroup != false) {
						if (fg) {
							h += '</div>';
							h += '<div class="clearfix"> ';
							h += '</div>';
						}
						h += '<div class="form-group">';
						fg = true;
					} else {}

					var label = 3;
					if (item.label != undefined) {
						label = item.label;
					}
					var clazz = name + ' control-label';
					if (item.offset != undefined) {
						clazz += ' col-xs-offset-0 col-md-offset-' + item.offset;
					}
					if (item.nolabel == true) {
						clazz += " sr-only";
					} else {
						clazz += ' col-xs-3 col-md-' + label;
					}
					h += '<label for="' + name + '" class="text-right ' + clazz + '">';
					if ((item.caption != undefined) && (item.caption != null)) {
						h += item.caption;
					} else {
						h += item.name;
					}
					if (item.required && !confirm) {
						if (item.edit != false) {
							h += ' <span class="label-danger label">' + required_mark + '</span>';
						}
					}
					h += '</label>';
				}
			}
			if ((item.type == 'text') || (item.type == 'number') || (item.type == 'password') ||
				(item.type == 'datetime') || (item.type == 'datetime-local') ||
				(item.type == 'month') || (item.type == 'time') || (item.type == 'week') || (item.type == 'email') ||
				(item.type == 'url') || (item.type == 'search') || (item.type == 'tel')) {
				h += mikan.form.html.input_text(formname, item, confirm);
			} else if ((item.type == 'color')) {
				h += mikan.form.html.input_color(formname, item, confirm);
			} else if ((item.type == 'tag')) {
				h += mikan.form.html.input_tag(formname, item, confirm);
			} else if ((item.type == 'date')) {
				h += mikan.form.html.input_date(formname, item, confirm);
			} else if (item.type == 'zipcode') {
				h += mikan.form.html.input_zipcode(formname, item, confirm);
			} else if (item.type == 'textonly') {
				h += mikan.form.html.input_textonly(formname, item, confirm);
			} else if (item.type == 'label') {
				h += mikan.form.html.input_label(formname, item, confirm);
			} else if (item.type == 'select') {
				h += mikan.form.html.input_select(formname, item, confirm);
			} else if (item.type == 'multi') {
				h += mikan.form.html.input_multi(formname, item, true, confirm);
			} else if (item.type == 'hidden') {
				h += mikan.form.html.input_hidden(formname, item, confirm);
			} else if (item.type == 'radio') {
				h += mikan.form.html.input_radio(formname, item, confirm);
			} else if (item.type == 'checkbox') {
				h += mikan.form.html.input_checkbox(formname, item, confirm);
			} else if (item.type == 'message') {
				h += mikan.form.html.input_message(formname, item, confirm);
			} else if (item.type == 'textarea') {
				h += mikan.form.html.input_textarea(formname, item, confirm);
			} else if (item.type == 'iframe') {
				h += mikan.form.html.input_iframe(formname, item, confirm);
			} else if (item.type == 'file') {
				h += mikan.form.html.input_file(formname, item, confirm);
			} else if (item.type == 'separator') {
				h += mikan.form.html.separator(item);
			} else {
				// ログ
				console.log([formname, items, confirm, required_mark]);
			}
		}
	}
	if (fg) {
		h += '</div>';
	}

	h += '</div>';
	return h;
};
mikan.form.value = function(formname, item) {
	var v = null;

	var a = $("#" + formname + "_" + item.name);
	if ((item.type == 'text') || (item.type == 'number') || (item.type == 'password') ||
		(item.type == 'datetime') || (item.type == 'datetime-local') || (item.type == 'date') ||
		(item.type == 'month') || (item.type == 'time') || (item.type == 'week') || (item.type == 'email') ||
		(item.type == 'url') || (item.type == 'search') || (item.type == 'tel') || (item.type == 'color') || (item.type == 'zipcode')) {
		v = a[0].value;
	} else if ((item.type == 'select') || (item.type == 'multi')) {
		v = a.val();
	} else if (item.type == 'number') {
		v = a[0].value;
	} else if (item.type == 'radio') {
		v = a[0].value;
	} else if (item.type == 'checkbox') {
		v = a[0].checked == true;
	} else if (item.type == 'textarea') {
		v = a[0].value;
	} else if (item.type == 'tag') {
		v = a[0].value;
	} else if (item.type == 'hidden') {
		v = a[0].value;
	} else if (item.type == 'file') {
		v = a[0].value;
	} else if (item.type == 'iframe') {
		//
		return "";
	} else if (item.type == 'message') {
		//
		return null;
	} else {
		//
	}

	v = (typeof v === 'undefined') ? "" : v;

	return v;
};

mikan.form.set_input_error = function(formname, item, message) {
	if (MIKAN_DEBUG_ON) console.log([formname, item, message]);

	var ui = mikan.form.get_input_label(formname, item);
	if (MIKAN_DEBUG_ON) console.log(ui);

	for (var i in ui) {
		if (ui[i] != null) {
			ui[i].addClass("has-error");
		}
	}
	if (message) {
		try {
			ui.input.parent().append('<span class="help-block">' + mikan.html.icon.attention() + ' ' + message + '</span>');
		} catch (e) {
			if (MIKAN_DEBUG_ON) console.log([e]);
		}
	}
};

mikan.form.get_input_label = function(formname, item) {
	if (MIKAN_DEBUG_ON) console.log([formname, item]);

	var name = item;
	if (item && item.name) {
		name = item.name;
	}

	var label = $("label." + formname + "_" + name);
	var input = $("#" + formname + "_" + name);
	var group = input.parent(""); // label.parent("div.form-group");
	var other = null;

	return {
		label: label,
		input: input,
		group: group,
		other: other
	};
};

mikan.form.clear_input_error = function(formname, item) {
	var ui = mikan.form.get_input_label(formname, item);

	for (var i in ui) {
		if (ui[i]) {
			ui[i].removeClass("has-error");
		}
	}

	try {
		ui.input.parent().children("span.help-block").remove();
	} catch (e) {}
};

mikan.form.value6form = function(formname, items) {
	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	} catch (e) {}

	for (var i in is) {
		var item = is[i];

		if (item.type !== 'iframe') {
			var value = mikan.form.value(formname, item);
			is[i].value = value;
		}
	}

	return is;
};

mikan.form.validate = function(formname, items, mesasges) {
	if (mesasges == undefined) var mesasges = mikan.resource.form.messages;

	var results = {};

	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	} catch (e) {}

	for (var i in is) {
		var item = is[i];
		mikan.form.clear_input_error(formname, item);

		var value = mikan.form.value(formname, item);
		value = (typeof value === 'undefined') ? "" : value;
		mikan.form.validate_input(formname, item, mesasges, results, value, is);
	}

	for (var i in results) {
		return results;
	}
	return null;
};
mikan.form.get_item = function(items, name) {
	for (var i in items) {
		var item = items[i];
		if (item.name == name) {
			return item;
		}
	}
	return null
};
mikan.form.validate_input = function(formname, item, mesasges, results, value, items) {
	if (mesasges == undefined) var mesasges = mikan.resource.form.messages;

	input = $("#" + formname + "_" + item.name);
	var v = jQuery.trim(value);

	if (input.attr("disabled")) {
		//
	} else {
		var von = v ? true : false;
		if (value === 0) von = true;
		if (value === false) von = false;
		if (value === undefined) von = false;

		if (von) {
			if (item.reg) {
				var r = item.reg;
				if (value.match(r)) {
					//
				} else {
					var m = mesasges.REG === undefined ? mesasges.reg : mesasges.REG;
					//
					results[item.name] = {};
					results[item.name]["type"] = "error";
					results[item.name]["category"] = "reg";
					results[item.name]["mesasges"] = m;

					//
					mikan.form.set_input_error(formname, item, m);
				}
			}
			if (item.number) {
				var r = "^\-*[0-9]*$"
				if (item.number.type == "float") {
					r += "\.[0-9]*"
				}
				var re = new RegExp(r);
				var rs = re.exec(value);
				if (value.match(r) && (value >= item.number.min) && (value <= item.number.max)) {
					//
				} else {
					var m = mesasges.NUMBER === undefined ? mesasges.number : mesasges.NUMBER;
					//
					results[item.name] = {};
					results[item.name]["type"] = "error";
					results[item.name]["category"] = "number";
					results[item.name]["mesasges"] = m;

					//
					mikan.form.set_input_error(formname, item, m);
				}
			}
			if (item.match) {
				var ii = mikan.form.get_item(items, item.match);
				var vv = mikan.form.value(formname, ii);
				if (vv != value) {
					var m = mesasges.MATCH === undefined ? mesasges.match : mesasges.MATCH;
					m = m;

					//
					results[item.name] = {};
					results[item.name]["type"] = "error";
					results[item.name]["category"] = "number";
					results[item.name]["mesasges"] = m;

					//
					mikan.form.set_input_error(formname, ii, item.caption + " " + m);
					mikan.form.set_input_error(formname, item, ii.caption + " " + m);
				}
			}
		} else {
			if (item.required) {
				var m = mesasges.REQUIRED === undefined ? mesasges.required : mesasges.REQUIRED;
				//
				results[item.name] = {};
				results[item.name]["type"] = "error";
				results[item.name]["category"] = "required";
				results[item.name]["mesasges"] = m;

				mikan.form.set_input_error(formname, item, m);
			}
		}
	}
};

mikan.form.html.post_json = function(_id, _post_url, _confirm, _back) {
	// ログ
	if (MIKAN_DEBUG_ON) console.log([_id, _post_url, _confirm, _back]);

	var form_name = _id + "_form";
	var a = new mikan.action.AjaxACV();

	$('html,body').animate({
		scrollTop: 0
	}, 'fast');

	$('#' + form_name + '_submit').addClass("disabled");
	$('#' + form_name + '_back').addClass("disabled");
	$("#" + form_name + '_messages').html(mikan.html.message.html_loading());

	if (!_back) {
		a.on_prepare = function(data) {
			var _c = (_confirm) && $('#' + form_name + '_back').hasClass("hidden");

			if (!_confirm || _c) {
				var messages = mikan.form.validate_json(form_name, null);
				if (messages == null) {
					if (_c) {
						mikan.form.items[form_name] = mikan.form.value6form(form_name, mikan.form.items[form_name]);

						var h = mikan.form.html.create_inputs(form_name, mikan.form.items[form_name], true);
						$("#" + form_name).html(h);
						$("#" + form_name + '_messages').html(mikan.html.bootstrap.message(mikan.resource.CONFIRM, "以下の内容でよろしいでしょうか？以下の内容で続ける場合実行を選択してください。", "success", "user"));
						$('#' + form_name + '_submit').removeClass("disabled");
						$('#' + form_name + '_back').removeClass("disabled");
						$('#' + form_name + '_back').removeClass("hidden");
						mikan.form.init_plugin();

						return;
					}
				} else {
					throw new Error("エラーが発生しました。入力内容を御確認ください。");
				}
			}

			$("#" + form_name + '_messages').html(mikan.html.message.html_loading());

			var fd = {};
			if (_confirm) {
				for (var key in mikan.form.items[form_name]) {
					var item = mikan.form.items[form_name][key];
					if (item.type != "file") {
						if (MIKAN_DEBUG_ON) console.log(item);
						fd[item.name] = item.value;
					} else {
						var a = $("#" + form_name + "_" + item.name);
						if (MIKAN_DEBUG_ON) console.log(a);
						fd[item.name] = a[0].files[0];
					}
				}
			} else {
				mikan.form.items[form_name] = mikan.form.value6form(form_name, mikan.form.items[form_name]);
				var is = mikan.form.items[form_name];
				try {
					if (is.items != undefined) {
						is = is.items;
					}
				} catch (e) {}

				for (var key in is) {
					var item = is[key];
					var value = mikan.form.value(form_name, item);
					if (value) {
						fd[item.name] = value;
					}
				}

				var h = mikan.form.html.create_inputs(form_name, is, true);
				$("#" + form_name).html(h);
			}

			$('#' + form_name + '_submit').addClass("hidden");
			$('#' + form_name + '_back').addClass("hidden");

			data.params = fd;
			data.url = _post_url;

		}
		a.on_success = function(data, result) {
			if ((result.status == 0) || (result.status == 200)) {
				if (result.reload) {
					location.reload();
				} else if (result.url) {
					location.href = result.url;
				} else if (result.action) {
					setTimeout(mikan.dialog.event.close_form_submit, 1000, result);
				}

				if (result.messages) {
					$("#" + form_name + '_messages').html(mikan.html.message.html_messages(result.messages, "danger"));
				} else {
					$("#" + form_name + '_messages').html('');
				}
			} else {
				this.on_error(data, result);
			}
		};
		a.on_error = function(data, error) {
			// ログ
			if (MIKAN_DEBUG_ON) console.log([data, error]);

			if (error.messages) _m = error.messages;
			else _m = error;

			var _c = (_confirm) || ($('#' + form_name + '_submit').hasClass("hidden"));
			if (MIKAN_DEBUG_ON) console.log([_c]);
			if (!_c) {
				var h = mikan.form.html.create_inputs(form_name, mikan.form.items[form_name], false);
				$("#" + form_name).html(h);

				mikan.form.init_plugin();
			}

			$("#" + form_name + '_messages').html(mikan.html.message.html_messages(_m, "danger"));

			$('#' + form_name + '_submit').removeClass("disabled");
			$('#' + form_name + '_submit').removeClass("hidden");
		};
		a.on_end = function(data) {};
		a.run();
	} else {
		var h = mikan.form.html.create_inputs(form_name, mikan.form.items[form_name], false);
		$("#" + form_name).html(h);
		$("#" + form_name + '_messages').html('');
		$('#' + form_name + '_submit').removeClass("disabled");
		$('#' + form_name + '_submit').removeClass("hidden");
		$('#' + form_name + '_back').removeClass("disabled");
		$('#' + form_name + '_back').addClass("hidden");
		mikan.form.init_plugin();
	}
};

/**
 *
 * @fixed
 */
mikan.form.html_form = function(_id, _json, _post_action, _post_url, _confirm, _mode) {
	var form_name = _id + "_form";
	mikan.form.items[form_name] = _json;

	var h = '';

	h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="' + form_name + '">';
	h += '<div class="row-fluid">';
	h += '<div class="col-xs-12 col-md-12 form_message" id="' + form_name + '_messages"> ';
	h += '</div>';
	h += '<div class="col-xs-12 col-md-12" id="' + form_name + '">';
	if (_mode == 'table') {
		h += mikan.form.html.table_json(_id, _json, form_name);
	} else {
		h += mikan.form.html.html_json(_id, _json, form_name);
	}

	h += '</div>';
	h += '<div class="row-fluid hidden-print">';
	h += '<div class="col-xs-12 col-md-12">';
	h += '<hr />';
	h += '</div>';
	h += '<div class="col-md-offset-3 col-md-3 col-xs-6">';
	h += '<button id="' + form_name + '_submit" class="btn btn-primary btn-block" type="button"';
	h += ' onclick="' + _post_action + '(\'' + _id + '\', \'' + _post_url + '\', ' + _confirm + ', false); ">';
	h += _json.buttons.submit.caption;
	h += '</button>';
	h += '</div>';
	if (_json.buttons.back) {
		h += '<div class="col-md-3 col-xs-6">';
		h += '<button id="' + form_name + '_back" class="btn btn-default btn-block hidden" type="button"';
		h += ' onclick="' + _post_action + '(\'' + _id + '\', \'' + _post_url + '\', ' + _confirm + ', true); ">';
		h += _json.buttons.back.caption;
		h += '</button>';
		h += '</div>';
	}
	h += '</div>';
	h += '</div>';
	h += '</div>';
	h += '</form>';

	return h;
}

/**
 *
 * @fixed
 */
mikan.form.html_item = function(_id, _json) {
	var form_name = _id + "_form";

	var h = '';

	h += '<form class="form-horizontal" role="form">';
	h += '<div class="row-fluid">';
	h += '<div class="col-xs-12 col-md-12 form_message" id="' + form_name + '_messages"> ';
	h += '</div>';
	h += '<div class="col-xs-12 col-md-12">';
	h += mikan.form.html.html_json(_id, _json, form_name, true);
	h += '</div>';
	h += '</div>';
	h += '</form>';

	return h;
}

/**
 * mikan用JSONフォームをHTMLで表示
 * 非同期処理です。
 *
 * @param {string} _id HTMLを挿入するID(IDのみです。)
 * @param {string} _form_json_url JSONのURL
 * @param {string} _post_action POST時のアクション名
 * @param {string} _post_url POST時のURL
 * @param {string} _confirm 確認表示付きかどうか
 * @return {null} なし
 */
mikan.form.create_form = function(_id, _form_json_url, _post_action, _post_url, _confirm, _mode) {
	// ログ
	if (MIKAN_DEBUG_ON) console.log([_id, _form_json_url, _post_action, _post_url, _confirm, _mode]);

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		mikan.form.items[_id] = null;

		data.url = _form_json_url;
	}
	a.on_success = function(data, result) {
		$("#" + _id).html(mikan.form.html_form(_id, result, _post_action, _post_url, _confirm, _mode));

		mikan.form.init_plugin();
	};
	a.on_error = function(data, error) {
		$("#" + _id).text(error);
	};
	a.run();
};

/**
 * mikan用JSONフォーム読み取り専用で表示
 * 非同期処理です。
 *
 * @param {string} _id HTMLを挿入するID(IDのみです。)
 * @param {string} _form_json_url JSONのURL
 * @return {null} なし
 */
mikan.form.create_item = function(_id, _form_json_url) {
	// ログ
	if (MIKAN_DEBUG_ON) console.log([_id, _form_json_url]);

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		mikan.form.items[_id] = null;

		data.url = _form_json_url;
	}
	a.on_success = function(data, result) {
		$("#" + _id).html(mikan.form.html_item(_id, result));

		mikan.form.init_plugin();
	};
	a.on_error = function(data, error) {
		$("#" + _id).text(error);
	};
	a.run();
};

/**
 * mikan用フォーム各種JavaScript初期化
 *
 * @param {object} _options 初期化オプション 指定しない場合mikan.consts.form.init_plugin_defaultsを利用
 * @return {null} なし
 */
mikan.form.init_plugin = function(_options) {
	// ログ
	if (MIKAN_DEBUG_ON) console.log([_options]);

	var _o = $.extend(true, {}, mikan.consts.form.init_plugin_defaults, _options);

	try {
		if (_o.toggle) $(_o.toggle.id).bootstrapToggle(_o.toggle.options);
	} catch (e) {}
	try {
		if (_o.checkboxpicker) $(_o.checkboxpicker.id).checkboxpicker(_o.checkboxpicker.options);
	} catch (e) {}
	try {
		if (_o.tagsinput) $(_o.tagsinput.id).tagsinput(_o.tagsinput.options);
	} catch (e) {}
	try {
		if (_o.datetimepicker) $(_o.datetimepicker.id).datetimepicker(_o.datetimepicker.options);
	} catch (e) {}
	try {
		if (_o.selectpicker) $(_o.selectpicker.id).selectpicker(_o.selectpicker.options);
	} catch (e) {}
	try {
		if (_o.multiselect) $(_o.multiselect.id).multiselect(_o.multiselect.options);
	} catch (e) {}
	try {
		if (_o.color) {
			f = $(_o.color.id);
			f.colorpicker(_o.color.options);

			f.colorpicker().on('changeColor.colorpicker', mikan.form.event.changecolor);
		}
	} catch (e) {}
}

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
