'use strict'

export default function( $rootScope ) {

  var background
  var factory = {}

  factory.colours = [
    'dark',
    'blue',
    'green',
    'orange',
    'red',
    'yellow'
  ]
  factory.defaultColour = factory.colours[0]
  factory.prefix = 'bg-'

  background = {
    className: factory.prefix + factory.defaultColour,
    colour: null,
    type: 'class'
  }

  factory.setClass = function( className ) {
    background.className = factory.prefix + className
    background.type = 'class'
    $rootScope.$broadcast( 'background:updated', background )
  }

  factory.setColour = function( colour ) {
    background.type = 'colour'
    background.colour = colour
    $rootScope.$broadcast( 'background:updated', background )
  }

  return factory

}
