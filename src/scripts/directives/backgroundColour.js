'use strict'

function isValidColor( str ) {
  return str.match(/^#[a-f0-9]{6}$/i) !== null
}

export default function() {
  return function( $scope, $elem, attrs ) {
    attrs.$observe( 'backgroundColour', function( value ) {
      if( [ 'blue', 'green' ].indexOf( value ) !== -1 ) {
        $elem.addClass( 'bg-' + value )
      } else if( isValidColor( value ) ) {
        $elem.css( {
          'background-color': value
        } )
      }
    } )
  }
}
