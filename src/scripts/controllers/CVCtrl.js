'use strict'

export default function( $scope, MediaFactory ) {
  MediaFactory.getCV().then( function( url ) {
    $scope.cvURL = url
  } )
}
