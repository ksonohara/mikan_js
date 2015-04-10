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
mikan.form = {};
mikan.form.html = {};
mikan.form.items = {};
mikan.form.event = {};
mikan.form.consts = {};
mikan.form.consts.ICON_CHECK = "glyphicon-check";
mikan.form.consts.ICON_UNCHECKED = "glyphicon-unchecked";
mikan.form.bootstrap = {};

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.form.clear_input = function(element) {
	switch(element.type) {
		case "hidden":
		case "submit":
		case "reset":
		case "button":
		case "image":
			return;
		case "file":
			return;
		case "text":
		case "password":
		case "textarea":
			element.value = "";
			return;
		case "checkbox":
		case "radio":
			element.checked = false;
			return;
		case "select-one":
		case "select-multiple":
			element.selectedIndex = 0;
			return;
		default:
	}
};

mikan.form.clear = function(f) {
	var f = f === undefined ? document.item : f;

	var fc = function(e) {
		if (mikan.dialog.result) {
			for(var i = 0; i < f.elements.length; ++i) {
				mikan.form.clear_input(f.elements[i]);
			}
		}
	};

	mikan.dialog.confirm(mikan.resource.CONFIRM, '入力値を全てクリアしますか？', fc);
};

mikan.form.reset = function(f) {
	var f = f === undefined ? document.item : f;

	var fc = function(e) {
		if(mikan.dialog.result){
			f.reset();
		}
	};

	mikan.dialog.confirm(mikan.resource.CONFIRM, '入力値を初期状態にしますか？', fc);
};

mikan.form.submit = function(f) {
	if (f === undefined) {
		try {
			$('a.btn').addClass('disabled');
		} catch(e) {
		}
	}

	var f = f === undefined ? document.item : f;

	f.submit();
};

mikan.form.tooltip = function() {
	try {
		$("button").tooltip();
	} catch(e) {
	}
	try {
		$("a.btn").tooltip();
	} catch(e) {
	}
	try {
		$("span.tooltip").tooltip();
	} catch(e) {
	}
	try {
		$("span.glyphicon-question-sign").tooltip();
	} catch(e) {
	}
};

mikan.form.event.select_radio = function(name, id, value) {
	var target = $("#" + id);
	if (!target.hasClass("active")) {
		// 選択解除
		var seleced = $("button." + name);
		seleced.removeClass("active");
		seleced.removeClass("btn-primary");
		seleced.addClass("btn-default");
		seleced.removeAttr("checked");
		var seleced_icon = $("button." + name + " span." + mikan.form.consts.ICON_CHECK);
		seleced_icon.removeClass(mikan.form.consts.ICON_CHECK);
		seleced_icon.addClass(mikan.form.consts.ICON_UNCHECKED);

		// 選択表示
		target.addClass("active");
		target.addClass("btn-primary");
		target.attr("checked", "true");
		var target_icon = $("#" + id + " span.glyphicon");
		target_icon.removeClass(mikan.form.consts.ICON_UNCHECKED);
		target_icon.addClass(mikan.form.consts.ICON_CHECK);
		
		// データ設定
		$("#" + name).attr("value", value);
	}
};

mikan.form.event.keypress = function(s, e) {
	if (e.keyCode == 13) {
		return false;
	}

	return true;
};

mikan.form.html.input_zipcode = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = mikan.form.html.input_text(formname, item, confirm);
	if (!confirm) {
		h += '<div class="col-xs-2">';
		h += '<button type="button" class="btn btn-primary" onclick="mikan.form.html.zipcode_to(\'' + item.rpc + '\',\'' + formname + '\', \'' + item.name + '\', \'' + item.zipcode.ken_id + '\', \'' + item.zipcode.city_name + '\');">住所に変換</button>';
		h += '</div>';
	}

	return h;
};

