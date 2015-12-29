'use strict'

export default function( $rootScope, $scope, $http, $stateParams, $sce, $sanitize, $location, readingTime, CONFIG ) {
  $rootScope.isLoading += 1
  $http.get( CONFIG.API_ENDPOINT + 'posts/?filter[name]=' + $stateParams.slug )
    .then( function( resultPosts ) {
      var item = resultPosts.data[0];
      if( item ) {
        // trust each title, content and excerpt in the object
        item.title.rendered = $sce.trustAsHtml( item.title.rendered )
        item.excerpt.rendered = $sce.trustAsHtml( item.excerpt.rendered )
        item.content.rendered = $sce.trustAsHtml( item.content.rendered )
        item.readingTime = readingTime.get( $sanitize( item.content.rendered ) )
        item.tags = item.taxonomies_list.post_tag
        $scope.article = item
        // now we have the id, get the tags
        // $http.get( CONFIG.API_ENDPOINT + 'posts/' + item.id + '/tags' )
        //   .then( function( resultsTags ) {
        //     $scope.tags = resultsTags.data
        //     $scope.isLoading -= 1
        //   } )
      } else {
        // 404 if there's no data...
        // TODO: probably can find a better way of doing this
        $location.url( '/404' )
      }
      $rootScope.isLoading -= 1
    } )
}
