'use strict'

import browserSync from 'browser-sync'
import buffer      from 'vinyl-buffer'
import config      from '../config'
import consolidate from 'gulp-consolidate'
import fs          from 'fs'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import handleError from '../helpers/handle-error'
import html2jade   from 'gulp-html2jade'
import iconfont    from 'gulp-iconfont'
import imagemin    from 'gulp-imagemin'
import pngquant    from 'imagemin-pngquant'
import realFavicon from 'gulp-real-favicon'
import rename      from 'gulp-rename'
import source      from 'vinyl-source-stream'

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


/*
 * Icon Font
 *******************************/

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
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true, once: true } ) ) )
} )

gulp.task( 'iconfont:watch', [ 'iconfont:build' ], function() {
  gulp.watch( config.sources.icons.glob, [ 'iconfont:build' ] )
} )


/*
 * Favicons
 *******************************/

gulp.task( 'favicon:build', function( done ) {
  realFavicon.generateFavicon( {
    masterPicture: config.sources.favicon.master,
    dest: config.destinations.favicon,
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '25%',
        appName: config.sources.favicon.appName
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#2b5797',
        onConflict: 'override',
        appName: config.sources.favicon.appName
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: config.sources.favicon.appName,
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 2,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: config.sources.favicon.dataFile
  }, function() {
    done()
  } )
} )

gulp.task( 'favicon:watch', [ 'favicon:build' ], function() {
  gulp.watch( config.sources.favicon.master, [ 'favicon:build' ] )
} )

// Check for updates on RealFaviconGenerator
gulp.task( 'favicon:update', [ 'favicon:build' ], function() {
  var currentVersion = JSON.parse( fs.readFileSync( config.sources.favicon.dataFile ) ).version
  realFavicon.checkForUpdates( currentVersion, function( err ) {
    if ( err ) {
      throw err
    }
  } )
} )

// Creates include file
gulp.task( 'favicon:template', [ 'favicon:build' ], function() {
  var stream = source( 'includes/_favicon.jade' )
  stream.end( '' )
  return stream
    .pipe( buffer() )
    .pipe( realFavicon.injectFaviconMarkups( JSON.parse( fs.readFileSync( config.sources.favicon.dataFile ) ).favicon.html_code ) )
    .pipe( html2jade( { bodyless: true } ) )
    .pipe( gulp.dest( config.sources.templates.root ) )
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
  return gulp.src( config.sources.www.glob, {
    dot: true,
    base: config.sources.www.root
  } )
    .pipe( gulp.dest( 'dist' ) )
} )

gulp.task( 'public:watch', [ 'public:build' ], function() {
  gulp.watch( config.sources.www.glob, [ 'public:build' ] )
} )


/*
 * All together now
 *******************************/

gulp.task( 'assets:build', [ 'favicon:build', 'fonts:build', 'iconfont:build', 'images:build', 'public:build' ] )
gulp.task( 'assets:watch', [ 'favicon:watch', 'fonts:watch', 'iconfont:watch', 'images:watch', 'public:watch' ] )
