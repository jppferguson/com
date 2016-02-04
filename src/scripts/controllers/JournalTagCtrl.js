'use strict'

export default function( $scope, $stateParams, journalItems ) {

  $scope.tag = $stateParams.tag
  $scope.articles = journalItems


}
