'use strict'

export default function( $timeout ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      $scope.initialHeight = $scope.initialHeight || $elem[ 0 ].style.height
      var resize = function() {
        $elem[ 0 ].style.height = $scope.initialHeight;
        $elem[ 0 ].style.height = "" + $elem[ 0 ].scrollHeight + "px"
      }
      $elem.on( "input change", resize )
      $timeout( resize, 0 )
    }
  }
}
