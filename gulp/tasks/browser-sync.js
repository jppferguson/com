'use strict'

import yargs       from 'yargs'
import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import url         from 'url'
import fs          from 'fs'

gulp.task( 'browser-sync', function() {
  browserSync.init( {
    open: !!yargs.argv.open,
    notify: !!yargs.argv.notify,
    server: {
      baseDir: config.destinations.root,
      middleware: function( req, res, next ) {
        var fileName
        var fileExists
        fileName   = url.parse( req.url )
        fileName   = fileName.href.split( fileName.search ).join( '' )
        fileExists = fs.existsSync( config.destinations.root + fileName )
        if ( !fileExists && fileName.indexOf( 'browser-sync-client' ) < 0 ) {
          req.url = '/index.html'
        }
        return next()
      }
    }
  } )
} )
