'use strict'

export default function( $rootScope, $scope, WorkFactory ) {

  $rootScope.isLoading = $rootScope.isLoading + 1

  $scope.featuredImages = 4

  WorkFactory.get().then( function( items ) {

    $scope.items = items

    $rootScope.isLoading = $rootScope.isLoading - 1

  } )


}
