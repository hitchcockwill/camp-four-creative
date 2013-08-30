module.exports = function(grunt) {
  // set up grunt

  // Coffeescript compile
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'javascripts/base.js': 'coffee/base.coffee',
          'javascripts/landing.js': 'coffee/landing.coffee'
        }
      }
    },

    watch: {
      coffee: {
        files: ['coffee/*.coffee'],
        tasks: ['coffee']        
      },
      compass: {
        files: ['scss/*.scss'],
        tasks: ['compass']
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css'
        }
      }
    }
  }); 
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['coffee', 'compass']);
};