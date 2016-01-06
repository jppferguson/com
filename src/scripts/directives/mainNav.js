'use strict'

export default function( $window, ScrollFactory ) {
  return {
    restrict: 'A',
    link: function( $scope, $element ) {
      // var shortWindow = false;
      // listen for scroll updated events
      $scope.$on( 'scroll:updated', function( event, scroll ) {

          mainNavShowHideOnScroll( scroll.current, scroll.down )

      } )

      function mainNavShowHideOnScroll( scrollPosition, isScrollingDown ) {
        $scope.nav.isFixed = ( scrollPosition >= 100 )
        if( !isScrollingDown ) {
          $scope.nav.isFixed = true
          $scope.nav.inView = true
        }
        else {
          $scope.nav.inView = false
        }
        $scope.$apply()
      }
    }
  }
}
