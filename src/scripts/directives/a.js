'use strict'

export default function() {
  return {
    restrict: 'E',
    link: function( $scope, $elem ) {
      var a = $elem[ 0 ]
      // add target="_blank" to external links
      if ( location.host.indexOf( a.hostname ) < 0 ) {
        a.target = '_blank'
      }
    }
  }
}
