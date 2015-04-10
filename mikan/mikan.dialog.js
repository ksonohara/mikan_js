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
mikan.dialog = {};
mikan.dialog.result = null;

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */

mikan.dialog._confirm = function(id, title, message, onclick, yes, no, icon, titlecolor, backdrop, zindex, oncheck, size) {
	if (id == undefined) id = "mikan_dialog";
	if (yes == undefined) yes = "はい";
	if (no == undefined) no = "いいえ";
	if (onclick == undefined) onclick = function(e) {};
	if (icon == undefined) icon = "comment";
	if (titlecolor == undefined) titlecolor = "";
	if (backdrop == undefined) backdrop = null;
	if (size == undefined) size = "";

	var dialog = $("#" + id);
	

	mikan.dialog.result = null;
	var id_modal = id + "_modal";

	h = '<div class="modal fade" id="' + id_modal + '" tabindex="-1" role="dialog" aria-hidden="true"';
	if (backdrop != null) {
		h += ' data-backdrop="static"';
	}
	h += '><div class="modal-dialog ' + size + '">\
<div class="modal-content">\
<div class="modal-header">\
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
<h4 class="modal-title ' + titlecolor + '"><span class="glyphicon glyphicon-' + icon + '"></span> ' +
title +
'</h4>\
</div>\
<div class="modal-body">' +
message +
'</div>\
<div class="modal-footer">';
		if (yes != "") {
		}
			if (oncheck == undefined) {
				h += '<button type="button" class="btn btn-primary" data-dismiss="modal" onclick="mikan.dialog.result = true;">' + yes + ' </button>';
			} else {
				h += '<button type="button" class="btn btn-primary" onclick=" mikan.dialog.result = ' + oncheck + '(); if (mikan.dialog.result) $(\'#' + id_modal + '\').modal(\'hide\'); ">' + yes + ' </button>';
			}
		if (no != "") {
			h += '<button type="button" class="btn btn-default" data-dismiss="modal" onclick="mikan.dialog.result = null;">' + no + ' </button>';
		}
		h += '</div>\
</div>\
</div>\
</div>\
';

	if (dialog.length != 0) dialog.html(h);
	else {
		$("body div").first().prepend('<div id="' + id  + '">' + h + "</div>")
	}
	
	$('#' + id_modal + '').on('hidden.bs.modal', onclick);
	if (zindex)
		$('#' + id_modal + '').css("z-index", zindex);
		$('#' + id_modal + '').parent().css("z-index", zindex);


	var a = $('#' + id_modal + '').modal('show');
};

mikan.dialog.confirm = function(title, message, onclick, yes, no, icon, backdrop, zindex, oncheck, size) {
	mikan.dialog._confirm("mikan_dialog", title, message, onclick, yes, no, icon, "", backdrop, zindex, oncheck, size);
};

mikan.dialog.error = function(title, message, onclick, yes, icon, backdrop, zindex, size) {
	id = "mikan_error_dialog";
	
	if (yes == undefined) yes = mikan.resource.CLOSE;

	if (onclick == undefined) onclick = function(e) {};
	if (zindex == undefined) zindex = 9000;
	if (icon == undefined) icon = "warning-sign";

	mikan.dialog._confirm(id, title, message, onclick, yes, "", icon, "text-danger", backdrop, zindex, size);
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
