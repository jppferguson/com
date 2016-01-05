'use strict'

export default function( $http, CONFIG ) {
  var factory = {}

  factory.getCV = function() {

    return $http.get( CONFIG.API_ENDPOINT + 'media?filter[s]=cv' ).then( function( resp ) {

      return resp.data[0].source_url

    } )
  }

  return factory

}