mikan.form.html.zipcode_to = function(rpc, formname, zipcode, ken_id, city_name) {
	mikan.form.clear_input_error(formname, zipcode);

	var v_zipcode = $("#" + formname + "_" + zipcode)[0];
	if (v_zipcode.value) {
		if ((v_zipcode.value.length > 4) && v_zipcode.value[3] != "-") {
			v_zipcode.value = v_zipcode.value.substring(0, 3) + "-" + v_zipcode.value.substring(3);
		}

		var a = mikan.json.load(MIKAN_CGI_ROOT + rpc + "?c=" + v_zipcode.value, null, false, null, null,  false, false);

		mikan.log_debug(a);
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

mikan.form.html.input_text = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '<div class="col-xs-' + item.width + '">';
	if (confirm) {
		if (item.type != 'password') {
			h += mikan.form.html.input_hidden(formname, item);
			h += '<p>';
			h += mikan.util.escape(item.value, true);
			h += '</p>';
		} else {
			h += '<p> </p>';
		}
	} else {
		var clazz = "form-control";
		h += '<input type="'+ item.type +'" class="' + clazz + '" name="' + item.name + '" id="' + name + '""';
		if (item.maxlength) {
			h += ' maxlength="' + item.maxlength +'"';
		}
		if (item.hint) {
			h += ' placeholder="' + item.hint +'"';
		}
		if (item.edit == false) {
			h += ' disabled="disabled"';
		}
		h += ' value="' + item.value + '"';
		if (item.required) {
			h += ' required="true"';
		}
		h += ' onkeypress=" return mikan.form.event.keypress(this, event); " />';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_label = function(formname, item, confirm) {
	return '';
};

mikan.form.html.input_iframe = function(formname, item, confirm) {
	return '<iframe class="form_iframe" frameborder="1" src="' + item.value + '" width="75%" height="250px" max-height="300px"> </iframe>';
};

mikan.form.html.input_select = function(formname, item, confirm) {
	return mikan.form.html.input_multi(formname, item, false);
};

mikan.form.html.input_multi = function(formname, item, multi, confirm) {
	if (multi === undefined) {
		var multi = true;
	}
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-' + item.width + '">';

	var clazz = name + " form-control input-xlarge";
	var disabled = "";
	if (item.edit == false) {
		clazz += ' disabled';
		disabled = ' disabled="disabled"';
	}
	if (multi) {
		clazz += ' multiple';
	}

	h += '<select id="' + name +'" name="' + item.name +'" class="' + clazz + '"';
	if ( item.onchange != undefined) {
		h += ' onchange="' + item.onchange + '"';
	}
	h += disabled;
	if (multi) {
		h += ' multiple="multiple"';
	}
	h += ">";
	var v = item.value;
	if (v) {
		try {
			v = v.split(",");
		} catch(e) {
			v = [v];
		}
	} else {
		v = [v];
	}
	for (var i in item.select) {
		h += '<option value="' + i + '"';
		if(jQuery.inArray(i, v) != -1) {
			h += ' selected="True"';
		}
		h += '>';
		h += item.select[i];
		h += '</option>';
	}
	h += '</select>';
	h += '</div>';
	return h;
};

mikan.form.html.input_radio = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-' + item.width + '">';
	h += '<div class="btn-group" data-toggle="buttons">';
	h += '<input type="hidden" id="' + name + '" name="' + item.name + '" value="' + item.value + '" />';

	for (var i in item.select) {
		var clazz = name + " btn";
		var disabled = "";
		var checked = "";
		var icon = mikan.html.bootstrap.icon("unchecked");
		if(item.value == i) {
			clazz += " btn-primary active";
			icon = mikan.html.bootstrap.icon("check");
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
	h += '</div>';
	h += '</div>';
	return h;
};

mikan.form.html.input_message = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '<div class="col-xs-' + item.width + '">';
	h += '<p>';
	h += mikan.util.escape(item.value, true);
	h += '</p>';
	return h;
}

mikan.form.html.input_checkbox = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-' + item.width + '">';

	var clazz = "control-label";
	var checked = "";
	if(item.value == true) {
		checked = 'checked="true"';
	} else {
	}
	if (!confirm) {
	var disabled = "";
		if (item.edit == false) {
			clazz += ' disabled';
			disabled = ' disabled="disabled"';
		}

		h += '<input class="" type="checkbox" name="' + item.name + '" id="' + name + '" placeholder="" value=" ' + item.value + '" ' + checked + disabled + ' ';
		if ( item.onchange != undefined) {
			h += ' onchange="' + item.onchange + '"';
		}
		if (item.edit == false) {
			disabled = ' disabled="disabled"';
		}
		h += disabled;
		h += " /> ";
	}
	h += '<label for="' + name + '" class="' + clazz + '">';
	if ( item.check != undefined) {
		h += item.check;
	}
	h += '</label> ';
	h += '</div>';
	return h;
};

mikan.form.html.input_textarea = function(formname, item, confirm) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<div class="controls col-xs-' + item.width + '">';

	if (confirm) {
		h += mikan.form.html.input_hidden(formname, item);
		h += '<p>';
		h += mikan.util.escape(item.value, true).replace(/\n/g, "<br />");
		h += '</p>';
	} else {
		var disabled = "";
		var clazz = "";
		if (item.edit == false) {
			clazz += ' disabled';
			disabled = ' readonly="readonly"';
		}
		h += '<textarea';
		h += ' class="' + clazz + '"';
		h += ' cols="' + item.width * 10 + '"';
		h += ' rows="8"';
		if (item.hint) {
			h += ' placeholder="' + item.hint +'"';
		}
		h += ' id="' + name + '"';
		h += ' name="' + item.name + '"';
		h += disabled;
		h += '>';
		h += item.value;
		h += '</textarea>';
	}
	h += '</div>';
	return h;
};

mikan.form.html.input_hidden = function(formname, item) {
	var name = formname + "_" + item.name;

	var h = '';
	h += '<input type="hidden" name="' + item.name + '" id="' + name + '""';
	h += ' value="' + item.value + '"';
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

mikan.form.value6select = function(name, selects) {
	for (var key in selects) {
		if (selects[key] == name) {
			return key;
		}
	}
	
	return null;
};


mikan.form.html.load_json = function(id, url, formname, custom) {
	mikan.form.items[formname] = mikan.json.load(url, false);

	var h = mikan.form.html.create_inputs(formname, mikan.form.items[formname], custom, false);
	if (id) {
		$("#" + id).html(h);
		$("#" + id+"_message").html("");
	}
	$('#'+formname+'_submit').removeClass("disabled");

	return h;
};


mikan.form.html.back_json = function(id, formname, custom, message) {
	if (message == undefined) var message = "";
	var h = mikan.form.html.create_inputs(formname, mikan.form.items[formname], custom, false);
	if (id) {
		$("#" + id).html(h); 
		$("#" + id+"_message").html(message); 
	}
	$('#'+formname+'_submit').removeClass("hidden");
	$('#'+formname+'_back').addClass("hidden");

	$('html,body').animate({ scrollTop: 0 }, 'fast');

	return h;
};

mikan.form.confirm_json = function(id, formname, post_url, custom, confirm) {
	if (confirm == undefined) var confirm = true;
	if (post_url == undefined) var post_url = "";

	$('html,body').animate({ scrollTop: 0 }, 'fast');

	if ($('#'+formname+'_back').hasClass("hidden")) {
		if (mikan.form.validate_json(formname, custom) == null) {
			if (confirm) {
				$('#'+formname+'_back').removeClass("hidden");
				
				mikan.form.items[formname] = mikan.form.value6form(formname, mikan.form.items[formname], custom);
				
				var h = mikan.form.html.create_inputs(formname, mikan.form.items[formname], custom, true);
				if (id) {
					$("#" + id).html(h); 
					$("#" + id+"_message").html(mikan.html.bootstrap.message(mikan.resource.CONFIRM, "以下の内容でよろしいでしょうか？以下の内容で続ける場合実行を選択してください。", "success", "user")); 
				}
				return h;
			} else {
				mikan.form.items[formname] = mikan.form.value6form(formname, mikan.form.items[formname], custom);
			}
		} else {
			if (id) {
				$("#" + id+"_message").html(mikan.html.bootstrap.message(mikan.resource.ERROR, "入力内容を御確認ください。", "danger", "user"));
				return;
			}
		}
	}

	$("#" + id+"_message").html(mikan.html.bootstrap.message(mikan.resource.PROCESS, '<img src="' + MIKAN_IMAGE_ROOT + 'loading.gif" alt="' + mikan.resource.LOADING + '" />' + mikan.resource.PROCESSING, "info", "repeat")); 

	$('#'+formname+'_submit').addClass("hidden");
	$('#'+formname+'_back').addClass("hidden");

	var fd = new FormData();
	for (var key in mikan.form.items[formname]) {
		var item =  mikan.form.items[formname][key];
		if (MIKAN_DEBUG_ON === true) {
			console.log(item.name);
			console.log(item.value);
		}
		if (item.type != "file") {
			fd.append(item.name, item.value);
		} else {
			var a = $("#" + formname + "_" + item.name);
			if (MIKAN_DEBUG_ON === true) {
				mikan.log_debug(a);
				mikan.log_debug(a[0]);
			}
			fd.append(item.name, a[0].files[0]);
		}
	}

	done = function(d) {
		if (MIKAN_DEBUG_ON === true) {
			mikan.log_debug(d);
		}

		var m = null;
		var t = "";
		var s = mikan.resource.message.DONE;
		
		if (d) {
			if (d instanceof Error) {
				try {
					m = m.message;
				}catch(e){
				}
			} else {
				if (d.responseText !== undefined) {
					try {
						var r =  d.responseText;
						try {
							m =  mikan.util.escape(d.responseText, true);
						} catch(e) {
							mikan.log_error(e);
							mikan.log_debug(d.responseText);
							m = mikan.resource.ERRORl;
						}
					} catch(e) {
					}
				}
				if (m == null) {
					try {
						if (d.status == 0) {
							if (d.message) {
								s = d.message;
							}
						} else {
							m = d.message;
						}
					}catch(e){
						mikan.log_error(e);
						m = e.message;
					}
				}
			}
		} else {
			m = mikan.resource.ERROR;
		}

		if (m) {
			t = mikan.html.bootstrap.message(mikan.resource.ERROR, m, "danger", "warning-sign");
			mikan.form.html.back_json(id, formname, custom, t);
		} else {
			var h = mikan.form.html.create_inputs(formname, mikan.form.items[formname], custom, true);
			$("#" + id).html(h);
			s = mikan.html.bootstrap.message(mikan.resource.DONE, s, "info", "saved");
			$("#" + id+"_message").html(s);
			mikan.form.items[formname] = null;
		}
	};

	if (MIKAN_DEBUG_ON === true) {
		console.log(post_url);
	}
	mikan.json.post(post_url, fd, true, done, done, false, true);

	return null;
};

mikan.form.validate_json = function(formname, custom) {
	return mikan.form.validate(formname, mikan.form.items[formname], custom);
};

mikan.form.html.confirm_inputs = function(formname, items, custom) {
	return mikan.form.html.create_inputs(formname, items, custom, true);
};

mikan.form.html.create_inputs = function(formname, items, custom, confirm, required_mark) {
	if (confirm == undefined) var confirm = false;
	if (required_mark == undefined) var required_mark = mikan.resource.REQUIRED;
	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	}catch(e){
	}
	try {
		is.sort(
			function(a,b){
				try {
					var a_sort = a.sort;
					var b_sort = b.sort;
					if (a_sort == undefined) return 0;
					if (b_sort == undefined) return 0;
					if (a_sort < b_sort) return -1;
					if (a_sort > b_sort) return 1;
					return 0;
				}catch(e){
					return 0;
				}
			}
		);
	}catch(e){
	}

	// 表示
	var h = '';
	h += '<div class="row">';

	// 表示
	var fg = false;
	for (var key in is) {
		var item = is[key];
		var name = formname + "_" + item.name;

		if (!(confirm && (item.type == 'iframe'))) {
			if (item.type != 'hidden') {
				if (item.formgroup != false) {
					if (fg) {
						h += '</div>';
					}
					h += '<div class="form-group">';
					fg = true;
				} else {
				}
				
				var label = 3;
				if (item.label != undefined) {
					label = item.label;
				}
				var clazz = name + ' control-label col-xs-' + label;
				if (item.offset != undefined) {
					clazz += ' col-xs-offset-' + item.offset;
				}
				if (item.nolabel == true) {
					clazz += " sr-only";
				}
				h += '<label for="' + name + '" class="text-right ' + clazz + '">';
				h += item.caption;
				if (item.required && !confirm) {
					if (item.edit != false) {
						h += ' ' + required_mark;
					}
				}
				h += '</label>';
			}
			if ((item.type == 'text') || (item.type == 'number') || (item.type == 'password') ||
				(item.type == 'datetime') || (item.type == 'datetime-local') || (item.type == 'date') ||
				(item.type == 'month') || (item.type == 'time') || (item.type == 'week') || (item.type == 'email') ||
				(item.type == 'url') || (item.type == 'search') || (item.type == 'tel') || (item.type == 'color')) {
				h += mikan.form.html.input_text(formname, item, confirm);
			} else if (item.type == 'zipcode') {
				h += mikan.form.html.input_zipcode(formname, item, confirm);
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
			} else {
				if (custom != undefined) {
					h += custom(formname, item, confirm);
				}
			}
		}
	}
	if (fg) {
			h += '</div>';
	}

	h += '</div>';
	return h;
};
mikan.form.value = function(formname, item, custom) {
	var a = $("#" + formname + "_" + item.name);
	if ((item.type == 'text') || (item.type == 'number') || (item.type == 'password') ||
		(item.type == 'datetime') || (item.type == 'datetime-local') || (item.type == 'date') ||
		(item.type == 'month') || (item.type == 'time') || (item.type == 'week') || (item.type == 'email') ||
		(item.type == 'url') || (item.type == 'search') || (item.type == 'tel') || (item.type == 'color') || (item.type == 'zipcode')) {
		return a[0].value;
	} else if ((item.type == 'select') || (item.type == 'multi')) {
		return a[0].value;
	} else if (item.type == 'number') {
		return a[0].value;
	} else if (item.type == 'radio') {
		return a[0].value;
	} else if (item.type == 'checkbox') {
		return a[0].checked == true;
	} else if (item.type == 'textarea') {
		return a[0].value;
	} else if (item.type == 'hidden') {
		return a[0].value;
	} else if (item.type == 'file') {
		return a[0].value;
	} else if (item.type == 'iframe') {
		//
		return "";
	} else if (item.type == 'message') {
		//
		return null;
	} else {
		if (custom != undefined) {
			return custom(formname, item);
		}
	}
	
	return null;
};

mikan.form.set_input_error = function(formname, item, message) {
	var ui = mikan.form.get_input_label(formname, item);
	
	for (var i in ui) {
		if (ui[i] != null) {
			ui[i].addClass("has-error");
		}
	}

	if (message) {
		try {
			ui.input.parent().append('<span class="help-block">' + mikan.html.bootstrap.icon("hand-up") + ' ' + message + '</span>');
		} catch(e){
		}
	}
};

mikan.form.get_input_label = function(formname, item) {
	var name = item;
	if (item && item.name) {
		name = item.name;
	}
	
	var label = $("label." + formname + "_" + name);
	var input = $("#" + formname + "_" + name);
	var group = input.parent(""); // label.parent("div.form-group");
	var other = null;

	return { label: label, input: input, group: group, other: other};
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
	} catch(e){
	}
};

