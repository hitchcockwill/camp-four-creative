module.exports = function(grunt) {
  // set up grunt

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Coffeescript compile
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    variables: {
      site: '_site'
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          base: [
            '<%= variables.site %>'
          ]
        }
      }
    },


    coffee: {
      compile: {
        expand: true,
        cwd: 'coffee/',
        src: ['*.coffee'],
        dest: 'javascripts/',
        ext: '.js'
      }
    },

    watch: {
      coffee: {
        files: ['coffee/*.coffee'],
        tasks: ['newer:coffee', 'jekyll']
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:base', 'newer:sass:sections', 'jekyll']
      },
      html: {
        files: ['./**/*.html', './img/**/*', '!**./_site/**/*.html**'],
        tasks: ['jekyll']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'coffee',
        'sass:base',
        'sass:sections'
      ]
    },

    sass: {
      base: {
        expand: true,
        cwd: 'scss/',
        src: ['base.scss'],
        dest: 'css/',
        ext: '.css'
      },
      sections: {
        expand: true,
        cwd: 'scss/sections',
        src: ['*.scss'],
        dest: 'css/sections',
        ext: '.css'
      }
    },

    jekyll: {
      options: {
        src: '.'
      },
      serve: {
        options: {
          dest: './_site'
        }
      }
    },

    uglify: {
      production: {
        files: [
          {src: ['javascripts/libs/**/*.js'], dest: 'javascripts/min/lib.min.js'},
          {src: 'javascripts/*.js', dest: 'javascripts/min/scripts.min.js'}
        ]
      }
    }
  });

  grunt.registerTask('default', ['compile', 'watch']);

  grunt.registerTask('serve', [
    'connect',
    'compile',
    'watch'
  ]);

  grunt.registerTask('compile', ['concurrent:server', 'jekyll']);
  grunt.registerTask('production', ['coffee', 'sass', 'uglify']);
};