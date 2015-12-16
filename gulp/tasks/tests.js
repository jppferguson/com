'use strict'

import config      from '../config'
import gulp        from 'gulp'
import handleError from '../helpers/handle-error'
import mocha       from 'gulp-mocha'

gulp.task( 'mocha:build', function() {
  return gulp.src( [ config.sources.tests.glob ], { read: false } )
    .pipe( mocha( { reporter: 'list' } ) )
    .on( 'error', handleError )
} )

gulp.task( 'mocha:watch', function() {
  gulp.watch( [ config.sources.scripts.glob, config.sources.tests.glob ], [ 'mocha:build' ] )
} )

gulp.task( 'tests:build', [ 'mocha:build' ] )
gulp.task( 'tests:watch', [ 'mocha:watch' ] )
