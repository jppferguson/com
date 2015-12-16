'use strict'

import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import jade        from 'gulp-jade'
import handleError from '../helpers/handle-error'

gulp.task( 'templates:build', function() {
  return gulp.src( config.sources.templates.build, { base: config.sources.templates.root } )
    .pipe( jade( {
      pretty: true
    } ) )
    .on( 'error', handleError )
    .pipe( gulp.dest( config.destinations.root ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true } ) ) )
} )

gulp.task( 'templates:watch', [ 'templates:build' ], function() {
  gulp.watch( config.sources.templates.watch, { base: config.sources.templates.root }, [ 'templates:build' ] )
} )
