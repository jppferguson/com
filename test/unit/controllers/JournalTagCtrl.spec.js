'use strict'

describe( 'Unit: JournalTagCtrl', function() {
  var JournalTagCtrl
  var $scope
  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {
    beforeEach( inject( function( $controller, $rootScope, $httpBackend, $stateParams, $sce, $sanitize, readingTime, CONFIG ) {
      $scope = $rootScope.$new()

      $httpBackend.when( 'GET', CONFIG.API_ENDPOINT + 'posts?filter[tag]=' + $stateParams.tag )
        .respond( [ {
          title:   { rendered: 'title'},
          excerpt: { rendered: 'excerpt'},
          content: { rendered: 'content'},
          taxonomies_list: {
            post_tag: []
          }
        } ] )

      JournalTagCtrl = $controller( 'JournalTagCtrl', { $scope: $scope } )
      $httpBackend.flush()
    } ) )

    it( 'should set tags property', function() {
      expect( $scope.articles[0].tags ).toEqual( [] )
    } )
  } )

} )
