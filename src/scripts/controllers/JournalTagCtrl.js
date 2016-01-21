'use strict'

export default function( $scope, $stateParams, JournalFactory ) {

  $scope.tag = $stateParams.tag

  JournalFactory.tag( $stateParams.tag ).then( function( articles ) {

    $scope.articles = articles

  } )


}
