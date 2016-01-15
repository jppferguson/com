/* eslint camelcase:0 */
'use strict'

import 'angular-mocks/angular-mocks'

describe( 'Unit: JournalCtrl', function() {

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {
    var $scope

    beforeEach( angular.mock.inject( function( $controller, $rootScope, $httpBackend, API ) {
      $scope = $rootScope.$new()

      $httpBackend.when( 'GET', API.ENDPOINT + 'posts' )
        .respond( [ {
          title: { rendered: 'title' },
          excerpt: { rendered: 'excerpt' },
          content: { rendered: 'content' },
          taxonomies_list: {
            post_tag: []
          }
        } ] )

      $controller( 'JournalCtrl', { $scope: $scope } )
      $httpBackend.flush()
    } ) )

    it( 'should set tags property', function() {
      expect( $scope.articles[0].tags ).toEqual( [] )
    } )
  } )

} )
