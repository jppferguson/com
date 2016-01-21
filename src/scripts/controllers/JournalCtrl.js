'use strict'

export default function( $rootScope, $scope, $location, JournalFactory, PageFactory ) {

  var pageSlug = $location.path().substring( 1 )

  $rootScope.isLoading = $rootScope.isLoading + 2

  PageFactory.get( pageSlug ).then( function( pageContent ) {
    if ( pageContent ) {
      $scope.page = pageContent
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
    $rootScope.isLoading = $rootScope.isLoading - 1
  } )

  JournalFactory.latest().then( function( articles ) {

    $scope.articles = articles

    $rootScope.isLoading = $rootScope.isLoading - 1

  } )

}
