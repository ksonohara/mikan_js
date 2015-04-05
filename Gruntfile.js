module.exports = function( grunt ) {
	var jss = new Array(
		"mikan.min.txt",
		"mikan.js",
		'mikan.const.js',
		'mikan.resource.js',
		'mikan.util.js',
		'mikan.html.js',
		'mikan.css.js',
		'mikan.dialog.js',
		'mikan.page.js',
		'mikan.form.js',
		'mikan.json.js',
		'mikan.admin.js',
		'mikan.report.js',
		'mikan.tree.js'
	);

	var mikan_js_src_root = "src/";
	var mikan_js_min_root = "js/mikan/mikan.min.js";

	var files ={};
	for(js in jss) {
		jss[js] = [mikan_js_src_root + jss[js]];
	}

    var pkg = grunt.file.readJSON( 'package.json' );
    grunt.initConfig( {
        concat: {
            js: {
                src: jss,
                dest: 'js/mikan/mikan.debug.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: true,
                sourceMap: true,
                preserveComments: 'some'
            },
            build: {
                src: 'js/mikan/mikan.debug.js',
                dest: 'js/mikan/mikan.min.js'
            }
        },
        clean: {
            debug: {
                src: 'js/mikan/mikan.debug.js',
            }
        },
        watch: {
            files: [ 'src/**/*.js' ],
            tasks: [ 'build' ]
        }
    } );

    var taskName;
    for ( taskName in pkg.devDependencies ) {
        if ( taskName.substring( 0, 6 ) == 'grunt-' ) {
            grunt.loadNpmTasks( taskName );
        }
    }

    grunt.registerTask( 'build', [ 'concat', 'uglify', 'clean' ] );
    grunt.registerTask( 'default', [ 'watch' ] );
};
