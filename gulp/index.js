'use strict'

// import config from './config'
import fs     from 'fs'
import gulp   from 'gulp'

// loop tasks folder
fs.readdirSync( './gulp/tasks/' ).forEach( function( task ) {
  require( './tasks/' + task )
} )

// Default task
gulp.task( 'default', [ 'dev' ] )
