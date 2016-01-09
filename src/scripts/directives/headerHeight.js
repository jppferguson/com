'use strict'

export default function( $rootScope, $window ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {

      function checkHeaderHeight() {
        $rootScope.headerHeight = $elem[0].offsetHeight
      }

      function cleanUp() {
        angular.element( $window ).off( 'resize', checkHeaderHeight )
      }

      // bind on resize
      angular.element( $window ).bind( 'resize', checkHeaderHeight )
      checkHeaderHeight()

      $scope.$on( '$destroy', cleanUp )

    }
  }
}
