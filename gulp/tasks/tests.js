'use strict'

import config      from '../config'
import gulp        from 'gulp'
import handleError from '../helpers/handle-error'
import karma       from 'karma'

var done
var server

gulp.task( 'mocha:build', function() {
  return gulp.src( [ config.sources.tests.glob ], { read: false } )
    .pipe( mocha( { reporter: 'list' } ) )
    .on( 'error', handleError )
} )

gulp.task( 'mocha:watch', function() {
  gulp.watch( [ config.sources.scripts.glob, config.sources.tests.glob ], [ 'mocha:build' ] )
} )

gulp.task( 'karma:build', function() {
  // Run tests once and exit
  config.sources.tests.karma.singleRun = true
  server = new karma.Server( config.sources.tests.karma, done )
  server.start()
  return done
} )

gulp.task( 'karma:watch', function() {
  // Disable the coverage reporter while we're watching
  config.sources.tests.karma.coverageReporter = {}
  config.sources.tests.karma.coverageReporter.reporters = []
  config.sources.tests.karma.preprocessors = {}
  server = new karma.Server( config.sources.tests.karma, done )
  server.start()
  return done
} )



gulp.task( 'tests:build', [ /*'mocha:build',*/ 'karma:build' ] )
gulp.task( 'tests:watch', [ /*'mocha:watch',*/ 'karma:watch' ] )
