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
mikan.html = {};
/** @namespace */
mikan.html.bootstrap = {};
/** @namespace */
mikan.html.fa = {};
/** @namespace */
mikan.html.icon = {};
/** @namespace */
mikan.html.icon.consts = {};

/** @namespace */
mikan.html.message = {};
/** @namespace */
mikan.html.form = {};
/** @namespace */
mikan.html.form.vars = {};
/** @namespace */
mikan.html.table = {};
/** @namespace */
mikan.html.table.vars = {};
/** @namespace */
mikan.html.table.vars.datatables = {};
/** @namespace */
mikan.html.carousel = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */
mikan.html.icon.consts.ATTENTION = 'fa-hand-o-up';
mikan.html.icon.consts.CHECK = 'fa-check-square';
mikan.html.icon.consts.UNCHECKED = 'fa-square-o';

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */

mikan.html.icon.html = function(_icon, _type) {
	if (MIKAN_DEBUG_ON) console.log([_icon, _type]);

	if (!_type) _type = 'fa';
	return '<span class="' + _type + ' ' + _icon + '"> </span>';
};

mikan.html.icon.attention = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	return mikan.html.icon.html(mikan.html.icon.consts.ATTENTION);
};

mikan.html.icon.check = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	return mikan.html.icon.html(mikan.html.icon.consts.CHECK);
};

mikan.html.icon.unchecked = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	return mikan.html.icon.html(mikan.html.icon.consts.UNCHECKED);
};

mikan.html.bootstrap.rss = function(_items, _url_local, _icon) {
	if (MIKAN_DEBUG_ON) console.log([_items, _url_local, _icon]);

	if (_icon === undefined) {
		var _icon = "fa fa-rss";
	}

	var h = '';
	for (var i = 0; i < _items.length; i++) {
		var _item = _items[i];

		h += '<div class="row">';
		h += '<div class="col-xs-12">';

		if (_url_local) {
			h += '<a href="' + mikan.page.url.wsgi + '/' + _item.url + '"' + '>';
		} else {
			h += '<a href="' + _item.url + '"' + ' target="_blank"' + '>';
		}

		h += '<div>';
		h += '<span class="';
		h += _icon;
		h += '"> </span> ';
		h += _item.type;
		h += '<span class="pull-right text-muted">' + _item.date + '</span>';
		h += '</div>';

		h += '<div class="text-indent">';
		h += '<span class="text-muted">&nbsp;&nbsp;</span>';
		h += _item.title;
		h += '</div>';
		h += '</a>';

		h += '<br />';
		h += '</div>';
		h += '</div>';
	}

	return h;
};

mikan.html.bootstrap.table = function(keys, columns, items, header, icon, footer, paneltype, vertical, rowid, rowclick) {
	if (MIKAN_DEBUG_ON) console.log([keys, columns, items, header, icon, footer, paneltype, vertical, rowid, rowclick]);

	if (header === undefined) {
		var header = null;
	}
	if (icon === undefined) {
		var icon = null;
	}
	if (footer === undefined) {
		var footer = null;
	}
	if (paneltype === undefined) {
		var paneltype = "default";
	}
	if (vertical === undefined) {
		var vertical = false;
	}
	if (rowid === undefined) {
		var rowid = null;
	}
	if (rowclick === undefined) {
		var rowclick = null;
	}

	var h = '<div class="panel panel-' + paneltype + '">';

	// Header
	if (header != null) {
		h += '<div class="panel-heading">';
		h += '<h4>';
		if (icon != null) {
			h += '<span class="fa fa-' + _icon + '"> </span>' + ' ';
		}
		h += header;
		h += '</h4>';
		h += '</div>';
	}

	// table
	h += '<table class="table table-striped table-bordered table-hover">';
	if (vertical) {
		h += '<tbody>';
		for (var i in keys) {
			h += '<tr>';
			h += '<th class="text-right">';
			h += columns[keys[i]];
			h += '</th>';
			h += '<td>';
			if (items[keys[i]])
				h += items[keys[i]];
			else h += " ";
			h += '</td>';
			h += '</tr>';
		}
		h += '</tbody>';
	} else {
		if (columns) {
			h += '<thead>';
			h += '<tr>';
			for (var i in keys) {
				var key = keys[i];
				h += '<th>';
				h += columns[key];
				h += '</th>';
			}
			h += '</tr>';
			h += '</thead>';
		}
		h += '<tbody>';
		for (var item in items) {
			var rc = '';
			var ri = '';
			if (rowid != null) {
				ri = ' id="' + rowid.replace("%d", item) + '"';
			}
			if (rowclick != null) {
				rc = ' onclick="' + rowclick.replace("%d", item) + '"';
			}

			h += '<tr' + ri + rc + ' class="item">';
			for (var i in keys) {
				var key = keys[i];
				h += '<td' + '>';
				if (items[item][key]) {
					h += items[item][key];
				} else h += " ";
				h += '</td>';
			}
			h += '</tr>';
		}
		h += '</tbody>';
	}
	h += '</table>';

	// footer
	if (footer != null) {
		h += '<div class="panel-footer">';
		h += '<p>';
		h += footer;
		h += '</p>';
	}
	h += '</div>';

	return h;
};

