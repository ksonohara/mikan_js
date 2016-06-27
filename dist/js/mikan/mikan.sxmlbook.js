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
mikan.sxmlbook = {};
/** @namespace */
mikan.sxmlbook.vars = {};
/** @namespace */
mikan.sxmlbook.consts = {};
/** @namespace */
mikan.sxmlbook.vars.pages = [];

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

mikan.sxmlbook.init_swipe = function() {
	try {
		var page = $('#page-wrapper');
		page.hammer().bind('swipeleft', function() {
			mikan.sxmlbook.next_page();
		});
		page.hammer().bind('swiperight', function() {
			mikan.sxmlbook.back_page();
		});
	} catch (e) {}
};

mikan.sxmlbook.init_pages = function() {
	try {
		var pages = $('div.sxb_item');
		pages.each(function() {
			var _this = $(this);
			mikan.sxmlbook.vars.pages.push('#' + _this[0].id);
		});
	} catch (e) {}
};

mikan.sxmlbook.current_page = function() {
	if (mikan.page.book.current) {
		try {
			return mikan.sxmlbook.vars.pages.indexOf(mikan.page.book.current);
		} catch (e) {}
	}

	return -1;
};

mikan.sxmlbook.back_page = function() {
	try {
		index = mikan.sxmlbook.current_page() - 1;

		id = null;
		if (index < 0) {} else {
			id = mikan.sxmlbook.vars.pages[index];
		}
		mikan.page.showbook(id);
	} catch (e) {}
};

mikan.sxmlbook.next_page = function() {
	try {
		index = mikan.sxmlbook.current_page() + 1;

		id = null
		if (index < mikan.sxmlbook.vars.pages.length) {
			id = mikan.sxmlbook.vars.pages[index];
		}
		mikan.page.showbook(id);
	} catch (e) {}
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */

mikan.sxmlbook.init_pages();
mikan.sxmlbook.init_swipe();
