module.exports = function(grunt) {
  // set up grunt

  // Coffeescript compile
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
        tasks: ['coffee']
      },
      compass: {
        files: ['scss/**/*.scss'],
        tasks: ['compass']
      }
    },

    compass: {
      base: {
        options: {
          sassDir: 'scss',
          specify: 'scss/base.scss',
          cssDir: 'css'
        }
      },
      sections: {
        options: {
          sassDir: 'scss/sections',
          cssDir: 'css/sections'
        }
      }
    },

    uglify: {
      production: {
        files: [
          {src: ['javascripts/libs/categorizr.js'], dest: 'javascripts/min/lib.min.js'},
          {src: 'javascripts/*.js', dest: 'javascripts/min/scripts.min.js'}
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['compile', 'watch']);
  grunt.registerTask('compile', ['coffee', 'compass']);
  grunt.registerTask('production', ['coffee', 'compass', 'uglify']);
};