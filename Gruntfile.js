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
        tasks: ['newer:coffee']
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['newer:sass']
      }
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

    uglify: {
      production: {
        files: [
          {src: ['javascripts/libs/**/*.js'], dest: 'javascripts/min/lib.min.js'},
          {src: 'javascripts/*.js', dest: 'javascripts/min/scripts.min.js'}
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['compile', 'watch']);
  grunt.registerTask('compile', ['coffee', 'sass']);
  grunt.registerTask('production', ['coffee', 'sass', 'uglify']);
};