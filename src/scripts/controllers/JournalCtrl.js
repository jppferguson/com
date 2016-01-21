'use strict'

export default function( $scope, $location, JournalFactory, PageFactory ) {

  var pageSlug = $location.path().substring( 1 )

  PageFactory.get( pageSlug ).then( function( pageContent ) {
    if ( pageContent ) {
      $scope.page = pageContent
    } else {
      // 404 if there's no data...
      $location.url( '/404' )
    }
  } )

  JournalFactory.latest().then( function( articles ) {

    $scope.articles = articles

  } )

}
