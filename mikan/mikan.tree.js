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
mikan.tree = {};

mikan.tree.id = {};
mikan.tree.url = {};
mikan.tree.thumbnails = {};

mikan.tree.url.tree = './tree';
mikan.tree.url.list = './list?id=';
mikan.tree.id.tree = '#mikan_tree';
mikan.tree.id.title = '#mikan_title h4';
mikan.tree.id.list = '#mikan_list';
mikan.tree.thumbnails.list = false;

/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */

mikan.tree.onselected = function(e, data) {
	var i, j = [];
	for(i = 0, j = data.selected.length; i < j; i++) {
		n = data.instance.get_node(data.selected[i]);
		mikan.tree.thumbnail(n.text, n.id);
		return;
	}
	return;
};

mikan.tree.onselectitem = function(e, data) {
	var i, j = [];
	for(i = 0, j = data.selected.length; i < j; i++) {
		n = data.instance.get_node(data.selected[i]);
		mikan.tree.item(n.text, n.id);
		return;
	}
	return;
//	try {
//		var i, j = [];
//		for(i = 0, j = data.selected.length; i < j; i++) {
//			n = data.instance.get_node(data.selected[i]);
//			//location.href = './' + n.id + '/';
//			return;
//		}
//	} catch(e) {
//	}
//	return;
};

mikan.tree.init = function() {
	$(mikan.tree.id.tree)
		.on('changed.jstree', mikan.tree.onselected)
  		.jstree({
			"core" : {
				"animation" : 0,
				"check_callback" : true,
				"themes" : { "stripes" : true },
				'data' : {
					'url' : function (node) {
						return mikan.tree.url.tree;
					},
					'data' : function (node) {
						return { };
					}
				}
			},
			"types" : {
				"#" : { "max_children" : 1, "max_depth" : 4, "valid_children" : ["root"] },
				"file" : { "icon" : "glyphicon glyphicon-file", "valid_children" : [] }
			},
			"plugins" : [ "state", "types" ]
		});
};

mikan.tree.thumbnail = function(title, id, list) {
	if (list == undefined) list = false;
	
	$(mikan.tree.id.title).html(title);
	$(mikan.tree.id.list).html('<img src="' + MIKAN_IMAGE_ROOT + 'loading.gif" alt="' + mikan.resource.LOADING + '" />' + mikan.resource.LOADING);

	var items = mikan.json.load(mikan.tree.url.list + id);
	var h = "";
	if (items) {
		base_url = items['url'];

		if (mikan.tree.thumbnails.list) {
			h = h + '<ul class="media-list">';
		}
		for ( name in items['nodes'] ){
			a = items['nodes'][name]
			name = a['file'];
			size = a['size'];
			d = a['time'];
			thumbnail = base_url + '/thumbnail/'+ name;
			path = base_url + '/'+ name;
			if (!mikan.tree.thumbnails.list) {
				h = h + '<div class="col-xs-2 col-md-2"><a href="' + path + '" title="' + name + '" target="image" class="colorbox1 thumbnail"><img src="' + thumbnail + '" alt="' + name + '" /></a></div>';
			} else {
				h = h + '<li class="media"><a class="pull-left" href="' + path + '" title="' + name + '" target="image" class="colorbox1 thumbnail"><img class="media-object" src="' + thumbnail + '" alt="' + name + '" /></a>';
				h = h + '<div class="media-body">';
				h = h + '<h4 class="media-heading">' + name + '</h4>';
				h = h + '<p>' + d + ' ' + size + '</p>';
				h = h + '</div>';
			}
  		}
		if (mikan.tree.thumbnails.list) {
			h = h + '</ul>';
		}
	}
	$(mikan.tree.id.list).html(h);
	$(".colorbox1").colorbox({rel:"colorbox1", transition:"none", width:"90%", height:"90%"});
};

mikan.tree.item = function(title, id) {
	$(mikan.tree.id.title).html(title);

	var h = '<a href="./' + id + '/" title="' + title + '">' + title + '管理画面へ</a>';
	$(mikan.tree.id.list).html(h);
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