mikan.html.bootstrap.breadcrumbs = function(_items) {
	if (MIKAN_DEBUG_ON) console.log([_items]);

	var h = '<ol class="breadcrumb">';
	for (var i = 0; i < _items.length; i++) {
		var _item = _items[i];
		h += '<li>';
		h += '<a';
		if (_item.href) {
			h += ' href="';
			h += _item.href;
			h += '"';
		}
		if (_item.onclick) {
			h += ' onclick="';
			h += _item.onclick;
			h += '"';
		}
		h += '>';
		if (_item.icon) {
			h += '<span class="fa fa-' + _item.icon + '"> </span>';
			h += ' ';
		}
		h += _item.caption;
		h += '</a>';
		h += '</li>';
	}
	h += '</ol>';

	return h;
};

mikan.html.bootstrap.message = function(_title, _message, _type, _icon) {
	if (MIKAN_DEBUG_ON) console.log([_title, _message, _type, _icon]);

	if (_type === undefined) {
		var _type = "default";
	}
	if (_icon === undefined) {
		var _icon = null;
	}

	var h = '';
	var c = "panel panel-" + _type;
	var i = null;
	if (_icon) {
		i = '<span class="fa fa-' + _icon + '"> </span>';
	}
	h += '<div class="' + c + '">';
	h += '<div class="panel-heading">';
	h += '<h4>';
	if (i) {
		h += i + " ";
	}
	h += _title;
	h += '</h4>';
	h += '</div>';
	h += '<div class="panel-body">';
	h += '<h4>';
	h += _message;
	h += '</h4>';
	h += '</div>';
	h += '</div>';

	return h;
};

mikan.html.bootstrap.load_sidemenu = function(_url) {
	if (MIKAN_DEBUG_ON) console.log([_url]);

	var _items = null;

	try {
		_items = mikan.json.get(_url).items;
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}

	return mikan.html.bootstrap.create_sidemenu(_items);
};

mikan.html.bootstrap.create_sidemenu = function(_items) {
	if (MIKAN_DEBUG_ON) console.log([_items]);

	return mikan.html.bootstrap.create_item_sidemenu(_items);
};

mikan.html.bootstrap.create_item_sidemenu = function(_items, _level) {
	if (MIKAN_DEBUG_ON) console.log([_items, _level]);

	if (_items) {
		if (typeof _level === 'undefined') {
			var _level = 0;
		}

		var _h = "";

		for (var i = 0; i < _items.length; i++) {
			var _item = _items[i];

			_h += '<li>';
			_h += '<a';
			if (_item.url) {
				_h += ' href="' + _item.url + '"';
			} else {
				_h += ' href="#"';
			}
			if (_item.target) {
				_h += ' target="' + _item.target + '"';
			}
			_h += '>';
			if (_item.icon) {
				_h += '<i class="';
				_h += _item.icon;
				_h += '"> </i> ';
			}
			_h += _item.caption;
			if (_item.badges) {
				_h += ' <span class="badge">';
				_h += _item.badges;
				_h += '</span>';
			}
			if (_item.items) {
				_h += '<span class="fa arrow"> </span>';
			}
			_h += '</a>';

			if (_item.items) {
				if (_level == 1) {
					_h += '<ul class="nav nav-third-level">';
				} else {
					_h += '<ul class="nav nav-second-level">';
				}
				_h += mikan.html.bootstrap.create_item_sidemenu(_item.items, _level + 1);
				_h += '</ul>';
			}
			_h += '</li>';
		}

		return _h;
	}

	return "";
};

