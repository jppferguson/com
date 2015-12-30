'use strict'

export default function( $rootScope, $scope, $http, $location, $sce, CONFIG ) {

  var page = $location.path().substring( 1 )
  if ( page === '' ) {
    page = 'profile'
  }

  $rootScope.isLoading = $rootScope.isLoading + 1
  $http.get( CONFIG.API_ENDPOINT + 'pages/?filter[name]=' + page )
    .then( function( res ) {
      angular.forEach( res.data, function( value, key ) {
        // trust each title, content and excerpt in the object
        this[key].title.rendered = $sce.trustAsHtml( value.title.rendered )
        this[key].excerpt.rendered = $sce.trustAsHtml( value.excerpt.rendered )
        this[key].content.rendered = $sce.trustAsHtml( value.content.rendered )
      }, res.data )
      $scope.article = res.data[0]
      $rootScope.isLoading = $rootScope.isLoading - 1
    } )
}
