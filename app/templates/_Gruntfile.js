'use strict';

module.exports = function (grunt) {
	grunt.initConfig({

		notify: {
			build: {
				options: {
					title: 'Build Completed',
					message: 'PDF generated on pdf directory'
				}
			}<% if (ftpEnabled) { %>,
      upload: {
        options: {
          title: 'Upload Completed',
          message: 'PDF uploaded to FTP sites'
        }
      }
      <% } %>
		},

		watch: {
			grunt: {
			    files: ['Gruntfile.js'],
          tasks: ['connect:server']
			},
			scss: {
				files: ['src/scss/{,*/}*.scss'],
				tasks: ['sass'],
				options: {
					livereload: false
				}
			},
			css: {
				files: ['src/css/*.css'],
				options: {
					livereload: true
				}
			},
			markdown: {
				files: ['md/**/*.md'],
				tasks: ['markdown'],
				options: {
					livereload: false
				}
			},
			html: {
				files: ['html/**/*.html'],
				options: {
					livereload: true
				}
			},
			template: {
				files: ['src/template/template.html'],
				tasks: ['markdown'],
				options: {
					livereload: true
				}
			}
		},

		sass: {
			work : {
				files: {'src/css/style.css': 'src/scss/style.scss'},
				options: {
					outputStyle: 'nested',
					sourceComments: 'map',
					sourceMap: 'src/css/style.css.map'
				},
			},
			build : {
				files: {'src/css/style.css': 'src/scss/style.scss'},
				options: {
					outputStyle: 'compressed'
				},
			}
		},

		markdownpdf: {
			options: {
				paperFormat: 'A4',
				paperBorder: '15mm',
				renderDelay: 6000,
				cssPath: '../../../../../src/css/style.css',
			},
			files: {
				src: 'md/**/*.md',
				dest: 'pdf'
			}
		},

		markdown: {
			options: {
				template: 'src/template/template.html',
				markdownOptions: {
					gfm: true,
					highlight: 'manual'
				}
			},
			files: {
				cwd: 'md',
				expand: true,
				filter: 'isFile',
				src: '*.md',
				dest: 'html/',
				ext: '.html'
			}
		},

    connect: {
      server: {
        options: {
          port: 9001,
          base: ['src', 'html'],
          livereload: true,
          open: true
        }
      }
    },

    <% if (ftpEnabled) { %>
    ftpush: {
      upload: {
        host: '<%= ftpHostAddr %>',
        port: 21,
        authKey: 'default'
      },
      src: 'pdf/',
      dest: '<%= ftpServerDest %>',
      exclusions: ['pdf/**/.DS_Store', 'pdf/**/Thumbs.db', 'pdf/**/.gitignore'],
      simple: false,
      useList: false
    },
    <% } %>

		clean: {
			work: {
				files: [{
					dot: true,
					src: [
						'src/css/*.map',
						'src/css/*.css',
						'html/*.html'
					]
				}]
			},
			build: {
				files: [{
					dot: true,
					src: [
						'src/css/*.map',
						'src/css/*.css',
						'pdf/*.pdf'
					]
				}]
			}
		}

	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('work', 'Work on this project', [
		'clean:work',
		'sass:work',
		'markdown',
    'connect:server',
		'watch'
	]);

	grunt.registerTask('build', 'Build PDF from Source', [
		'clean:build',
		'sass:build',
		'markdownpdf',
		'notify:build'
	]);

  <% if (ftpEnabled) { %>
  grunt.registerTask('push', 'Push generated files to FTP', function () {
    grunt.task.run('build');
    grunt.task.run('ftpush:upload');
    grunt.task.run('notify:upload');
  });
  <% } %>

	grunt.registerTask('default', ['build']);
}
