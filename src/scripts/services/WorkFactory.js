'use strict'

export default function( $http, $sce, API ) {

  var factory = {}

  function trustHTMLContent( data ) {
    angular.forEach( data, function( value, key ) {
      // trust each title, content and excerpt in the object
      this[key].title.rendered = $sce.trustAsHtml( value.title.rendered )
      this[key].excerpt.rendered = $sce.trustAsHtml( value.excerpt.rendered )
      this[key].content.rendered = $sce.trustAsHtml( value.content.rendered )
    }, data )
    return data
  }

  factory.get = function() {

    return $http.get( API.ENDPOINT + 'portfolio' ).then( function( res ) {

      return trustHTMLContent( res.data )

    } )
  }

  factory.single = function( slug ) {

    return $http.get( API.ENDPOINT + 'portfolio/?filter[name]=' + slug ).then( function( res ) {

      return trustHTMLContent( res.data )[ 0 ]

    } )
  }

  return factory

}
