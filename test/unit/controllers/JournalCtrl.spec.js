'use strict'

describe( 'Unit: JournalCtrl', function() {
  var JournalCtrl
  var $scope
  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {
    beforeEach( inject( function( $controller, $rootScope, $httpBackend, $sce, $sanitize, readingTime, CONFIG ) {
      $scope = $rootScope.$new()

      $httpBackend.when( 'GET', CONFIG.API_ENDPOINT + 'posts')
        .respond( [ {
          title:   { rendered: 'title'},
          excerpt: { rendered: 'excerpt'},
          content: { rendered: 'content'},
          taxonomies_list: {
            post_tag: []
          }
        } ] )

      JournalCtrl = $controller( 'JournalCtrl', { $scope: $scope } )
      $httpBackend.flush()
    } ) )

    it( 'should set tags property', function() {
      expect( $scope.articles[0].tags ).toEqual( [] )
    } )
  } )

} )