mikan.html.bootstrap.create_tile = function(_type, _icon, _title, _items, _footer) {
	if (MIKAN_DEBUG_ON) console.log([_type, _icon, _title, _items, _footer]);

	if (_items === undefined) {
		var _type = "primary";
	}

	var _h = "";
	_h += '<div class="panel panel-' + _type + '">';
	_h += '<div class="panel-heading">';
	_h += '<div class="row">';
	_h += '<div class="col-xs-3">';
	if (_icon) {
		_h += '<i class="' + _icon + '"> </i>';
	}
	_h += '</div>';
	_h += '<div class="col-xs-9 text-right">';
	if (_title) {
		_h += '<div class="huge">' + _title + '</div>';
	}
	if (_items) {
		for (var i = 0; i < _items.length; i++) {
			var _item = _items[i];
			_h += '<div>';
			if (_item.text) {
				_h += _item.text;
			}
			_h += '</div>';
		}
	}
	_h += '</div>';
	_h += '</div>';
	_h += '</div>';
	if (_footer) {
		if (_footer.url) {
			_h += '<a href="';
			_h += _footer.url;
			_h += '">';
		}
		_h += '<div class="panel-footer">';
		if (_footer.url) {
			_h += '<span class="pull-left">';
			_h += _footer.title;
			_h += '</span>';
		}
		if (_footer.url) {
			_h += '<span class="pull-right"><i class="';
			_h += _footer.icon;
			_h += '"> </i> </span>';
		}
		_h += '<div class="clearfix"> </div>';
		_h += '</div>';
		if (_footer.url) {
			_h += '</a>';
		}
	}
	_h += '</div>';

	return _h;
};

mikan.html.table.create_list = function(_json) {
	if (MIKAN_DEBUG_ON) console.log([_json]);

	if (_json) {
		var _name = _json.name;
		var _select = _json.header.select;

		var _h = '';

		_h += '<colgroup>';
		for (var c = 0; c < _json.header.columns.length; c++) {
			var _column = _json.header.columns[c];
			if (_column.show !== false) {
				_h += '<col';
				if (_column.width) {
					_h += ' width="' + _column.width + '"';
				}
				if (_column.align) {
					_h += ' align="' + _column.align + '"';
				}
				_h += ' />';
			}
		}
		_h += '</colgroup>';

		_h += '<thead>';

		for (var c = 0; c < _json.header.columns.length; c++) {
			var _column = _json.header.columns[c];
			if (_column.show !== false) {
				_h += '<th';
				if (_column.align) {
					_h += ' class="text-' + _column.align + '"';
				}
				_h += '>';
				_h += _column.caption ? _column.caption : _column.name;
				_h += '</th>';
			}
		}

		_h += '</thead>';

		_h += '<tbody>';

		var _i = 0;
		for (var r in _json.items) {
			var _item = _json.items[r];

			_h += '<tr';
			_h += ' id="';
			_h += _name;
			_h += '_item_';
			_h += _i;
			_h += '"';
			_h += ' data-id="';
			_h += _item[0].v;
			_h += '"';
			_h += '>';
			for (var c = 0; c < _json.header.columns.length; c++) {
				var _column = _json.header.columns[c];
				if (_column.show !== false) {
					if (c < _item.length) {
						_h += '<td';
						if (_column.align) {
							_h += ' class="text-' + _column.align + '"';
						}
						_h += '>';
						if (_column.link) {
							_h += '<a href="';
							_h += _column.link;
							_h += _item[0].v;
							_h += '">';
						}
						if (_item[c].c) {
							_h += _item[c].c;
						} else if (_item[c].v || (_item[c].v === 0)) {
							_h += _item[c].v;
						}
						if (_item[c].b) {
							_h += ' <span class="badge pull-right">';
							_h += _item[c].b;
							_h += '</span>';
						}
						if (_item[c].l) {
							_h += ' <span class="label pull-right ';
							if (_item[c].l.c) _h += _item[c].l.c;
							_h += '">';
							_h += ' <span class="';
							if (_item[c].l.i) _h += _item[c].l.i;
							_h += '">';
							_h += _item[c].l.v;
							_h += ' </span>';
							_h += ' </span>';
						}
						if (_column.link) {
							_h += '</a>';
						}
						_h += ' ';
						_h += '</td>';
					} else {
						_h += '<td>';
						_h += ' ';
						_h += '</td>';
					}
				}
			}
			_h += '</tr>';

			_i += 1;
		}
		_h += '</tbody>';

		return _h;
	} else {
		return '';
	}
};

