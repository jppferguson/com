'use strict'

export default function( $scope, $stateParams, $location, JournalFactory ) {

  JournalFactory.single( $stateParams.slug ).then( function( article ) {
    if ( article ) {
      $scope.article = article
      $scope.article.url = $location.absUrl()
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
  } )


}
