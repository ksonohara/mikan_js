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
mikan.admin = {};
mikan.admin.table = {};
mikan.admin.table.url = {};
mikan.admin.table.id = null;
mikan.admin.table.items = {};
mikan.admin.table.selected = {};


/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.admin.table.refresh= function (e) {
	if ($(e).hasClass("disabled")) return;
	mikan.admin.table.items = {};
	mikan.admin.table.selected = {};
	
	$("#" + mikan.admin.table.id).html('<img src="' + MIKAN_IMAGE_ROOT + '/loading.gif" alt="" />');

	mikan.admin.table.items = mikan.json.table(mikan.admin.table.id, MIKAN_CGI_ROOT + mikan.admin.table.url.table, null, "tests", "book", null, "default", false, "item_%d", "mikan.admin.table.item_select('%d');");

	$("#" + mikan.admin.table.id + " div table").tablesorter({cssAsc: "warning", cssDesc: "danger" });

	mikan.admin.table.button_status();
};

mikan.admin.table.select_all = function(e) {
	if ($(e).hasClass("disabled")) return;
	mikan.admin.table.selected = {};

	for (var i in mikan.admin.table.items.items) {
		mikan.admin.table.selected[i] = "i"+i;
	}
	$("#" + mikan.admin.table.id + " table tbody tr.item").addClass("warning");

	mikan.admin.table.button_status();
};

mikan.admin.table.unselect_all = function(e) {
	mikan.admin.table.selected = {};
	$("#" + mikan.admin.table.id + " table tbody tr.item").removeClass("warning");

	mikan.admin.table.button_status();
};

mikan.admin.table.item_select = function(index) {
	var remove = false;
	try{
		remove = mikan.admin.table.selected[index];
		if (remove == undefined) {
			remove = false;
		}
		if (remove != false) {
			delete mikan.admin.table.selected[index];
		}
	} catch(e) {
	}
	if (remove == false) {
		mikan.admin.table.selected[index] = "i"+index;
	}

	if (remove != false) {
		$('tr#item_' + index).removeClass("warning");
	} else {
		$('tr#item_' + index).addClass("warning");
	}
	
	mikan.admin.table.button_status();
};

mikan.admin.table.button_status = function() {
	var single = false;
	var multi = false;
	for (var i in mikan.admin.table.selected) {
		if (!single) single = true;
		else {
			single = false;
			multi = true;
			break;
		}
	}
	if (single || multi) {
		$('.item-select').removeClass("disabled");
	} else {
		$('.item-select').addClass("disabled");
	}
	if (single) {
		$('.item-select-single').removeClass("disabled");
	} else {
		$('.item-select-single').addClass("disabled");
	}
	if (multi) {
		$('.item-select-multi').removeClass("disabled");
	} else {
		$('.item-select-multi').addClass("disabled");
	}
};

mikan.admin.table.search = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

mikan.admin.table.item_property = function(e) {
	if ($(e).hasClass("disabled")) return;
	var s = null;
	for (var i in mikan.admin.table.selected) {
		s = mikan.admin.table.items.items[i];
		break;
	}

	var j = mikan.json.load(MIKAN_CGI_ROOT + mikan.admin.table.url.item_property + "&d=" + s.id, null, false, null, null,  false, null);
	var h = mikan.html.bootstrap.table(j.keys, j.columns, j.items[0], null, null, null, "info", true, null, null);

	mikan.dialog.confirm("プロパティ", h,
		function() {
		}, "閉じる", "", "file", "static", 3000, null, "modal-lg");
};

mikan.admin.table.mail = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

mikan.admin.table.item_create = function(e) {
	if ($(e).hasClass("disabled")) return;

	var j = mikan.json.load(MIKAN_CGI_ROOT + mikan.admin.table.url.item_create, null, false, null, null,  false, null);
	var f =  mikan.form.html.create_inputs("item", j.items, null, false);
//	var h = '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="item">';
//	var h = '<div class="container"><div class="row"><div class="col-xs-10">';
//	var h = '<div class="col-xs-offset-1 col-xs-11" id="form_message"> </div>';
//	h += mikan.form.html.create_inputs("item", j.items, null, false);
//	h += '</div></div></div>';
//	h += '</form>';

	var h = '';
//	h += '<div class="container">';
	h += '<div class="row">';
	h += '<div class="col-xs-10">';
	h += '<form class="form-horizontal" role="form" enctype="multipart/form-data" onsubmit=" return false; " name="json_form">';
	h += '<div class="row">';
	h += '<div class="col-xs-offset-1 col-xs-11" id="form_message"> </div>';
	h += '<div class="col-xs-offset-0 col-xs-12">';
	h += '<div id="form">' + f +'</div>';
	h += '</div>';
//	h += '<div class="row">';
//	h += '<div class="col-xs-12"><hr /></div>';
//	h += '<div class="col-xs-offset-6 col-xs-2">';
//	h += '<button id="json_form_submit" class="disabled btn btn-info btn-lg btn-block" type="button" onclick="mikan.form.confirm_json(\'form\', \'item\', \'./form.php\', null, true); ">実行</button>';
//	h += '</div>';
//	h += '<div class="col-xs-2">';
//	h += '<button id="json_form_back" class="hidden btn btn-lg btn-block" type="button" onclick=" mikan.form.html.back_json(\'form\', \'item\') ; ">戻る</button>';
//	h += '</div>';
//	h += '</div>';
	h += '</div>';
	h += '</form>';
	h += '</div>';
	h += '</div>';
//	h += '</div>';

	mikan.dialog.confirm("新規作成", h,
		function() {
		}, "作成", "キャンセル", "file", "static", 3000, null, "modal-lg");
};

mikan.admin.table.item_update = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

mikan.admin.table.item_remove = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

mikan.admin.table.item_copy = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

mikan.admin.table.file_export = function(e) {
	if ($(e).hasClass("disabled")) return;
	console.trace();
	mikan.dialog.error("開発中", "まだ未実装です。");
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
