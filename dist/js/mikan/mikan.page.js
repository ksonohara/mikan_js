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
mikan.page = {};
/** @namespace */
mikan.page.consts = {};
/** @namespace */
mikan.page.vars = {};
/** @namespace */
mikan.page.event = {};

/* --------------------------------------------------------------------------
 *  Import Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Constant Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Variable Section
 * -------------------------------------------------------------------------- */
mikan.page.onload = null;
mikan.page.onloads = {};
mikan.page.book = {};
mikan.page.book.current = null;

/* --------------------------------------------------------------------------
 *  Function Section
 * -------------------------------------------------------------------------- */
mikan.page.load = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	try {
		mikan.form.tooltip();
	} catch (e) {
		//
	}

	try {
		$('.picture').mikan_dialog_picture({});
	} catch (e) {
		//
	}

	try {
		if (mikan.page.onload) {
			mikan.page.onload();
		}
	} catch (e) {
		//
	}

	try {
		if (mikan.page.onloads) {
			for (var _onload in mikan.page.onloads) {
				try {
					mikan.page.onloads[_onload]();
				} catch (e) {}
			}
		}
	} catch (e) {
		//
	}

	mikan.page.load_sidemenu();

	mikan.page.init_inview();


	try {
		$('#page_loading').fadeOut(100);
	} catch (e) {
		//
	}
	try {
		$('#page_main').fadeIn(1500);
	} catch (e) {
		//
	}

	$(window).bind('load resize', mikan.page.load_resize);

	$('div.navbar-collapse').addClass('collapse');

	mikan.page.load_mermaid();

	setTimeout(mikan.page.load_share_buttons, 100);
	setTimeout(mikan.page.load_resize, 1000);

};

mikan.page.init_inview = function() {
	if (MIKAN_DEBUG_ON) console.log([]);
	try {
		$('.inview').on('inview', function(event, isInView) {
			if (MIKAN_DEBUG_ON) console.log([event, isInView]);

			t = $(event.target);

			if (!t.hasClass('doing')) {
				if (isInView) {
					t.addClass('doing');
					setTimeout(function(t) {
						t.addClass('animated');
						t.removeClass('doing');
					}, 120, t);
					/*				} else {
										t.addClass('doing');
										setTimeout(function(t) {
											t.removeClass('animated');
											t.removeClass('doing');
										}, 120, t);
					*/
				}
			}
		});
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log([e]);
	}
};

mikan.page.unload = function() {
	if (MIKAN_DEBUG_ON) console.log([]);
	//
};

mikan.page.back = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	history.back();
};

mikan.page.showbook = function(_id, _toggle) {
	if (MIKAN_DEBUG_ON) console.log([_id, _toggle]);
	var _c = mikan.page.book.current;
	if (typeof _toggle === 'undefined') {
		_toggle = false;
	}
	if (_c == null) {
		_c = '#summary_jumbotron';
	}
	try {
		$(_c).fadeOut();
	} catch (e) {
		//
	}

	var _i = _id;
	if (_id == null) {
		_i = '#summary_jumbotron';
	}

	setTimeout(
		function(_d, _t) {
			$('body').scrollTop(0);
			if (MIKAN_DEBUG_ON) console.log(_d);

			$(_d).fadeIn('slow');
			mikan.page.load_resize();
			$(_d).removeClass('hidden');

			if (_t) {
				var _a = $('.navbar-collapse');
				_a.attr({
					'aria-expanded': 'false',
					'aria-hidden': 'true'
				});
				$(_a).removeClass('in');
				if (MIKAN_DEBUG_ON) console.log(_t);
			}

			setTimeout(
				function() {
					mikan.page.load_resize();
				}, 100
			);

			//			mikan.page.sidebar(true);
		}, 300, _i, _toggle);

	mikan.page.book.current = _id;
};
mikan.page.sidebar = function(_show) {
	if (typeof _show === 'undefined') {
		_show = false;
	}
	if (MIKAN_DEBUG_ON) console.log([_show]);

	try {
		var p = $('#page-wrapper');
		if (_show || p.hasClass('page-wrapper2')) {
			p.removeClass('page-wrapper2');
			$('.sidebar').fadeIn(100);
		} else {
			p.addClass('page-wrapper2');
			$('.sidebar').fadeOut(100);
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}

	mikan.page.load_resize();
};

mikan.page.load_share_buttons = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	try {
		$("#share_buttons").jsSocials({
			shares: ["email", "twitter", "facebook", "googleplus", "linkedin"]
		});
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}
};

mikan.page.load_mermaid = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	try {
		if (mermaid) {
			mermaid.initialize({
				startOnLoad: true
			});
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}
};

mikan.page.load_sidemenu = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	try {
		$('#side-menu').metisMenu({
			toggle: true
		});
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}
};
mikan.page.load_resize = function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	try {
		var footer = $('.footer');
		var sidebar = $('.sidebar');
		sidebar.height(window.innerheight);

		var f_height = footer.height();
		var s_height = sidebar.height();

		var width = window.innerWidth;
		if (width < 768) {
			$('div.navbar-collapse').addClass('collapse');
		} else {
			$('div.navbar-collapse').removeClass('collapse');
		}
		var header = $('#header');
		var h_height = header.height();

		var w_height = $(window).height();

		if ((s_height - h_height) < (w_height - f_height)) {
			$('#page-wrapper').css('min-height', (w_height - f_height) + 'px');
		} else {
			$('#page-wrapper').css('min-height', (s_height - h_height) + 'px');
		}
	} catch (e) {
		if (MIKAN_DEBUG_ON) console.log(e);
	}
};


mikan.page.touch_onclick = function(_id, _onclick) {
	var items = $(_id);
	items.each(function() {
		var _this = $(this);
		if (_this.attr(_onclick)) {
			//			_this.on('touchend', function(e) {
			_this.on('click', function(e) {
				eval(_this.attr(_onclick));
			});
		}
	});
};

/* --------------------------------------------------------------------------
 *  Class Section
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 *  Main Section
 * -------------------------------------------------------------------------- */
$(window).load(function() {
	if (MIKAN_DEBUG_ON) console.log([]);

	mikan.page.load();
});
