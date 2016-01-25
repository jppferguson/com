'use strict'
import hljs from 'highlight.js'

export default function() {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      $scope.$watch( function() {
        return $elem.text()
      }, function() {
        angular.forEach( $elem[0].querySelectorAll( 'code, pre' ), function( item ) {
          hljs.highlightBlock( item )
        } )
      } )
    }
  }
}
