'use strict'

export default function( $timeout ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      var resize
      $scope.initialHeight = $scope.initialHeight || $elem[ 0 ].style.height
      resize = function() {
        $elem[ 0 ].style.height = $scope.initialHeight
        $elem[ 0 ].style.height = '' + $elem[ 0 ].scrollHeight + 'px'
      }
      $elem.on( 'input change', resize )
      $timeout( resize, 0 )
    }
  }
}
