'use strict'

import autoprefixer from 'gulp-autoprefixer'
import browserSync  from 'browser-sync'
import config       from '../config'
import cssimport    from 'gulp-cssimport'
import gulp         from 'gulp'
import gulpif       from 'gulp-if'
import handleError  from '../helpers/handle-error'
import sass         from 'gulp-sass'
import nano         from 'gulp-cssnano'
import sourcemaps   from 'gulp-sourcemaps'

gulp.task( 'styles:compile', [ 'iconfont:build' ], function() {
  var sourceMaps   = !global.isProduction && !!config.settings.sourceMaps
  var minifyStyles = global.isProduction || config.settings.minify

  return gulp.src( config.sources.styles.build, { base: config.sources.styles.root } )
    .pipe( gulpif( sourceMaps, sourcemaps.init() ) )
    .pipe( sass() )
    .pipe( cssimport() )
    .on( 'error', handleError )
    .pipe( autoprefixer( config.settings.autoprefixer ) )
    .pipe( gulpif( minifyStyles, nano() ) )
    .pipe( gulpif( sourceMaps, sourcemaps.write( './' ) ) )
    .pipe( gulp.dest( config.destinations.styles ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( {
      stream: true,
      match: '**/*.css'
    } ) ) )
} )

gulp.task( 'styles:watch', [ 'styles:build' ], function() {
  gulp.watch( config.sources.styles.glob, [ 'styles:compile' ] )
} )
gulp.task( 'styles:build', [ 'styles:compile' ] )
