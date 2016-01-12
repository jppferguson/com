'use strict'

export default function( $injector, $location, $log ) {

  var path = $location.url()

  var redirections = {
    '/about/': '/profile/',
    '/blog/': '/journal/'
  }

  // check if in redirections object
  if ( redirections.hasOwnProperty( path ) ) {
    // TODO: add some logging here
    return redirections[ path ]
  }

  // check to see if the path has .html in it
  if ( path.indexOf( '.html' ) > -1 ) {
    // TODO: add some logging here
    return path.replace( '.html', '/' )
  }

  return null

}