mikan.html.load_table = function(_id, _url, _params) {
	if (MIKAN_DEBUG_ON) console.log([_id, _url, _params]);

	var _json = mikan.json.post(_url, _params);
	var d = $(_id);
	d.html(mikan.html.table.create_list(_json));

	d.DataTable({
		"lengthMenu": [
			[100, 200, 300, -1],
			["100" + mikan.resource.ITEMS, "200" + mikan.resource.ITEMS, "300" + mikan.resource.ITEMS, mikan.resource.ALL]
		],
		"language": {
			"lengthMenu": "表示件数 _MENU_",
			"loadingRecords": "読みこみ中・・・",
			"zeroRecords": "該当するデータがありませんでした。",
			"info": "全_PAGES_ページ中_PAGE_ページ目",
			"infoEmpty": "該当するデータがありませんでした。",
			"infoFiltered": " [全_MAX_件からフィルタ中]",
			"search": "検索フィルタ",
			"searchPlaceholder": "キーワード",
			"paginate": {
				"first": mikan.resource.FIRST,
				"last": mikan.resource.LAST,
				"next": mikan.resource.NEXT,
				"previous": mikan.resource.BACK
			}
		}
	});
};

mikan.html.load_search = function(_form, _form_url, _list, _list_url, _auto) {
	if (MIKAN_DEBUG_ON) console.log([_form, _form_url, _list, _list_url, _auto]);

	mikan.form.html.load_json("form", _form_url, _form);
	if (_auto) {
		mikan.html.search_table(_form, _list, _list_url);
	}
};

mikan.html.search_table = function(_form, _id, _url) {
	if (MIKAN_DEBUG_ON) console.log([_form, _id, _url]);

	if (mikan.form.validate_json(_form, null) == null) {
		var fd = new FormData();
		for (var key in mikan.form.items[_form]) {
			var item = mikan.form.items[_form][key];
			if (MIKAN_DEBUG_ON) console.log([item.name, item.value]);

			if (item.type != "file") {
				fd.append(item.name, item.value);
			} else {
				var a = $("#" + _form + "_" + item.name);
				if (MIKAN_DEBUG_ON) console.log(a);
				fd.append(item.name, a[0].files[0]);
			}
		}
		mikan.html.load_table(_id, _url, fd);
	} else {
		$("#" + _id + '_messages').html(mikan.html.bootstrap.message(mikan.resource.ERROR, "入力内容を御確認ください。", "danger", "user"));
		mikan.form.html.load_datetimepicker();
	}
};

mikan.html.table.select = function(_id) {
	if (MIKAN_DEBUG_ON) console.log([_id]);

	try {
		var selects = mikan.html.table.vars.datatables[_id].rows({
			selected: true
		});
		var items = [];
		if (MIKAN_DEBUG_ON) console.log(selects);

		for (var key in selects[0]) {
			var select = selects[0][key];
			try {
				var _item = $("#" + _id + "_item_" + select);
				var _i = _item.attr("data-id");
				items.push(_i);
			} catch (e) {
				console.log(e);
			}
		}
		if (MIKAN_DEBUG_ON) console.log([selects, items]);
		return items;
	} catch (e) {
		return null;
	}
};

mikan.html.onselect_buttons = function(_select, _this, _table, _indexes) {
	if (MIKAN_DEBUG_ON) console.log([_select, _this, _table, _indexes]);

	count = 0;
	if (_indexes) {
		var selects = _table.rows({
			selected: true
		});

		count = selects[0].length;
	}
	if (count == 0) {
		$('.select-no').removeClass('disabled');
		$('.select-single').addClass('disabled');
		$('.select-multi').addClass('disabled');
		$('.select-both').addClass('disabled');
	} else if (count == 1) {
		$('.select-no').addClass('disabled');
		$('.select-single').removeClass('disabled');
		$('.select-multi').addClass('disabled');
		$('.select-both').removeClass('disabled');
	} else if (count > 1) {
		$('.select-no').addClass('disabled');
		$('.select-single').addClass('disabled');
		$('.select-multi').removeClass('disabled');
		$('.select-both').removeClass('disabled');
	}
};

