module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    
    pkg: '<json:package.json>',

    lint: {
      files: ['grunt.js', 'src/**/*.js']
    },

    watch: {
      files: ['grunt.js', 'src/**/*.js', 'tests/**/*.js'],
      tasks: 'test'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },

      globals: {
        exports: true,
        window: true,
        define: true,
        describe: true,
        expect: true,
        it: true
      }
    },

    mochaTest: {
      development: [
        'src/**/*.js',

        'tests/tests-node-setup.js',
        'tests/**/*.integration.js',
        'tests/**/*.unit.js'
      ]
    },

    mochaTestConfig: {
      options: {
        reporter: 'min',
        globals: 'define'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', 'lint mochaTest:development');
  grunt.registerTask('build', 'lint min');
  grunt.registerTask('default', 'watch');

};