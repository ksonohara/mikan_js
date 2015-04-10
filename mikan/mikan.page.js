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
mikan.page = {};
mikan.page.onload = null;
mikan.page.onloads = {};
mikan.page.url = {};
mikan.page.url.wsgi = MIKAN_CGI_ROOT;
mikan.page.url.js = MIKAN_JS_ROOT;
mikan.page.url.image = MIKAN_IMAGE_ROOT;
mikan.page.url.htdocs = MIKAN_HTDOCS_ROOT;
mikan.page.book = {};
mikan.page.book.current = null;


/* ---------------------------------------------------------------------------------------------
 *  Function Section
 * --------------------------------------------------------------------------------------------- */
mikan.page.load = function() {
	try {
		mikan.form.tooltip();
	} catch(e) {
	}

	try {
		$(".colorbox").colorbox({
			width: "80%",
			height: "80%",
			rel:'colorbox',
		});
	} catch(e) {
	}
	if (mikan.page.onload) {
		mikan.page.onload();
	}
	for(var l in mikan.page.onloads) {
		try {
			mikan.page.onloads[l]();
		} catch(e) {
			console.log(e);
		}
	}

	mikan.page.load_sidemenu();

	$(window).bind("load resize", mikan.page.load_resize);

	try {
		$("#page_loading").fadeOut("fast");
	} catch(e) {
	}
	try {
		$("#page_main").fadeIn("slow");
	} catch(e) {
	}
			$('div.navbar-collapse').addClass('collapse');
};

mikan.page.unload = function() {
};

mikan.page.back = function() {
	history.back();
};

mikan.page.showbook = function(id) {
	if (mikan.page.book.current != null) {
		try {
			$(mikan.page.book.current).addClass('hidden').hide();
		} catch(e) {
		}
	} else {
		try {
			$("#summary_jumbotron").addClass('hidden').hide();
		} catch(e) {
		}
	}
	if (id == null) {
		$("#summary_jumbotron").removeClass('hidden').show();
	} else {
		$(id).removeClass('hidden').show();
	}

	mikan.page.book.current = id;
	try {
		mikan.page.setfooterid();
	} catch(e) {
	}
};
mikan.page.load_sidemenu = function() {
	try {
		$("#side-menu").metisMenu({
			toggle: true
		});
	} catch(e) {
	}

	mikan.page.load_resize();
};
mikan.page.load_resize = function() {
	try {
		mikan.log(window.innerWidth);
		topOffset = 50;
		width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if (width < 768) {
			$('div.navbar-collapse').addClass('collapse');
			topOffset = 100; // 2-row-menu
		} else {
			$('div.navbar-collapse').removeClass('collapse');
		}

		height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
		height = height - topOffset;
		if (height < 1) height = 1;
		if (height > topOffset) {
			$("#page-wrapper").css("min-height", (height) + "px");
		}
	} catch(e) {
mikan.log(e);
	}
};

/* ---------------------------------------------------------------------------------------------
 *  Class Section
 * --------------------------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------------------------
 *  Main Section
 * --------------------------------------------------------------------------------------------- */
$(window).load(function () {
	mikan.page.load();
});
