/* eslint camelcase:0 */
'use strict'

import 'angular-mocks/angular-mocks'

describe( 'Unit: JournalSingleCtrl', function() {

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {
    var $scope

    beforeEach( angular.mock.inject( function( $controller, $rootScope, $httpBackend, $stateParams, $sce, $sanitize, readingTime, API ) {
      $scope = $rootScope.$new()

      $httpBackend.when( 'GET', API.ENDPOINT + 'posts/?filter[name]=' + $stateParams.slug )
        .respond( [ {
          title: { rendered: 'title' },
          excerpt: { rendered: 'excerpt' },
          content: { rendered: 'content' },
          taxonomies_list: {
            post_tag: []
          }
        } ] )

      $controller( 'JournalSingleCtrl', { $scope: $scope } )
      $httpBackend.flush()
    } ) )

    it( 'should set tags property', function() {
      expect( $scope.article.tags ).toEqual( [] )
    } )
  } )

} )