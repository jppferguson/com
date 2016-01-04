'use strict'

export default function( $http, $sce, CONFIG ) {
  var factory = {}

  factory.get = function( slug ) {

    var apiPath = CONFIG.API_ENDPOINT + 'pages/?filter[name]=' + slug

    return $http.get( apiPath ).then( function( resp ) {

      var pageData = resp.data[0]
      // trust each title, content and excerpt in the object
      pageData.title.rendered = $sce.trustAsHtml( pageData.title.rendered )
      pageData.excerpt.rendered = $sce.trustAsHtml( pageData.excerpt.rendered )
      pageData.content.rendered = $sce.trustAsHtml( pageData.content.rendered )

      return pageData

    } )
  }

  return factory

}
