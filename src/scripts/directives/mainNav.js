'use strict'

export default function( $window, ScrollFactory, $rootScope ) {
  return {
    restrict: 'A',
    link: function( $scope, $element ) {
      var headerHeight = 0
      // TODO: actually calculate this
      var elemHeight = 100

      // watch for headerHeight changes
      $rootScope.$watch( 'headerHeight', function( newHeight, oldHeight ) {
        headerHeight = newHeight || 500
      } );

      // listen for scroll updated events
      $scope.$on( 'scroll:updated', function( event, scroll ) {
        mainNavShowHideOnScroll( scroll.current, scroll.down )
      } )

      function mainNavShowHideOnScroll( scrollPosition, isScrollingDown ) {
        var pastHeader = ( scrollPosition >= headerHeight - elemHeight )
        // $scope.nav.isFixed = pastHeader
        $scope.nav.isPastHeader = pastHeader
        if( isScrollingDown && scrollPosition >= headerHeight - elemHeight + 500 ) {
          // $scope.nav.isFixed = true
          $scope.nav.inView = false
        }
        else {
          $scope.nav.inView = true
        }
        $scope.$apply()
      }
    }
  }
}
