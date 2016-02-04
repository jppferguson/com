'use strict'

export default function( $scope, pageContentIndex, pageContentProfile, journalArticles, workItems ) {

  $scope.indexPage = pageContentIndex
  $scope.workItems = workItems
  $scope.journalArticles = journalArticles
  $scope.profilePage = pageContentProfile

}
