module.exports = function(grunt) {
  // set up grunt

  // Coffeescript compile
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'javascripts/base.js': 'coffee/*.coffee'
        }
      }
    },

    watch: {
      coffee: {
        files: ['/coffee/*.coffee'],
        tasks: ['default']        
      },
      sass: {
        files: ['/scss/*.scss'],
        tasks: ['default']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'css/base.css': 'scss/base.scss'
        }
      }
    }
  }); 
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['coffee', 'sass']);
};