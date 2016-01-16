'use strict'
import hljs from 'highlight.js'

export default function( $timeout, $compile ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      $timeout( function() {
        var items
        $compile( $elem.contents() )( $scope )
        items = $elem[0].querySelectorAll( 'code, pre' )
        angular.forEach( items, function( item ) {
          hljs.highlightBlock( item )
        } )
      }, 500 )
    }
  }
}
