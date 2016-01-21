'use strict'

export default function( $scope, $location, $stateParams, WorkFactory ) {

  WorkFactory.single( $stateParams.slug ).then( function( item ) {
    if ( item ) {
      $scope.item = item
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
  } )


}
