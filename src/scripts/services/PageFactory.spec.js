/* eslint max-nested-callbacks:0 */
'use strict'

import 'angular-mocks/angular-mocks'
import response from './PageFactory.stub'

describe( 'Unit: PageFactory', function() {
  var $sce
  var page

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {

    beforeEach( angular.mock.inject( function( $httpBackend, $stateParams, PageFactory, API, _$sce_ ) {
      $sce = _$sce_
      $httpBackend.whenGET( /pages\/.*/ ).respond( 200, response )
      $httpBackend.whenGET( /.*/ ).respond( 200, '' )

      PageFactory.get( 'test' ).then( function( data ) {
        page = data
      } )

      $httpBackend.flush()
    } ) )

    it( 'should have a title that can be overwritten by custom_meta.header', function() {
      expect( $sce.getTrustedHtml( page.title.rendered ) ).toEqual( 'header' )
    } )

  } )

} )
