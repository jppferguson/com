'use strict'

export default function( $http ) {
  return {
    restrict: 'AE',
    replace: true,
    template: '<div class="loading hide"><div class="center-center">LOADING...</div></div>',
    link: function( $scope, $elem ) {
      $scope.isLoading = function() {
        return $http.pendingRequests.length > 0
      }

      $scope.$watch( $scope.isLoading, function( v ) {
        if ( v ) {
          $elem.removeClass( 'hide' )
        } else {
          $elem.addClass( 'hide' )
        }
      } )
    }
  }
}
