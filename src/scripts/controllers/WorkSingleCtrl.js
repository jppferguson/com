'use strict'

export default function( $rootScope, $scope, $http, $stateParams, $sce, $sanitize, $location, readingTime, CONFIG ) {
  $rootScope.isLoading += 1
  $http.get( CONFIG.API_ENDPOINT + 'portfolio/?filter[name]=' + $stateParams.slug )
    .then( function( resultPosts ) {
      var item = resultPosts.data[0];
      if( item ) {
        // trust each title, content and excerpt in the object
        item.title.rendered = $sce.trustAsHtml( item.title.rendered )
        item.excerpt.rendered = $sce.trustAsHtml( item.excerpt.rendered )
        item.content.rendered = $sce.trustAsHtml( item.content.rendered )
        $scope.item = item
        // now we have the id, get the featured image if it exists
        // if( item.featured_image > 0 ) {
        //   $http.get( CONFIG.API_ENDPOINT + 'media/' + item.featured_image )
        //     .then( function( resultsImage ) {
        //       $scope.image = resultsImage.data
        //       $scope.isLoading = false
        //     } )
        // } else {
          $rootScope.isLoading += 1
        // }
      } else {
        // 404 if there's no data...
        // TODO: probably can find a better way of doing this
        $location.url( '/404' )
      }
    } )
}
