'use strict'

import gulp from 'gulp'
import run  from 'run-sequence'

gulp.task( 'dev', [ 'clean' ], function( callback ) {

  global.isProduction = false

  // Note: this is a temp solution until gulp 4.* is released
  run( [ 'assets:watch', 'lint:watch', 'scripts:watch', 'styles:watch', 'templates:watch', 'tests:watch' ], 'browser-sync', callback )

} )
