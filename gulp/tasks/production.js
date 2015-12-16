'use strict'

import gulp from 'gulp'
import run  from 'run-sequence'

gulp.task( 'prod', [ 'clean' ], function( callback ) {

  global.isProduction = true

  // Note: this is a temp solution until gulp 4.* is released
  run( [ 'assets:build', 'lint:build', 'scripts:build', 'styles:build', 'templates:build', 'tests:build' ], callback )

} )
