'use strict'

function isValidColor( str ) {
  return str.match( /^#[a-f0-9]{6}$/i ) !== null
}

export default function(  BackgroundFactory ) {
  return function( $scope, $elem, attrs ) {
    attrs.$observe( 'backgroundColour', function( value ) {
      var newValue = value
      // check if its a valid hex value
      if ( isValidColor( newValue ) ) {
        $elem.css( {
          'background-color': newValue
        } )
        if ( attrs.backgroundColourHeader ) {
          BackgroundFactory.setColour( newValue )
        }
      } else {
        // check if its not a built-in colour
        if ( BackgroundFactory.colours.indexOf( newValue ) === -1 ) {
          // fallback to default
          newValue = BackgroundFactory.defaultColour
        }
        $elem.addClass( BackgroundFactory.prefix + newValue )
        if ( attrs.backgroundColourHeader ) {
          BackgroundFactory.setClass( newValue )
        }
      }
    } )
  }
}
