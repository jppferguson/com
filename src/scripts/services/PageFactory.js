'use strict'

export default function( $http, $location, $sce, API ) {
  var factory = {}

  factory.get = function( pageSlug = false ) {

    var slug = pageSlug || $location.path().substring( 1 )
    var apiPath = API.ENDPOINT + 'pages/?slug=' + slug

    return $http.get( apiPath ).then( function( resp ) {

      var pageData

      if ( resp.data.length === 0 ) {
        return false
      }

      pageData = resp.data[0]

      // trust each title, content and excerpt in the object
      pageData.title.rendered = pageData.custom_meta.header || $sce.trustAsHtml( pageData.title.rendered )
      pageData.excerpt.rendered = $sce.trustAsHtml( pageData.excerpt.rendered )
      pageData.content.rendered = $sce.trustAsHtml( pageData.content.rendered )

      return pageData

    } )
  }

  return factory

}
