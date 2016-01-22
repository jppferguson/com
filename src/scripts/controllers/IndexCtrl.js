'use strict'

export default function( $scope, JournalFactory, PageFactory, WorkFactory ) {

  PageFactory.get( 'index' ).then( function( pageContent ) {
    $scope.indexPage = pageContent
  } )

  WorkFactory.getFeatured().then( function( items ) {
    $scope.workItems = items
  } )

  JournalFactory.latest().then( function( articles ) {
    $scope.journalArticles = articles
  } )

  PageFactory.get( 'profile' ).then( function( pageContent ) {
    $scope.profilePage = pageContent
  } )


}
