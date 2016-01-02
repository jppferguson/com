'use strict'

import config      from '../config'
import gulp        from 'gulp'
// import handleError from '../helpers/handle-error'
import karma       from 'karma'

var done
var server

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


gulp.task( 'tests:build', [ 'karma:build' ] )
gulp.task( 'tests:watch', [ 'karma:watch' ] )
