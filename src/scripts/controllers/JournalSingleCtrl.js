'use strict'

export default function( $rootScope, $scope, $stateParams, $location, JournalFactory ) {

  $rootScope.isLoading = $rootScope.isLoading + 1

  JournalFactory.single( $stateParams.slug ).then( function( article ) {
    if ( article ) {
      $scope.article = article
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
    $rootScope.isLoading = $rootScope.isLoading - 1
  } )


}
