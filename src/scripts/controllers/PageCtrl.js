'use strict'

export default function( $rootScope, $scope, $http, $location, $sce, CONFIG, pageTitle ) {

  var page = $location.path().substring( 1 )
  if ( page === '' ) {
    page = 'profile'
  }

  $rootScope.isLoading = $rootScope.isLoading + 1
  $http.get( CONFIG.API_ENDPOINT + 'pages/?filter[name]=' + page )
    .then( function( res ) {
      var pageData = res.data[0]
      if ( pageData ) {
        // trust each title, content and excerpt in the object
        pageData.title.rendered = $sce.trustAsHtml( pageData.title.rendered )
        pageData.excerpt.rendered = $sce.trustAsHtml( pageData.excerpt.rendered )
        pageData.content.rendered = $sce.trustAsHtml( pageData.content.rendered )

        $scope.page = pageData
        $rootScope.isLoading = $rootScope.isLoading - 1
      } else {
        // 404 if there's no data...
        $location.url( '/404' )
      }

    } )
}
