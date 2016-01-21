'use strict'

export default function( $rootScope, $scope, $location, WorkFactory, PageFactory ) {

  var pageSlug = $location.path().substring( 1 )

  $rootScope.isLoading = $rootScope.isLoading + 2
  $scope.featuredImages = 4

  PageFactory.get( pageSlug ).then( function( pageContent ) {
    if ( pageContent ) {
      $scope.page = pageContent
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
    $rootScope.isLoading = $rootScope.isLoading - 1
  } )

  WorkFactory.get().then( function( items ) {

    $scope.items = items

    $rootScope.isLoading = $rootScope.isLoading - 1

  } )


}
