'use strict'

export default function() {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      $scope.$watch( function() {
        return $elem.text()
      }, function() {
        angular.forEach( $elem[0].querySelectorAll( 'img' ), function( item ) {
          var $imgElem = angular.element( item )
          if ( !$imgElem.hasClass( 'no-zoom' ) ) {
            $imgElem.attr( 'data-action', 'zoom' )
          }
        } )
      } )
    }
  }
}
