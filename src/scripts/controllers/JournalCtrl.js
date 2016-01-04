'use strict'

export default function( $rootScope, $scope, JournalFactory ) {

  $rootScope.isLoading = $rootScope.isLoading + 1

  JournalFactory.latest().then( function( articles ) {

    $scope.articles = articles

    $rootScope.isLoading = $rootScope.isLoading - 1

  } )

}
