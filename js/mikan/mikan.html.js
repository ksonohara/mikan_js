/*
 * mikan.js JavaScript Web Library
 *  JavaScript Module
 *
 * Copyright (C) 1997-2015 K.Sonohara All Rights Reserved.
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
mikan.html = {};
mikan.html.bootstrap = {};
mikan.html.fa = {};

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */

mikan.html.fa.icon = function(icon, size) {
	if (size == undefined) size = null;

	var cs = '';
	if (size != null) {
		cs = ' fa-' + size;
	}

	return '<span class="fa fa-' + icon + cs + '"> </span>'
}

mikan.html.bootstrap.icon = function(icon) {
	return '<span class="glyphicon glyphicon-' + icon + '"> </span>'
}

mikan.html.bootstrap.rss = function(items, url_local, icon) {
	if (icon == undefined) icon = "fa fa-rss";

	mikan.log_debug(items);
	var h = '';
	for ( key in items ){
		item = items[key];

		h += '<div class="row">';
		h += '<div class="col-xs-12">';

		if (url_local) {
			h += '<a href="' + mikan.page.url.wsgi + '/' + item.url + '"' + '>';
		} else {
			h += '<a href="' + item.url + '"' + ' target="_blank"' + '>';
		}

		h += '<div>';
		h += '<span class="'
		h += icon
		h += '"> </span> '
		h += item.type;
		h += '<span class="pull-right text-muted">' + item.date + '</span>';
		h += '</div>';

		h += '<div class="text-indent">';
		h += '<span class="text-muted">&nbsp;&nbsp;</span>';
		h += item.title;
		h += '</div>';
		h += '</a>';

		h += '<br />';
		h += '</div>';
		h += '</div>';
	}

	return h;
};

mikan.html.bootstrap.table = function(keys, columns, items, header, icon, footer, paneltype, vertical, rowid, rowclick) {
	if (header == undefined) header = null;
	if (icon == undefined) icon = null;
	if (footer == undefined) footer = null;
	if (paneltype == undefined) paneltype = "default";
	if (vertical == undefined) vertical = false;
	if (rowid == undefined) rowid = null;
	if (rowclick == undefined) rowclick = null;
	
	h = '<div class="panel panel-' + paneltype + '">';

	// Header
	if (header != null) {
		h += '<div class="panel-heading">';
		h += '<h4>';
		if (icon != null) {
			h += mikan.html.bootstrap.icon(icon) + ' ';
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

mikan.html.bootstrap.breadcrumbs = function(items) {
	var h = '<ol class="breadcrumb">';
	for (var key in items) {
		h += '<li>';
		h += '<a';
		if ((items[key].href != undefined) && (items[key].href != null)) {
			h += ' href="';
			h += items[key].href;
			h += '"';
		}
		if ((items[key].onclick != undefined) && (items[key].onclick != null)) {
			h += ' onclick="';
			h += items[key].onclick;
			h += '"';
		}
		h += '>';
		if ((items[key].icon != undefined) && (items[key].icon != null)) {
			h += mikan.html.bootstrap.icon(items[key].icon);
			h += ' ';
		}
		h += items[key].caption;
		h += '</a>';
		h += '</li>';
	}
	h += '</ol>';

	return h;
};


mikan.html.bootstrap.message = function(title, message, dtype, icon) {
	if (dtype == undefined) dtype = "default";
	if (icon == undefined) icon = null;

	var h = '';
	var c = "panel panel-" + dtype;
	var i = null;
	if (icon) {
		i = mikan.html.bootstrap.icon(icon);
	}
	h += '<div class="' + c + '">';
	h += '<div class="panel-heading">';
	h += '<h4>';
	if (i) {
		h += i + " ";
	}
	h += title;
	h += '</h4>';
	h += '</div>';
	h += '<div class="panel-body">';
	h += '<h4>';
	h += message;
	h += '</h4>';
	h += '</div>';
	h += '</div>';

	return h;
};

mikan.html.bootstrap.load_sidemenu = function(url) {
	var _items = null;

	try {
		_items = mikan.json.load(url).items;
	} catch(e) {
	}

	return mikan.html.bootstrap.create_sidemenu(_items);
}

mikan.html.bootstrap.create_sidemenu = function(_items) {
	return mikan.html.bootstrap.create_item_sidemenu(_items);
}

mikan.html.bootstrap.create_item_sidemenu = function(_items, _level) {
	if (_items == undefined) return "";
	if (_level == undefined) _level = 0;

	var _h = "";

	for (var _d in _items) {
		var _item = _items[_d];

		_h += '<li>';
		_h += '<a';
		if (_item.url !== undefined) {
			_h += ' href="' + _item.url + '"';
		} else {
			_h += ' href="#"';
		}
		if (_item.target !== undefined) {
			_h += ' target="' + _item.target + '"';
		}
		_h += '>';
		if (_item.icon !== undefined) {
			_h += '<i class="' + _item.icon + '"> </i>';
		}
		_h += _item.caption;
		if (_item.items !== undefined) {
			_h += '<span class="fa arrow"> </span>';
		}
		_h += '</a>';

		if (_item.items !== undefined) {
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

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
