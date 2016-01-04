'use strict'

// From: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes

export default function( $injector, $location ) {

  var path = $location.url()

  // check to see if the path already has a slash where it should be
  if ( path[ path.length - 1 ] === '/' || path.indexOf( '/?' ) > -1 ) {
    return null
  }

  if ( path.indexOf( '?' ) > -1 ) {
    return path.replace( '?', '/?' )
  }

  return path + '/'

}
