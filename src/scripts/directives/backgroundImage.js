'use strict'

export default function() {
  return function( $scope, $elem, attrs ) {
    attrs.$observe( 'backgroundImage', function( value ) {
      $elem.css( {
        'background-image': 'url(' + value + ')',
        'background-size': 'cover'
      } )
    } )
  }
}
