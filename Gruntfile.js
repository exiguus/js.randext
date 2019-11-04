/*
 * Gruntfile.js
 */

'use strict';
let config = require('./build/helper/config');
config.options.pkg = require('./package.json');

module.exports = function(grunt) {
  // load only used tasks and add fallbacks for those which cannot be find
  require('jit-grunt')(grunt, {
    'replace': 'grunt-text-replace',
    'usebanner': 'grunt-banner',
    'comments': 'grunt-stripcomments',
    'strip_code': 'grunt-strip-code',
  });
  // measures the time each task takes
  require('time-grunt')(grunt);

  // Load grunt configurations automatically
  let configs = require('load-grunt-configs')(grunt, config.options);

  // Define the configuration for all the tasks
  grunt.initConfig(configs);

  /*
   * TASKS
   */

   grunt.registerTask('coverage', [
     'copy:coverage',
     'copy:icov',
   ]);

  grunt.registerTask('build', [
    'eslint',
    //'babel',
    'webpack',
    'strip_code',
    'uglify',
  ]);

  grunt.registerTask('dist', [
    'clean',
    'build',
    'comments',
    'usebanner',
    'jsdoc',
    'copy:static',
  ]);

  grunt.registerTask('default', ['dist']);
};
