'use strict'

import browserSync from 'browser-sync'
import config      from '../config'
import consolidate from 'gulp-consolidate'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import handleError from '../helpers/handle-error'
import iconfont    from 'gulp-iconfont'
import imagemin    from 'gulp-imagemin'
import pngquant    from 'imagemin-pngquant'
import rename      from 'gulp-rename'

/*
 * Fonts
 *******************************/

gulp.task( 'fonts:build', function() {
  return gulp.src( config.sources.fonts.glob )
    .pipe( gulp.dest( config.destinations.fonts ) )
} )

gulp.task( 'fonts:watch', [ 'fonts:build' ], function() {
  gulp.watch( config.sources.fonts.glob, [ 'fonts:build' ] )
} )


gulp.task( 'iconfont:build', function() {
  return gulp.src( [ config.sources.icons.glob ] )
    .pipe( iconfont( {
      fontName: config.sources.icons.fontName,
      appendUnicode: false,
      formats: config.sources.icons.formats,
      timestamp: Math.round( Date.now() / 1000 )
    } ) )
    .on( 'glyphs', function( glyphs ) {
      var fontConfig = config.sources.icons
      fontConfig.glyphs = glyphs
      gulp.src( config.sources.icons.template )
        .pipe( consolidate( 'lodash', fontConfig ) )
        .pipe( rename( config.sources.icons.sassFile ) )
        .pipe( gulp.dest( config.sources.styles.root ) )
    } )
    .pipe( gulp.dest( config.destinations.fonts ) )
} )

gulp.task( 'iconfont:watch', [ 'iconfont:build' ], function() {
  gulp.watch( config.sources.icons.glob, [ 'iconfont:build' ] )
} )


/*
 * Images
 *******************************/

gulp.task( 'images:build', function() {
  return gulp.src( config.sources.images.glob )
    .pipe( gulpif( global.isProduction,
      imagemin( {
        progressive: true,
        use: [ pngquant() ]
      } )
    ) )
    .on( 'error', handleError )
    .pipe( gulp.dest( config.destinations.images ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true, once: true } ) ) )
} )

gulp.task( 'images:watch', [ 'images:build' ], function() {
  gulp.watch( config.sources.images.glob, [ 'images:build' ] )
} )


/*
 * Misc public files
 *******************************/

gulp.task( 'public:build', function() {
  return gulp.src( config.sources.www.glob )
    .pipe( gulp.dest( 'dist' ) )
} )

gulp.task( 'public:watch', [ 'public:build' ], function() {
  gulp.watch( config.sources.www.glob, [ 'public:build' ] )
} )


/*
 * All together now
 *******************************/

gulp.task( 'assets:build', [ 'fonts:build', 'iconfont:build', 'images:build', 'public:build' ] )
gulp.task( 'assets:watch', [ 'fonts:watch', 'iconfont:watch', 'images:watch', 'public:watch' ] )
