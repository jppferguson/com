'use strict'

export default function( $window, ScrollFactory, BackgroundFactory, BodyFactory, $rootScope ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      var $navElem = angular.element( $elem[0].querySelectorAll( '.background-target' ) )
      var headerHeight = 0
      var elemHeight = 100

      // watch for headerHeight changes
      $rootScope.$watch( 'headerHeight', function( newHeight ) {
        headerHeight = newHeight || 500
      } )

      // listen for header background changes
      $rootScope.$on( 'background:updated', function(  event, background ) {
        var oldClasses = $navElem.attr( 'class' ).match( /bg-(\w+)/g )
        // remove background-color style and old classes with bg-
        if ( oldClasses ) {
          $navElem.removeClass( oldClasses.join( ' ' ) )
        }
        $navElem.css( 'background-color', '' )
        if ( background.type === 'class' ) {
          $navElem.addClass( background.className )
        } else {
          $navElem.css( 'background-color', background.colour )
        }
      } )

      // listen for scroll updated events
      $rootScope.$on( 'scroll:updated', function( event, scroll ) {
        mainNavShowHideOnScroll( scroll.current, scroll.down ) // eslint-disable-line no-use-before-define
      } )

      function mainNavShowHideOnScroll( scrollPosition, isScrollingDown ) {
        var pastHeader
        elemHeight = $elem[0].clientHeight === 0 ? elemHeight : $elem[0].clientHeight
        pastHeader = scrollPosition >= headerHeight - elemHeight
        // $scope.nav.isFixed = pastHeader
        $scope.nav.isPastHeader = pastHeader
        if ( isScrollingDown && scrollPosition >= headerHeight - elemHeight + 500 ) {
          // $scope.nav.isFixed = true
          $scope.nav.inView = false
        } else {
          $scope.nav.inView = true
        }
        $scope.$apply()
      }
    }
  }
}
