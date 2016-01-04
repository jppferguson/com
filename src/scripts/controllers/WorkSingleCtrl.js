'use strict'

export default function( $rootScope, $scope, $location, $stateParams, WorkFactory ) {

  $rootScope.isLoading = $rootScope.isLoading + 1

  WorkFactory.single( $stateParams.slug ).then( function( item ) {
    if ( item ) {
      $scope.item = item
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
    $rootScope.isLoading = $rootScope.isLoading - 1
  } )


}
