module.exports = function(grunt) {

  // grunt.initConfig({
  //   pkg: grunt.file.readJSON('package.json'),
  //   coffee: {
  //     app: {
  //       src: ["coffee/app.coffee"],
  //       dest: "js/",
  //       options: {
  //         bare: true
  //       }
  //     }
  //   },
  //   compass: {
  //     dist: {
  //       options: {
  //         sassDir: 'sass',
  //         cssDir: 'assets/',
  //         imagesDir: '/img',
  //         relativeAssets: true,
  //         noLineComments: true,
  //         environment: 'production'
  //       }
  //     },
  //     dev: {
  //       options: {
  //         sassDir: 'sass',
  //         cssDir: 'assets/',
  //         imagesDir: '/img',
  //         relativeAssets: true
  //       }
  //     }
  //   },
  //   watch: {
  //     coffee: {
  //       files: ["<config:coffee.app.src>"],
  //       tasks: "js"
  //     },
  //     jslibs: {
  //       files: ["_jslibs/*.js"],
  //       tasks: "js"
  //     },
  //     sass: {
  //       files: ["style/*"],
  //       tasks: "compass"
  //     }
  //   }
  // });

  // https://github.com/gruntjs/grunt-contrib-coffee
  grunt.loadNpmTask('grunt-contrib-coffee');
  // https://github.com/gruntjs/grunt-contrib-compass
  grunt.loadNpmTask('grunt-contrib-compass');

  grunt.registerTask('default', ['compass', 'js']);
  grunt.registerTask('js', 'coffee');
  grunt.registerTask('uploadjs', 'js')
};
