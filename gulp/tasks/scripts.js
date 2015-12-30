'use strict'

import babelify    from 'babelify'
import browserSync from 'browser-sync'
import browserify  from 'browserify'
import buffer      from 'vinyl-buffer'
import config      from '../config'
import eventStream from 'event-stream'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import handleError from '../helpers/handle-error'
import jadeify     from 'jadeify'
import ngAnnotate  from 'browserify-ngannotate'
import path        from 'path'
import source      from 'vinyl-source-stream'
import sourcemaps  from 'gulp-sourcemaps'
import uglify      from 'gulp-uglify'
import util        from 'gulp-util'
import watchify    from 'watchify'

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
gulp.task( 'scripts:build', function() {
  return buildBundles( config.sources.scripts.build, false )
} )

gulp.task( 'scripts:watch', function() {
  return buildBundles( config.sources.scripts.build, true )
} )
