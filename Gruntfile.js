module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	require('jit-grunt')(grunt);

	var jss = new Array(
		'mikan.js',
		'mikan.const.js',
		'mikan.resource.js',
		'mikan.util.js',
		'mikan.action.js',
		'mikan.json.js',
		'mikan.html.js',
		'mikan.dialog.js',
		'mikan.form.js',
		'mikan.canvas.js',
		'mikan.media.js',
		'mikan.page.js'
	);

	var mikan_js_root = "dist/js/mikan/";

	for (var js in jss) {
		jss[js] = [mikan_js_root + jss[js]];
	}

	var csss = new Array(
		'mikan.ui.css',
		'mikan.bootstrap.css'
	);

	var mikan_css_root = "dist/css/mikan/";

	for (var css in csss) {
		csss[css] = [mikan_css_root + csss[css]];
	}

	grunt.config.init({
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			target: [
				"dist/js/mikan/mikan.*.js",
				"!dist/js/mikan/mikan.min.js"
			]

		},
		concat: {
			mikan: {
				src: ['dist/less/mikan.less', 'dist/less/bootstrap.less'],
				dest: 'dist/less/_mikan.less'
			},
			etc: {
				src: ['dist/less/<%= grunt.task.current.args[0] %>.less', 'dist/less/bootstrap.less'],
				dest: 'dist/less/_<%= grunt.task.current.args[0] %>.less'
			}
		},
		less: {
			mikan: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'mikan.css.map',
					sourceMapFilename: 'dist/css/theme/mikan.css.map'
				},
				src: 'dist/less/_mikan.less',
				dest: 'dist/css/theme/mikan.css'
			},
			etc: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= grunt.task.current.args[0] %>.css.map',
					sourceMapFilename: 'dist/css/theme/<%= grunt.task.current.args[0] %>.css.map'
				},
				src: 'dist/less/_<%= grunt.task.current.args[0] %>.less',
				dest: 'dist/css/theme/<%= grunt.task.current.args[0] %>.css'
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				banner: '/*\n * mikan.js JavaScript Web Library\n *  JavaScript Module\n *\n * Copyright (C) 1997-2016 K.Sonohara All Rights Reserved.\n *   Deploy by ExpertSoftware Inc.\n *  *   配布: 株式会社エキスパートソフトウェア\n *\n * Code released under [Mozilla Public License, version 2.0]\n *   https://github.com/ksonohara/mikan_js/blob/master/LICENSE)\n *\n * https://github.com/ksonohara/mikan_js/\n * https://www.e-software.company/\n */\n'
			},
			target: {
				files: {
					'dist/css/mikan/mikan.min.css': [csss]
				}
			}
		},
		jsbeautifier: {
			gruntfile: {
				src: [
					"Gruntfile.js",
					"package.json",
					"eslint.json"
				]
			},
			css: {
				src: [
					"dist/css/mikan/mikan.*.css",
					"!dist/css/mikan/mikan.min.css"
				]
			},
			js: {
				src: [
					"dist/js/mikan/mikan*.js",
					"!dist/js/mikan/mikan.min.js"
				]
			},
			options: {
				css: {
					indentChar: "	",
					indentSize: 1
				},
				js: {
					indentChar: "	",
					indentSize: 1
				}
			}
		},
		uglify: {
			options: {
				banner: '/*\n * mikan.js JavaScript Web Library\n *  JavaScript Module\n *\n * Copyright (C) 1997-2016 K.Sonohara All Rights Reserved.\n *   Deploy by ExpertSoftware Inc.\n *  *   配布: 株式会社エキスパートソフトウェア\n *\n * Code released under [Mozilla Public License, version 2.0]\n *   https://github.com/ksonohara/mikan_js/blob/master/LICENSE)\n *\n * https://github.com/ksonohara/mikan_js/\n * https://www.e-software.company/\n */\nvar MIKAN_JS_MIN=1;'
			},
			build: {
				src: jss,
				dest: 'dist/js/mikan/mikan.min.js'
			}
		},
		postcss: {
			options: {
				map: true,
				remove: false,
				processors: [
					require('autoprefixer-core')({
						browsers: 'last 3 version'
					}),
					require('csswring')
				]
			},
			dist: {
				//				src: 'dist/css/mikan/*.css'
			}
		}
	});

	grunt.registerTask('build', ['concat:mikan', 'less:mikan', 'uglify', 'jsbeautifier', 'cssmin']);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('css', 'build', function(arg1) {
		grunt.task.run('concat:etc:' + arg1);
		grunt.task.run('less:etc:' + arg1);
	});
};