mikan.form.value6form = function(formname, items, custom) {
	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	}catch(e){
	}

	for (var i in is) {
		var item = is[i];

		if (item.type !== 'iframe') {
			var value = mikan.form.value(formname, item, custom);
			is[i].value = value;
		}
	}

	return is;
};

mikan.form.validate = function(formname, items, custom, mesasges) {
	if (mesasges == undefined) var mesasges = mikan.resource.form.messages;

	var results = {};

	var is = items;
	try {
		if (items.items != undefined) {
			is = items.items;
		}
	}catch(e){
	}

	for (var i in is) {
		var item = is[i];
		mikan.form.clear_input_error(formname, item);

		var value = mikan.form.value(formname, item, custom);
		mikan.form.validate_input(formname, item, mesasges, results, value, is, custom);
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
mikan.form.validate_input = function(formname, item, mesasges, results, value, items, custom) {
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
					results[item.name]["mesasge"] = m;

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
				if (value.match(r) && (value >= item.number.min) && (value <= item.number.max ) ) {
					//
				} else {
					var m = mesasges.NUMBER === undefined ? mesasges.number : mesasges.NUMBER;
					//
					results[item.name] = {};
					results[item.name]["type"] = "error";
					results[item.name]["category"] = "number";
					results[item.name]["mesasge"] = m;

					//
					mikan.form.set_input_error(formname, item, m);
				}
			}
			if (item.match) {
				var ii = mikan.form.get_item(items, item.match);
				var vv = mikan.form.value(formname, ii, custom);
				mikan.log_debug(ii);
				mikan.log_debug(value);
				mikan.log_debug(vv);
				if (vv != value) {
					var m = mesasges.MATCH === undefined ? mesasges.match : mesasges.MATCH;
					m = m;

					//
					results[item.name] = {};
					results[item.name]["type"] = "error";
					results[item.name]["category"] = "number";
					results[item.name]["mesasge"] = m;

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
				results[item.name]["mesasge"] = m;

				mikan.form.set_input_error(formname, item, m);
			}
		}
	}
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