mikan.html.html_buttons = function(_id, _json) {
	if (MIKAN_DEBUG_ON) console.log([_id, _json]);

	var h = '';
	for (var j in _json) {
		var item = _json[j];

		h += '<div class="btn-group" aria-label="buttons" role="group">';
		h += mikan.html.html_buttons_button(_id, item);
		h += '</div> ';
	}
	return h;
};

mikan.html.html_buttons_button = function(_id, _json) {
	if (MIKAN_DEBUG_ON) console.log([_id, _json]);

	var h = '';
	for (var j in _json) {
		var item = _json[j];
		h += '<button class="btn btn-';
		if (item.type) h += item.type;
		else h += 'default';
		if (item.select) {
			h += ' select-' + item.select;
			if ((item.select == "single") || (item.select == "multi") || (item.select == "both")) {
				h += ' disabled';
			}
		} else h += ' select-always';
		// select-no
		// select-single
		// select-multi
		// select-both
		// select-always
		h += '" type="button" onclick=" if (!$(this).hasClass(\'disabled\')) mikan.html.table.dialog_form(\'';
		h += _id;
		h += '\', \'';
		h += j;
		h += '\', \'';
		h += item.url;
		h += '\');">';
		h += item.caption;
		h += '</button>';
	}
	return h;
};

mikan.html.table.dialog_form = function(_id, _name, _json_url) {
	if (MIKAN_DEBUG_ON) console.log([_id, _name, _json_url]);

	var ids = mikan.html.table.select(_id);
	if (ids && (ids.length == 1)) {
		ids = ids[0];
	}
	if (MIKAN_DEBUG_ON) console.log(ids);
	mikan.dialog.form(_json_url, {
		m: _name,
		id: ids,
	}, {
		//		onclose: mikan.dialog.event.close_form_submit
	});
};


mikan.html.form.create_form = function(_id, _form_json_url, _edit_json_url) {
	if (MIKAN_DEBUG_ON) console.log([_id, _form_json_url, _edit_json_url]);

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		data.url = _form_json_url;
	}
	a.on_success = function(data, result) {
		$('#' + _id).html(mikan.html.form.html_form(_id, result, _edit_json_url));

		mikan.form.init_plugin();
	};
	a.on_error = function(data, error) {
		$('#' + _id).text(error);
	};
	a.run();
};

mikan.html.form.html_form = function(_id, _json, _list_json_url, _edit_json_url) {
	if (MIKAN_DEBUG_ON) console.log([_id, _json, _list_json_url, _edit_json_url]);

	var form_name = _id + "_form";
	var button_name = _id + "_buttons";
	var h = '';

	h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="' + form_name + '">';
	h += '<div class="row-fluid">';
	h += '<div class="col-xs-12" id="' + form_name + '_messages"> ';
	h += '</div>';
	h += '<div class="col-xs-12">';
	h += '<br />';
	h += mikan.form.html.html_json(_id, _json, form_name);

	h += '</div>';
	h += '<div class="row-fluid hidden-print">';
	h += '<div class="col-xs-12">';
	h += '<hr />';
	h += '</div>';

	if (_edit_json_url && _json.buttons) {
		h += '<div class="col-md-offset-3 col-md-3 col-xs-6">';
		h += '<button id="' + form_name + '_submit" class="btn btn-default btn-block" type="button"';
		h += ' onclick="mikan.html.form.submit(\'' + _id + '\', \'' + _edit_json_url + '\'); ">';
		h += _json.buttons.submit.caption;
		h += '</button>';
		h += '</div>';
	}
	h += '</div>';
	h += '</div>';
	h += '</div>';
	h += '</form>';

	if (_edit_json_url && _json.buttons) {
		h += '<div class="row-fluid">';
		h += '<div id="';
		h += button_name;
		h += '" >';
		h += mikan.html.html_buttons(_id, _edit_json_url);
		h += '</div>';
		h += '</div>';
	}

	h += '</div>';

	return h;
}

