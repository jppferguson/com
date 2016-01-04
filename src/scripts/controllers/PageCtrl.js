'use strict'

export default function( $rootScope, $scope,  $location, PageFactory ) {

  var pageSlug = $location.path().substring( 1 )
  if ( pageSlug === '' ) {
    pageSlug = 'profile'
  }

  $rootScope.isLoading = $rootScope.isLoading + 1

  PageFactory.get( pageSlug ).then( function( pageContent ) {
    if ( pageContent ) {
      $scope.page = pageContent
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
    $rootScope.isLoading = $rootScope.isLoading - 1
  } )

}
