'use strict'

export default function( $rootScope, $scope, $http, $sce, $sanitize, readingTime, CONFIG ) {
  $rootScope.isLoading = $rootScope.isLoading + 1
  $scope.featuredImages = 4
  $http.get( CONFIG.API_ENDPOINT + 'portfolio' )
    .then( function( resultsPosts ) {
      angular.forEach( resultsPosts.data, function( value, key ) {
        // trust each title, content and excerpt in the object
        this[key].title.rendered = $sce.trustAsHtml( value.title.rendered )
        this[key].excerpt.rendered = $sce.trustAsHtml( value.excerpt.rendered )
        this[key].content.rendered = $sce.trustAsHtml( value.content.rendered )
        this[key].readingTime = readingTime.get( $sanitize( value.content.rendered ) )

        // now we have the id, get the featured image if it exists
        // if( value.featured_image > 0 ) {
        //   $scope.isLoading += 1
        //   $http.get( CONFIG.API_ENDPOINT + 'media/' + value.featured_image )
        //     .then( function( resultsImage ) {
        //       resultsPosts.data[key].image = resultsImage.data
        //       $scope.isLoading -= 1
        //     } )
        // }
      }, resultsPosts.data )
      $scope.items = resultsPosts.data
      $rootScope.isLoading = $rootScope.isLoading - 1
    } )
}