mikan.html.table.html_form = function(_id, _json, _list_json_url, _tools_json) {
	// ログ
	if (MIKAN_DEBUG_ON) {
		console.log([_id, _json, _list_json_url, _tools_json]);
	}

	var form_name = _id + "_form";
	var list_name = _id + "_list";
	var button_name = _id + "_buttons";
	var h = '';

	h += '<div class="panel panel-default">';

	h += '<div class="panel-body">';
	h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="' + form_name + '">';
	h += '<div class="row-fluid">';
	h += '<div class="col-xs-12" id="' + form_name + '_messages"> ';
	h += '</div>';
	h += '<div class="col-xs-12">';
	h += '<br />';
	h += mikan.form.html.html_json(_id, _json, form_name);

	h += '</div>';
	h += '<div class="row-fluid hidden-print">';
	h += '<div class="col-xs-12">';
	h += '<hr />';
	h += '</div>';
	h += '<div class="col-md-offset-3 col-md-3 col-xs-6">';
	h += '<button id="' + form_name + '_submit" class="btn btn-default btn-block" type="button"';
	h += ' onclick="mikan.html.table.search(\'' + _id + '\', \'' + _list_json_url + '\'); ">';
	h += _json.buttons.submit.caption;
	h += '</button>';
	h += '</div>';
	h += '</div>';
	h += '</div>';
	h += '</div>';
	h += '</form>';
	h += '</div>';

	h += '</div>';

	if (_tools_json) {
		h += '<div class="panel panel-default">';
		h += '<div class="panel-body">';
		h += '<div class="row-fluid">';
		h += '<div id="';
		h += button_name;
		h += '" >';
		h += mikan.html.html_buttons(_id, _tools_json);
		h += '</div>';
		h += '</div>';
		h += '</div>';
		h += '</div>';
	}

	h += '<div class="panel panel-default">';

	h += '<div class="panel-body">';
	h += '<table class="table table-bordered table-condensed table-hover display compact" id="' + list_name + '">';
	h += '</table>';
	h += '</div>';

	h += '</div>';

	return h;
}

mikan.html.table.create_form_list = function(_id, _form_json_url, _list_json_url) {
	if (MIKAN_DEBUG_ON) console.log([_id, _form_json_url, _list_json_url]);

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		data.url = _form_json_url;
	}
	a.on_success = function(data, result) {
		$('#' + _id).html(mikan.html.table.html_form(_id, result, _list_json_url, result ? result.tools : null));

		mikan.form.init_plugin();

		$('#' + _id + '_form_submit').click();
	};
	a.on_error = function(data, error) {
		$('#' + _id).text(error);
	};
	a.run();
};

mikan.html.table.create_datatable = function(_id, _json) {
	if (MIKAN_DEBUG_ON) console.log([_id, _json]);

	var form_name = _id + "_form";
	var list_name = _id + "_list";
	var buttons_name = _id + "_buttons";

	var d = $('#' + list_name);
	if (mikan.html.table.vars.datatables[_id]) {
		mikan.html.table.vars.datatables[_id].destroy();
	}

	if (_json) {
		d.html(mikan.html.table.create_list(_json));

		var table = d.DataTable({
			"lengthMenu": [
				[100, 200, 300, -1],
				["100" + mikan.resource.ITEMS, "200" + mikan.resource.ITEMS, "300" + mikan.resource.ITEMS, mikan.resource.ALL]
			],
			"select": _json.header.select ? {
				style: 'multi'
			} : false,
			"language": {
				"lengthMenu": "表示件数 _MENU_",
				"loadingRecords": "読みこみ中・・・",
				"zeroRecords": "該当するデータがありませんでした。",
				"info": "全_PAGES_ページ中_PAGE_ページ目",
				"infoEmpty": "該当するデータがありませんでした。",
				"infoFiltered": " [全_MAX_件からフィルタ中]",
				"search": "検索フィルタ",
				"searchPlaceholder": "キーワード",
				"paginate": {
					"first": mikan.resource.FIRST,
					"last": mikan.resource.LAST,
					"next": mikan.resource.NEXT,
					"previous": mikan.resource.BACK
				}
			}
		});
		mikan.html.table.vars.datatables[_id] = table;

		var d = $('#' + buttons_name);
		if (d.size() > 0) {
			table
				.on('init.dt', function() {
					mikan.html.onselect_buttons(true, this, table, null);
				})
				.on('select', function(e, dt, type, indexes) {
					mikan.html.onselect_buttons(true, this, table, indexes);
				})
				.on('deselect', function(e, dt, type, indexes) {
					mikan.html.onselect_buttons(false, this, table, indexes);
				});
		}

		mikan.form.init_plugin();
	} else {
		d.html('');
	}
	$('#' + form_name + '_submit').removeClass("disabled");
	$("#" + form_name + '_messages').html('');
};

