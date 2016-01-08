'use strict'
import template from './template.jade'

export default function( $cookies ) {
  return {
    scope: true,
    template: template,
    controller: function( $scope ) {
      var cookieConsent = $cookies.get( 'cookie_consent_dismissed' )
      $scope.consent = function( consent ) {
        if ( typeof consent === 'undefined' ) {
          return cookieConsent
        } else if ( consent ) {
          $cookies.put( 'cookie_consent_dismissed', true )
          cookieConsent = true
        }
      }
    }
  }
}
