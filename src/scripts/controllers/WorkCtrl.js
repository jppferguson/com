'use strict'

export default function( $scope, $location, WorkFactory, PageFactory ) {

  var pageSlug = $location.path().substring( 1 )

  $scope.featuredImages = 4
  $scope.activeElement = -1
  $scope.elementInView = function( index, inView, inViewPart ) {
    if ( inViewPart === 'both' ) {
      $scope.activeElement = index
    }
  }

  PageFactory.get( pageSlug ).then( function( pageContent ) {
    if ( pageContent ) {
      $scope.page = pageContent
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
  } )

  WorkFactory.get().then( function( items ) {

    $scope.items = items

  } )


}
