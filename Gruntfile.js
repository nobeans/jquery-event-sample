module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            my_target: {
              files: [{
                  expand: true,
                  cwd: 'src/js',
                  src: '**/*.js',
                  dest: 'dest/js'
              }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html_files: {
                files: 'dest/*.html'
            },
            scripts: {
                files: ['src/js/*.js', 'src/html/*.html'],
                tasks: ['uglify', 'htmlmin']
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'dest'
                }
            }
        },
        htmlmin: {
          all: {
            options: {
              removeComments: true,
              removeCommentsFromCDATA: true,
              removeCDATASectionsFromCDATA: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              removeOptionalTags: true
            },
            expand: true,
            cwd: 'src/html/',
            src: ['**/*.html'],
            dest: 'dest/'
          }
        }
    });

    // プラグインを使用するときにタスクを読み込む記述を追加
    // grunt.loadNpmTasks('');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // デフォルトタスクなどのタスク名を設定
    grunt.registerTask('default', ['uglify', 'htmlmin', 'watch']);
    grunt.registerTask('cowatch', ['connect', 'watch']);
}
