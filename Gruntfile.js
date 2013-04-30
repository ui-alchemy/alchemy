'use strict';


var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    demo: 'demo',
    dist: 'dist',
    component: require('./dist/component.json').name
  };

  try {
    yeomanConfig.demo = require('./dist/component.json').demoPath || yeomanConfig.demo;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      compass: {
        files: ['demo/styles/{,*/}*.{scss,sass}', 'component/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      templates: {
        files: ['component/templates/*.html', 'demo/views/*.html']
      },
      livereload: {
        files: [
          'demo/{,*/}*.html',
          'component/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'demo/styles/{,*/}*.scss',
          'demo/scripts/{,*/}*.js',
          'component/scripts/{,*/}*.js',
          'demo/images/{,*/}*.{png,jpg,jpeg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: '0.0.0.0',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, ''),
              mountFolder(connect, yeomanConfig.demo)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, 'component')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:3501'
      }
    },
    clean: {
      dist: ['.tmp', 'dist/*.js', 'dist/*.scss', 'dist/*.css'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'component/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      ci: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS', 'Firefox']
      }
    },
    compass: {
      options: {
        sassDir: './',
        cssDir: '.tmp/styles',
        imagesDir: 'demo/images',
        javascriptsDir: 'demo/scripts',
        fontsDir: 'demo/styles/fonts',
        importPath: ['demo/components', 'component/styles'],
        relativeAssets: true
      },
      dist: {
        files: {
          'dist/<%= yeoman.component %>.scss' : [
            'component/styles/**/*.scss'
          ]
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    ngtemplates: {
      build: {
        options: {
          base: 'component/templates',
          prepend: 'component/templates/',
          module: 'alch-templates'
        },
        src: ['component/templates/*.html'],
        dest: '.tmp/templates/<%= yeoman.component %>.templates.js'
      }
    },
    concat: {
      dist: {
        files: {
          'dist/<%= yeoman.component %>.js': [
            '.tmp/templates/*.js', //must be first
            'component/scripts/**/*.js'
          ],
          'dist/media_object.css': [
            '.tmp/styles/media_object.css'
          ],
          'dist/normalize.css': [
            '.tmp/styles/normalize.css'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'demo/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'demo/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/<%= yeoman.component %>.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: 'demo',
          src: ['*.html', 'views/*.html'],
          dest: 'dist'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['dist/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/scripts',
          src: '*.js',
          dest: 'dist/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= yeoman.component %>.min.js': [
            'dist/*.js'
          ],
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'demo',
          dest: 'dist',
          src: [
            '*.{ico,txt}',
            '*.{ico,txt}'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: 'component/styles',
          dest: 'dist',
          src: [
            './**/*.scss'
          ]
        }]
      }
    },
    release: {}
  });

  grunt.registerTask('release', 'Creates a release branch based off of the dist directory.', function() {
    var options = this.options({
          dist: 'dist',
          release_branch: 'release',
          pull: true
        }),

        shell = 'shell',
        prefix = 'release_component_',
        
        checkVersionExists = {
          options: {
            callback: function(err, out, stderr, cb) {
              var version = grunt.file.readJSON('dist/component.json').version;

              if (out.indexOf(version) !==  -1) {
                grunt.fail.fatal('The version you are trying to create a release for already exists. Please bump dist/component.json, commit and try again.')
              } else {
                cb();
              }
            }
          },

          command: 'git tag'
        },
        
        deleteBranch = {
            options: {
                callback: function(err, out, stderr, cb) {
                    grunt.log.writeln('Deleting release branch');

                    cb();
                }
            },

            command: 'git branch -D release'
        },

        subtreeDist = {
          options: {
            callback: function(err, out, stderr, cb) {
              grunt.log.writeln('Generating release branch via "git subtree" of dist/ directorl.warn(error [, errorcode])y.');
              grunt.log.writeln(out);

              cb();
            }
          },

          command: 'git subtree split --prefix dist/ --branch release'
        },

        tagRelease = {
          options: {
            stderr: true,
            stdout: true
          },

          command: (function() {
            var version = grunt.file.readJSON('dist/component.json').version;

            return 'git checkout release && git tag ' + version;
          }())
        },

        finish =  {
          options: {
            stderr: true,
            stdout: true
          },

          command: 'git push alchemy release --force && git push --tags'
        };

    grunt.log.writeln(JSON.stringify(options));

    // dynamically create desired shell tasks
    grunt.config.set('shell.' + prefix + 'checkVersionExists', checkVersionExists);
    grunt.config.set('shell.' + prefix + 'deleteBranch', deleteBranch);
    grunt.config.set('shell.' + prefix + 'subtreeDist', subtreeDist);
    grunt.config.set('shell.' + prefix + 'tagRelease', tagRelease);
    grunt.config.set('shell.' + prefix + 'finish', finish);

    // run created shell tasks
    grunt.task.run([
      'shell:' + prefix + 'checkVersionExists',
      'shell:' + prefix + 'deleteBranch',
      'shell:' + prefix + 'subtreeDist',
      'shell:' + prefix + 'tagRelease',
      'shell:' + prefix + 'finish'
    ]);
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', [
    'clean:server',
    'compass:server',
    'ngtemplates',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', function(arg1){
    var task_list = [
      'clean:server',
      'compass',
      'ngtemplates',
      'connect:test'
    ];

    if (arg1 === 'ci') {
      task_list.push('karma:ci');
    } else {
      task_list.push('karma:unit');
    }

    grunt.task.run(task_list);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'compass:dist',
    'ngtemplates',
    //'useminPrepare',
    //'imagemin',
    //'cssmin',
    'concat',
    'copy',
    //'cdnify',
    //'usemin',
    'ngmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['build']);
};
