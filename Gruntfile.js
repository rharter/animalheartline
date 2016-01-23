module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      app: {
        src: ["coffee/app.coffee"],
        dest: "js/app.js",
        options: {
          bare: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css/',
          imagesDir: 'img/',
          relativeAssets: true,
          noLineComments: true,
          environment: 'production'
        }
      }
    },
    watch: {
      jslibs: {
        files: ["_jslibs/*.js"],
        tasks: "js"
      },
      sass: {
        files: ["style/*"],
        tasks: "compass"
      }
    }
  });

  // https://github.com/gruntjs/grunt-contrib-coffee
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // https://github.com/gruntjs/grunt-contrib-compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['compass', 'js']);
  grunt.registerTask('js', 'coffee');
  grunt.registerTask('uploadjs', 'js');
};
