module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			add_banner: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					report: 'min'
				},
				files: {
					'site/css/output.min.css': ['site/css/lib/perfect-scrollbar.css','site/css/style.css']
				}
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'site/js/models/*.js',
					'site/js/collections/*.js',
					'site/js/views/*.js',
					'site/js/routers/*.js',
					'site/js/app.js'
				],
				dest: 'site/js/main.js'
			}
		},
		uglify: {
			minify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
					report: 'min'
				},
				files: {
					'site/js/lib.min.js': [
						'site/js/lib/*.js'
					],
					'site/js/main.min.js': [
						'site/js/main.js'
					]
				}
			}
		},
		jshint: {
			all: [
				'site/js/models/*.js',
				'site/js/collections/*.js',
				'site/js/views/*.js',
				'site/js/routers/*.js',
				'site/js/app.js'
			]
		}
	});

	// Load the plugin that provides the "cssmin" task.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	// Default task(s).
	grunt.registerTask('default', ['cssmin', 'concat', 'uglify']);

};
