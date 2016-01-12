'use strict'

export default function( $http, $sanitize, $sce, readingTime, API ) {

  var factory = {}

  function trustHTMLContent( data ) {
    angular.forEach( data, function( value, key ) {
      // trust each title, content and excerpt in the object
      this[key].title.rendered = $sce.trustAsHtml( value.title.rendered )
      this[key].excerpt.rendered = $sce.trustAsHtml( value.excerpt.rendered )
      this[key].content.rendered = $sce.trustAsHtml( value.content.rendered )
      this[key].readingTime = readingTime.get( $sanitize( value.content.rendered ) )
      this[key].tags = value.taxonomies_list.post_tag
    }, data )
    return data
  }

  factory.latest = function() {

    return $http.get( API.ENDPOINT + 'posts' ).then( function( res ) {

      return trustHTMLContent( res.data )

    } )
  }

  factory.tag = function( tag ) {

    return $http.get( API.ENDPOINT + 'posts?filter[tag]=' + tag ).then( function( res ) {

      return trustHTMLContent( res.data )

    } )
  }

  factory.single = function( slug ) {

    return $http.get( API.ENDPOINT + 'posts/?filter[name]=' + slug ).then( function( res ) {

      return trustHTMLContent( res.data )[ 0 ]

    } )
  }


  return factory

}
