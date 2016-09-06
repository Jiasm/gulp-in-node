
    const gulp = require('../../node_modules/gulp')
    const flatten = require('../../node_modules/gulp-flatten')
    const babel = require('../../node_modules/gulp-babel')

    gulp.task('default', () =>
      gulp.src('test.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(flatten())
      .pipe(gulp.dest('./'))

    )
  