var chalk   = require('chalk'),
    nodemon = require('gulp-nodemon')

module.exports = (options) => {

  var gulp       = options.gulp,
      livereload = options.livereload

  gulp.task('watch', ['build'], () => {
    livereload.listen()

    gulp.watch('**/*.hbs', ['watch-handlebars'])
    gulp.watch('**/*.styl', ['stylus'])
    gulp.watch('public/**').on('change', livereload.changed)

    nodemon({
      env: {'NODE_ENV': 'development'},
      ext: 'hbs js',
      ignore: ['*.css', '*.styl'],
      //nodeArgs: ['--debug'],
      script: 'index.js'})
      //.on('change', ['lint'])
      .on('restart', function () {

        var files = arguments[0]

        files.forEach( (file) => {
          file = file.replace(process.cwd(), '') // Just show relative file path.

          console.log('File changed:', chalk.yellow(file))
        })

      })

  })

}
