'use strict'
import template from './template.jade'

export default function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: true,
    template: template,
    link: function( $scope, $elem, attrs ) {
      attrs.$observe( 'device', function( value ) {
        let device = value || 'macbook'
        $elem.addClass( 'marvel-device' ).addClass( device )

        $scope.hasTopBar = function() {
          const devices = [ 'htc-one', 'lumia920', 'macbook', 'nexus5', 's5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasSleep = function() {
          const devices = [ 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 'nexus5', 's5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasVolume = function() {
          const devices = [ 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 'lumia920', 'nexus5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasSpeaker = function() {
          const devices = [ 'htc-one', 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 'lumia920', 's5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasSensor = function() {
          const devices = [ 'htc-one', 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 's5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasHome = function() {
          const devices = [ 'ipad', 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 's5' ]
          return devices.indexOf( device ) >= 0
        }

        $scope.hasBottomBar = function() {
          const devices = [ 'iphone4s', 'iphone5c', 'iphone5s', 'iphone6', 'iphone6plus', 'macbook' ]
          return devices.indexOf( device ) >= 0
        }
      } )
    }
  }
}
