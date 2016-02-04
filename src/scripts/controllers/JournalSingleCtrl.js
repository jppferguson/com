'use strict'

export default function( $scope, $location, journalItem ) {

  $scope.article = journalItem
  $scope.article.url = $location.absUrl()

}
