module.exports = function(grunt) {
    // Project configuration.
	require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // JavaScript Stuff
        uglify: {
            build: {
                src: ['js/plugins/*.js', 'js/global.js'],
                //input
                dest: 'js/build/prime.min.js' //output
            }
        },

        // SASS & CSS stuff
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    'css/main.css': 'scss/main.scss',
                    // 'destination': 'source'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'css/main.css',
                dest: 'css/main.prefixed.css'
            },
        },
        cssmin: {
            minify: {
                src: 'css/main.prefixed.css',
                dest: 'css/main.min.css',
            }
        },
        // Jekyll
        jekyll: {
			server: {
				src : '.',
				dest: './_site',
				server : true,
				server_port : 8000,
				auto : true
			},
			dev: {
				src: '.',
				dest: './_site'
			},
            serve: {                            // Another target
                options: {
                    dest: '.jekyll',
                    drafts: true
                }
            }
		},

        // Images & SVG
        imagemin: { // Task
            dynamic: { // Another target
                files: [{
                    expand: true,
                    // Enable dynamic expansion
                    cwd: 'img/',
                    // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],
                    // Actual patterns to match
                    dest: 'img/dist/' // Destination path prefix
                }]
            }
        },
        svgmin: {
            options: { // Configuration that will be passed directly to SVGO
                plugins: [{
                    removeViewBox: false
                }],
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/', // Src matches are relative to this path.
                    src: ['**/*.svg'], // Actual pattern(s) to match.
                    dest: 'img/min', // Destination path prefix.
                    ext: '.min.svg' // Dest filepaths will have this extension.
        }],
      },
    },

        // Watch & Notify
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js', 'js/plugins/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['scss/*.scss', 'scss/**/*.scss' ],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                }
            },
            jekyll: {
				files: ['/*.html'],
				tasks: ['jekyll:dev']
			}
        },
        notify: {
            autoprefixer: {
                options: {
                    title: 'Autoprefixer',
                    message: 'All prefixed, sir',
                }
            },
            watch: {
                options: {
                    title: 'Task Complete',
                    // optional
                    message: 'SASS and Uglify finished running',
                    //required
                }
            },
            uglify: {
                options: {
                    title: 'Uglified',
                    message: 'U G L Y, You Ain\'t Got No Alibi.',
                }
            },
            cssmin: {
                options: {
                    title: 'Minfied',
                    message: 'CSS is all skinny now.'
                }
            }
        }
    });

    // Registered tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-remfallback');
	grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-jekyll');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'sass', 'autoprefixer', 'cssmin', 'svgmin']);
    grunt.registerTask('dev', ['watch', 'notify:uglify', 'notify:autoprefixer', 'notify:cssmin', 'notify:watch']);
};
