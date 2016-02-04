'use strict'

export default function( $scope, pageContent, workItems ) {

  $scope.featuredImages = 4
  $scope.activeElement = -1
  $scope.elementInView = function( index, inView, inViewPart ) {
    if ( inViewPart === 'both' ) {
      $scope.activeElement = index
    }
  }

  $scope.page = pageContent
  $scope.items = workItems

}
