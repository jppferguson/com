'use strict'

import autoprefixer from 'gulp-autoprefixer'
import browserSync  from 'browser-sync'
import config       from '../config'
import gulp         from 'gulp'
import gulpif       from 'gulp-if'
import handleError  from '../helpers/handle-error'
import sass         from 'gulp-sass'
import minify       from 'gulp-minify-css'
import rename       from 'gulp-rename'
import sourcemaps   from 'gulp-sourcemaps'

gulp.task( 'styles:build', function() {
  var sourceMaps   = !global.isProduction && !!config.settings.sourceMaps
  var minifyStyles = global.isProduction || config.settings.minify

  return gulp.src( config.sources.styles.build, { base: config.sources.styles.root } )
    .pipe( gulpif( sourceMaps, sourcemaps.init() ) )
    .pipe( sass() )
    .on( 'error', handleError )
    .pipe( autoprefixer( config.settings.autoprefixer ) )
    .pipe( gulpif( sourceMaps, sourcemaps.write() ) )
    .pipe( gulp.dest( config.destinations.styles ) )
    .pipe( gulpif( minifyStyles, rename( { suffix: '.min' } ) ) )
    .pipe( gulpif( minifyStyles, minify() ) )
    .pipe( gulpif( sourceMaps, sourcemaps.write( './' ) ) )
    .pipe( gulpif( minifyStyles, gulp.dest( config.destinations.styles ) ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true } ) ) )
} )

gulp.task( 'styles:watch', [ 'styles:build' ], function() {
  gulp.watch( config.sources.styles.glob, [ 'styles:build' ] )
} )
