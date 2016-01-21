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
          custom_meta: {
            header: 'header'
          },
          taxonomies_list: {
            post_tag: []
          }
        } ] )

      $httpBackend.when( 'GET', API.ENDPOINT + 'pages/?filter[name]=' )
        .respond( [ {
          title: { rendered: 'title' },
          excerpt: { rendered: 'excerpt' },
          content: { rendered: 'content' },
          custom_meta: {
            header: 'header'
          }
        } ] )

      $controller( 'JournalCtrl', { $scope: $scope } )
      $httpBackend.flush()
    } ) )

    it( 'should set tags property', function() {
      expect( $scope.articles[0].tags ).toEqual( [] )
    } )

    it( 'should set the page title from custom_meta', function() {
      expect( $scope.page.title.rendered ).toEqual( 'header' )
    } )
  } )

} )
