module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    includereplace: {
      dist: {
        options: {
          globals: {
            basedir: grunt.option('basedir') || '',
          },
          includesDir: 'src/_includes/'
        },
        files: [
          {src: ['**/*.html', '!_includes/**/*.html'], dest: 'dist/', expand: true, cwd: 'src/'}
        ]
      }
    },
    coffee: {
      app: {
        src: ["coffee/*.coffee"],
        dest: "dist/js/app.js",
        options: {
          bare: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'dist/css/',
          imagesDir: 'dist/img/',
          relativeAssets: true,
          noLineComments: true,
          environment: 'production'
        }
      }
    },
    copy: {
      // html: {
      //   expand: true,
      //   cwd: 'src',
      //   src: '**',
      //   dest: 'dist/'
      // },
      images: {
        src: 'img/*',
        dest: 'dist/'
      },
      javascript: {
        expand: true,
        cwd: 'vendor',
        src: '**',
        dest: 'dist/js/'
      }
    },
    clean: ['dist'],
    watch: {
      jslibs: {
        files: ["dist/vendor/*.js", "coffee/*"],
        tasks: ["js", "copy"],
        options: {
          livereload: true
        }
      },
      sass: {
        files: ["sass/*"],
        tasks: ["compass", "copy"],
        options: {
          livereload: true
        }
      },
      html: {
        files: ["src/**"],
        tasks: "includereplace",
        options: {
          livereload: true
        }
      },
      images: {
        files: ["images/*"],
        tasks: "copy",
        options: {
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          base: 'dist/',
          port: 9009
        }
      }
    }
  });

  // https://github.com/gruntjs/grunt-contrib-coffee
  grunt.loadNpmTasks('grunt-contrib-coffee');
  // https://github.com/gruntjs/grunt-contrib-compass
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-include-replace');

  grunt.registerTask('build', ['includereplace', 'compass', 'coffee', 'copy']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch'])

  grunt.registerTask('default', 'build');
};
