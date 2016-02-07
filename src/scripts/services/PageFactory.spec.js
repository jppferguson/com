/* eslint max-nested-callbacks:0 */
'use strict'

import 'angular-mocks/angular-mocks'
import response from './PageFactory.stub'

describe( 'Unit: PageFactory', function() {
  var page

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {

    beforeEach( angular.mock.inject( function( $httpBackend, $stateParams, PageFactory, API ) {
      $httpBackend.when( 'GET', API.ENDPOINT + 'pages/?filter[name]=test' ).respond( response )

      PageFactory.get( 'test' ).then( function( data ) {
        page = data
      } )

      $httpBackend.flush()
    } ) )

    it( 'should have a title that can be overwritten by custom_meta.header', function() {
      expect( page.title.rendered ).toEqual( 'header' )
    } )

  } )

} )
