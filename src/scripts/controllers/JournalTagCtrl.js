'use strict'

export default function( $rootScope, $scope, $stateParams, JournalFactory ) {

  $rootScope.isLoading = $rootScope.isLoading + 1

  $scope.tag = $stateParams.tag

  JournalFactory.tag( $stateParams.tag ).then( function( articles ) {

    $scope.articles = articles

    $rootScope.isLoading = $rootScope.isLoading - 1

  } )


}