mikan.html.table.search = function(_id, _list_json_url) {
	if (MIKAN_DEBUG_ON) console.log([_id, _list_json_url]);

	var form_name = _id + "_form";

	var a = new mikan.action.AjaxACV();
	a.on_prepare = function(data) {
		$('#' + form_name + '_submit').addClass("disabled");
		$("#" + form_name + '_messages').html(mikan.html.message.html_loading());

		var messages = mikan.form.validate_json(form_name, null);
		if (messages == null) {
			var fd = {};

			var is = mikan.form.items[form_name];
			if (MIKAN_DEBUG_ON) console.log(is);
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
			data.params = fd;
			data.url = _list_json_url;
		} else {
			throw new Error("エラーが発生しました。入力内容を御確認ください。");
		}
	}
	a.on_success = function(data, result) {
		if (MIKAN_DEBUG_ON) console.log([data, result]);

		mikan.html.table.create_datatable(_id, result);

		if (result.messages) {
			$("#" + form_name + '_messages').html(mikan.html.message.html_messages(result.messages, "info"));
		} else {
			$("#" + form_name + '_messages').html('');
		}
	};
	a.on_error = function(data, error) {
		if (MIKAN_DEBUG_ON) console.log([data, error]);

		if (error.messages) {
			$("#" + form_name + '_messages').html(mikan.html.message.html_messages(error.messages, "danger"));
		} else if (error.message) {
			$("#" + form_name + '_messages').html(mikan.html.message.html_messages(error.message, "danger"));
		} else {
			$("#" + form_name + '_messages').html(mikan.html.message.html_messages(error, "danger"));
		}
	};
	a.on_end = function(data) {
		$('#' + form_name + '_submit').removeClass("disabled");
	};
	a.run(null);
};

mikan.html.message.html_message = function(_text, _type) {
	if (MIKAN_DEBUG_ON) console.log([_text, _type]);

	if (!_text) return '';
	if (_type === undefined) {
		_type = "default";
	}

	var h = '';
	h += '<li class="list-group-item list-group-item-' + _type + '">';
	h += _text;
	h += '</li>';

	return h;
};

mikan.html.message.html_messages = function(_messages, _type) {
	if (MIKAN_DEBUG_ON) console.log([_messages, _type]);

	var h = '';
	if (_messages) {
		if (_messages.message) {
			h += mikan.html.message.html_message(_messages.message, _type);
		} else if (_messages instanceof Object) {
			for (_key in _messages) {
				var _message = _messages[_key];
				if (_message) {
					if (_message.type) {
						h += mikan.html.message.html_message(_message.text, _message.type);
					} else {
						h += mikan.html.message.html_message(_message, _type);
					}
				}
			}
		} else if (_messages instanceof Array) {
			for (_key in _messages) {
				var _message = _messages[_key];
				if (_message.type) {
					h += mikan.html.message.html_message(_message.text, _message.type);
				} else {
					h += mikan.html.message.html_message(_message, _type);
				}
			}
		} else {
			h += mikan.html.message.html_message(_messages, _type);
		}
	}
	if (h != '') return '<ul class="list-group">' + h + '</ul>';
	return '';
};

mikan.html.message.html_loading = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	var h = '';
	h += '<img class="loading" src="' + mikan_url_images() + 'loading.gif" alt="';
	h += mikan.resource.LOADING;
	h += '" /> ';
	h += mikan.resource.PROCESSING;

	return mikan.html.message.html_messages(h, "info");
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
