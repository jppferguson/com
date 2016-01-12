'use strict'

export default function( $http, API ) {
  var factory = {}

  factory.getCV = function() {

    return $http.get( API.ENDPOINT + 'media?filter[s]=cv' ).then( function( resp ) {

      return resp.data[0].source_url

    } )
  }

  return factory

}
