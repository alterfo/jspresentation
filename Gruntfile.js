var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port: LIVERELOAD_PORT
});

var livereloadMiddleware = function(connect, options) {
    return [
        lrSnippet,
        connect.static(options.base),
        connect.directory(options.base)
    ];
};


module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Configure Grunt 
    grunt.initConfig({

        connect: {
            client: {
                options: {
                    port: 9000,
                    base: 'slides',
                    middleware: livereloadMiddleware
                }
            }
        },



        watch: {
            client: {

                files: ['slides/**/*'],

                tasks: [],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        }
    });

    grunt.registerTask('default', ['connect:client', 'watch:client']);

};