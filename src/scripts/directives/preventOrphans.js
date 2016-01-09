'use strict'

export default function( $timeout, $compile ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      var regex = new RegExp( /\s+([^\s]+)$/ )
      var replacement = '&nbsp;$1'
      $timeout( function() {
        $compile( $elem.contents() )( $scope )
        $elem.html( $elem.text().replace( regex, replacement ) )
      } )
    }
  }
}
