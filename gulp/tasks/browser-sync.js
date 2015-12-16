'use strict'

import yargs       from 'yargs'
import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'

gulp.task( 'browser-sync', function() {
  browserSync( {
    open: !!yargs.argv.open,
    notify: !!yargs.argv.notify,
    server: {
      baseDir: config.destinations.root
    }
  } )
} )
