'use strict'

import config from '../config'
import eslint from 'gulp-eslint'
import gulp   from 'gulp'

let scriptsPath = config.sources.scripts.glob
let gulpPath    = config.gulpPath + '/**/*.js'

function lint( src, formatter = 'stylish' ) {
  return gulp.src( src )
    .pipe( eslint() )
    .pipe( eslint.format( formatter ) )
}

gulp.task( 'lint:scripts', function() {
  return lint( scriptsPath )
} )
gulp.task( 'lint:gulp', function() {
  return lint( gulpPath )
} )

gulp.task( 'lint:build', [ 'lint:scripts', 'lint:gulp' ] )

gulp.task( 'lint:watch', function() {
  gulp.watch( [ scriptsPath, gulpPath ], [ 'lint:build' ] )
} )
