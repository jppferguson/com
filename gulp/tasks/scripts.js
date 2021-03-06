'use strict'

import babelify    from 'babelify'
import browserSync from 'browser-sync'
import browserify  from 'browserify'
import buffer      from 'vinyl-buffer'
import config      from '../config'
import eventStream from 'event-stream'
import fs          from 'fs'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import handleError from '../helpers/handle-error'
import jadeify     from 'jadeify'
import modernizr   from 'gulp-modernizr'
import ngAnnotate  from 'browserify-ngannotate'
import ngConstant  from 'gulp-ng-constant'
import path        from 'path'
import rename      from 'gulp-rename'
import source      from 'vinyl-source-stream'
import sourcemaps  from 'gulp-sourcemaps'
import uglify      from 'gulp-uglify'
import util        from 'gulp-util'
import watchify    from 'watchify'
import yargs       from 'yargs'

function buildBundle( filename, watch ) {
  var rebundle
  var sourceMaps = !global.isProduction && !!config.settings.sourceMaps
  var minifyBundle = global.isProduction || config.settings.minify
  var bundler = browserify( filename, {
    // basedir: __dirname,
    debug: !global.isProduction,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  } )

  // allow watching
  if ( watch ) {
    bundler = watchify( bundler )
  }

  // Do transformation tasks here
  bundler.transform( babelify )
  bundler.transform( jadeify )
  bundler.transform( ngAnnotate )

  rebundle = function() {
    return bundler.bundle()
      .on( 'error', handleError )
      .pipe( source( path.basename( filename ) ) )
      .pipe( buffer() ) // optional, remove if you don't need to buffer file contents
      .pipe( gulpif( sourceMaps,
        sourcemaps.init( {
          loadMaps: true  // loads map from browserify file
        } )
      ) )
      .pipe( gulpif( minifyBundle,
        uglify( { mangle: false } )
      ) )
      .pipe( gulpif( sourceMaps,
        sourcemaps.write( './' ) // writes .map file
      ) )
      .pipe( gulp.dest( config.destinations.scripts ) )
      .pipe( gulpif( browserSync.active,
        browserSync.reload( {
          stream: true,
          once: true
        } )
      ) )
  }

  bundler
    .on( 'update', rebundle )
    .on( 'time', function( time ) {
      util.log(
        util.colors.bgYellow.black( ' (RE)BUNDLED ' ) +
        util.colors.bgCyan.black( ' in ' + time + 'ms ' ),
        filename
      )
    } )
  return rebundle()
}

function buildBundles( glob, watch ) {
  var bundles = glob.map( function( filename ) {
    return buildBundle( filename, watch )
  } )
  return eventStream.merge.apply( null, bundles )
}

// Tasks
gulp.task( 'modernizr:build', function() {
  gulp.src( config.sources.scripts.build[0] )
    .pipe( modernizr( config.sources.scripts.modernizr ) )
    .pipe( uglify() )
    .pipe( gulp.dest( config.destinations.scripts ) )
} )

// gulp.task( 'modernizr:watch', [ 'modernizr:build' ], function() {
//   gulp.watch( config.configFile, [ 'modernizr:build' ] )
// } )


gulp.task( 'ng-config:build', function() {
  var environment = yargs.argv.env || 'development'
  gulp.src( config.sources.scripts.config + '/defaults.json' )
    .pipe( ngConstant( {
      name: 'appConfig',
      constants: fs.readFileSync( config.sources.scripts.config + '/' + environment + '.json', { encoding: 'utf-8' } ),
      wrap: 'commonjs',
      merge: true
    } ) )
    .pipe( rename( '_config.js' ) )
    .pipe( gulp.dest( config.sources.scripts.root ) )
} )

gulp.task( 'ng-config:watch', [ 'ng-config:build' ], function() {
  gulp.watch( config.sources.scripts.config + '/*.json', [ 'ng-config:build' ] )
} )

gulp.task( 'browserify:build', [ 'ng-config:build' ], function() {
  return buildBundles( config.sources.scripts.build, false )
} )

gulp.task( 'browserify:watch', function() {
  return buildBundles( config.sources.scripts.build, true )
} )

/*
 * All together now
 *******************************/

gulp.task( 'scripts:build', [ 'browserify:build', 'modernizr:build', 'ng-config:build' ] )
gulp.task( 'scripts:watch', [ 'browserify:watch', 'modernizr:build', 'ng-config:watch' ] )
