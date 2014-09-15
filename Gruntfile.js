module.exports = function(grunt) {
	require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: ['src/js/plugins/*.js', 'src/js/global.js'],
                dest: 'src/js/build/global.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: true
                },
                files: {
                    'src/css/main.css': 'src/scss/main.scss',
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'src/css/main.css',
                dest: 'src/css/main.prefixed.css'
            },
        },
        cssmin: {
            minify: {
                src: 'src/css/main.prefixed.css',
                dest: 'src/css/main.min.css',
            }
        },
		shell: {
      		jekyllServe: {
        		command: "jekyll serve"
      		},
      		jekyllBuild: {
        		command: "jekyll build"
      		}
		},
        connect: {
            server: {
              options: {
                port: 9001,
                base: '_site/',
				open: true,
                livereload: true
              }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img--src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'src/img/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                    livereload: 35729
                }
            },
            html: {
                files: ["*.html", "_layouts/*.html", "_posts/*.md", "_projects/*.md", "_includes/*.html"],
                tasks: ['shell:jekyllBuild'],
                options: { livereload: 35729 }
            },
            img: {
                files: ['src/img--src/*.**'],
                tasks: ['imagemin'],
            },
            css: {
                files: ['src/scss/*.scss','src/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'shell:jekyllBuild'],
                options: { livereload: 35729 }
            },
        },
    });

    // Loaded tasks
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-notify' );
    grunt.loadNpmTasks( 'grunt-shell' );

    // Registered task(s).
    grunt.registerTask('default', ['notify']);
    grunt.registerTask('build', ['uglify', 'sass', 'autoprefixer', 'cssmin', 'shell:jekyllBuild', 'imagemin']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
