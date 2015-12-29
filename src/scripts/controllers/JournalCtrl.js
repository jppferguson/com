'use strict'

export default function( $rootScope, $scope, $http, $sce, $sanitize, readingTime, CONFIG ) {
  $rootScope.isLoading += 1
  $http.get( CONFIG.API_ENDPOINT + 'posts' )
    .then( function( resultsPosts ) {
      angular.forEach( resultsPosts.data, function( value, key ) {
        var that = this;
        // trust each title, content and excerpt in the object
        this[key].title.rendered = $sce.trustAsHtml( value.title.rendered )
        this[key].excerpt.rendered = $sce.trustAsHtml( value.excerpt.rendered )
        this[key].content.rendered = $sce.trustAsHtml( value.content.rendered )
        this[key].readingTime = readingTime.get( $sanitize( value.content.rendered ) )
        this[key].tags = value.taxonomies_list.post_tag
      }, resultsPosts.data )
      $scope.articles = resultsPosts.data
      $rootScope.isLoading -= 1
    } )
}
