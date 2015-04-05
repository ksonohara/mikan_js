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
mikan.form.bootstrap.builder = {};

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */

mikan.form.bootstrap.builder.init = function() {
	var bb_data = $("#mikan_bb_data");

	var column_boolean = ["true", "false"];
	var column_type = ["text", "password", "datetime", "datetime-local", "date", "month", "time", "week", "number", "email", 
		"url", "search", "tel", "color", "checkbox", "radio", "select", "textarea", "label", "hidden", "iframe", "file", "message", "zipcode"];
	var column_data_boolean = [];
	var column_data_type = [];
	while (t = column_type.shift()) {
		column_data_type.push([
			[t]
		]);
	};
	while (t = column_boolean.shift()) {
		column_data_boolean.push([
			[t]
		]);
	};
	var columns = [
		"定義名",
		"表示名",
		"表示",
		"必須",
		"編集",
		"タイプ",
		"ラベル幅",
		"ラベルなし",
		"幅",
		"位置",
		"選択肢",
		"改行",
		"初期値",
		"入力規則",
		"ヒント"
	];
	var items = [
		[ "f1", "テスト1", "", "", "false", "text", "", "", "", "", "", "true", "入力値", "", "ヒント" ],
		[ "f2", "テスト2", "", "true", "", "text", "", "", "", "", "", "false", "入力値", "", "ヒント" ],
		[ "f3", "テスト3", "test", "", "", "checkbox", "", "", "", "", "", "", "", "", "" ],
		[ "f4", "テスト4", "", "", "", "radio", "", "", "", "", "test:a,aaa:b,eee:row,p:p", "", "test", "", "" ],
		[ "f5", "テスト5", "", "", "", "select", "", "", "", "", "test:a,aaa:b,eee:row,p:p", "", "aaa", "", "" ],
		[ "f6", "テスト6", "", "", "", "multi", "", "", "", "", "test:a,aaa:b,eee:row,p:p", "false", "aaa", "", "" ],
		[ "f7", "テスト7", "", "", "", "textarea", "", "", "6", "", "", "", "", "", "ヒント" ],
		[ "f8", "テスト8", "", "", "", "label", "", "", "3", "", "", "", "", "", "" ],
		[ "f9", "テスト9", "", "true", "", "number", "", "", "2", "", "", "", "1", "", "ヒント" ],
		[ "f10", "テスト10", "", "", "", "password", "", "", "", "", "", "false", "1", "", "ヒント" ],
		[ "f11", "テスト11", "", "", "", "date", "", "", "", "", "", "", "1", "", "ヒント" ],
		[ "f12", "テスト12", "", "", "", "hidden", "", "", "", "", "", "", "1", "", "" ],
		[ "f13", "テスト13", "", "", "", "tel", "", "", "", "", "", "", "1", "^0[0-9]{1,3}-{1}[0-9]{2,4}-{1}[0-9]{4}$", "" ],
		[ "f14", "テスト14", "", "", "", "email", "", "", "", "", "", "", "1", "^.*@.*[.].*$", "" ],
		[ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
		[ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
		[ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ],
		[ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]
	];
	mikan.form.bootstrap.builder.items = items;

	var h = '';
	bb_data.html("");
	bb_data.handsontable({
		data: items,
		colHeaders: columns,
		columns: [
			{},
			{},
			{},
			{
				type: 'handsontable',
				handsontable: {
					colHeaders: false,
					data: column_data_boolean
				}
			},
			{
				type: 'handsontable',
				handsontable: {
					colHeaders: false,
					data: column_data_boolean
				}
			},
			{
				type: 'handsontable',
				handsontable: {
					colHeaders: false,
					data: column_data_type
				}
			},
			{},
			{
				type: 'handsontable',
				handsontable: {
					colHeaders: false,
					data: column_data_boolean
				}
			},
			{},
			{},
			{},
			{
				type: 'handsontable',
				handsontable: {
					colHeaders: false,
					data: column_data_boolean
				}
			},
			{},
			{},
			{}
		],
		afterChange: function () {
			//
			mikan.form.bootstrap.builder.apply();
		}
	});
	
	mikan.form.bootstrap.builder.apply();
};

mikan.form.bootstrap.builder.row_add = function() {
	//
};

mikan.form.bootstrap.builder.apply = function() {
	var list = mikan.form.bootstrap.builder.items;
	
	//
	var items = [];
	for (var i in list) {
		//
		var l = list[i];
		if (l[0]) {
			var item = {
				"name": l[0],
				"caption": l[1],
				"type": l[5],
				"value": l[12]
			};
			if (l[2]) {
				item["check"] = l[2];
			}
			if (l[3] && (l[3] == "true")) {
				item["required"] = true;
			}
			if (l[4]) {
				item["edit"] = l[4] == false;
			}
			if (l[6]) {
				item["label"] = l[6];
			} else {
				item["label"] = 2;
			}
			if (l[7] && (l[7] == "true")) {
				item["nolabel"] = true;
			}
			if (l[8]) {
				item["width"] = l[8];
			} else {
				item["width"] = 4;
			}
			if (l[9]) {
				item["offset"] = l[9];
			}
			if (l[10]) {
				var s = {};
				var d = l[10].split(",");
				for (var o in d) {
					try {
						var v = d[o].split(":");
						s[v[0]] = v[1];
					} catch(e) {
					}
				}
				item["select"] = s;
			}
			if (l[11] && (l[11] == "false")) {
				item["formgroup"] = false;
			}
			if (l[13]) {
				item["reg"] = l[13];
			}
			if (l[14]) {
				item["hint"] = l[14];
			}
			if (l[5] == "zipcode") {
				item["zipcode"] = {};
				item["zipcode"]["ken_id"] = "prefecture";
				item["zipcode"]["city_name"] = "address1";
			}
			var num = i;
			if (i < 10) num = "0" + i;
			item["sort"] = parseInt(i);
			items.push(item);
		}
	}

	var bb_json = $("#mikan_bb_json");
	bb_json.html('<pre><code>' + JSON.stringify({ items: items }, null, "	") + '</code></pre>');

	var h = '<form class="form-horizontal" role="form" onsubmit=" return false; ">';
	h += mikan.form.html.create_inputs("mikan", { items: items });
	h += '</form>';

	$("#mikan_bb_preview").html(h);
	$("#mikan_bb_html").text(h.toString());

	$('.multiple').multiselect({
		includeSelectAllOption: true,
		enableCaseInsensitiveFiltering: true
	});
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
