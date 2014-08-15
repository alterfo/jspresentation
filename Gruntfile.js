// Generated on 2014-07-22 using generator-revealjs 0.0.2
'use strict';
var LIVERELOAD_PORT = 8080;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        files: [
          'slides/{,*/}*.html',
		  'slides/{,*/}*.js',
          'slides/css/{,*/}*.css',
		  'slides/*.md'
        ]
      }
    },
    connect: {
      options: {
        port: 80,
        base:'slides',
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/slides/'
      }
    }
  });
 
  grunt.registerTask('default', ['connect:livereload', 'open', 'watch']);
};