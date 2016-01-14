'use strict'

export default function() {
  return function( $scope, $elem, attrs ) {
    attrs.$observe( 'backgroundPosition', function( value ) {
      $elem.css( {
        'background-position': value
      } )
    } )
  }
}
