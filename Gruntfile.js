module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    watch: {
      scripts: {

        files: [
          'Gruntfile.js',
          'src/**/*.js',
          'tests/**/*.js',
          'tests/index.html'
        ],

        tasks: 'test'
      }
    },

    jshint: {

      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'tests/unit/**/*.js',
        'tests/integration/**/*.js'
      ],

      options: {
        newcap: false,
        node: true,
        expr: true,

        globals: {
          window: true,
          describe: true,
          define: true,
          require: true,
          expect: true,
          it: true,
          beforeEach: true,
          afterEach: true,
          MissionControl: true,
          Class: true,
          Interface: true,
          sinon: true
        }
      }

    },

    mocha: {
      test: {
        src: ['tests/index.html'],

        options: {
          run: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('default', 'watch');

};