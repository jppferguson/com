'use strict'

import config      from '../config'
import gulp        from 'gulp'
import rev         from 'gulp-rev'
import revReplace  from 'gulp-rev-replace'

gulp.task( 'rev:all', [ 'styles:compile', 'scripts:build' ], function() {

  return gulp.src( config.sources.rev.build, { base: config.sources.rev.root } )
    .pipe( gulp.dest( config.destinations.rev ) )
    .pipe( rev() )
    .pipe( gulp.dest( config.destinations.rev ) )
    .pipe( rev.manifest( {
      merge: true
    } ) )
    .pipe( gulp.dest( config.destinations.rev ) )

} )

gulp.task( 'rev:replace', [ 'rev:all', 'templates:build' ], function() {
  var manifest = gulp.src( config.sources.rev.root + '/rev-manifest.json' )

  return gulp.src( config.destinations.root + '/index.html' )
    .pipe( revReplace( { manifest: manifest } ) )
    .pipe( gulp.dest( config.destinations.root ) )
} )

gulp.task( 'rev:build', [ 'rev:replace' ] )

gulp.task( 'rev:watch', function() {
  gulp.watch( config.sources.rev.build, [ 'rev:build' ] )
} )
