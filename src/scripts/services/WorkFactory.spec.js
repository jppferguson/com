/* eslint max-nested-callbacks:0 */
'use strict'

import 'angular-mocks/angular-mocks'
import response from './WorkFactory.stub'

describe( 'Unit: WorkFactory', function() {
  var $sce
  var workItem
  var workLatest
  var workFeatured

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {

    beforeEach( angular.mock.inject( function( $httpBackend, $stateParams, WorkFactory, API, _$sce_ ) {
      $sce = _$sce_
      $httpBackend.when( 'GET', API.ENDPOINT + 'portfolio' ).respond( response )
      $httpBackend.when( 'GET', API.ENDPOINT + 'portfolio/?filter[name]=test' ).respond( response )
      $httpBackend.when( 'GET', API.ENDPOINT + 'portfolio?orderby=meta_value_num&filter[meta_key]=featured' ).respond( response )

      WorkFactory.get().then( function( data ) {
        workLatest = data
      } )
      WorkFactory.getFeatured().then( function( data ) {
        workFeatured = data
      } )
      WorkFactory.single( 'test' ).then( function( data ) {
        workItem = data
      } )

      $httpBackend.flush()
    } ) )

    it( 'should have a title', function() {
      expect( $sce.getTrustedHtml( workItem.title.rendered ) ).toEqual( 'title' )
    } )

    it( 'should have content with trusted html', function() {
      expect( $sce.getTrustedHtml( workItem.content.rendered ) ).toEqual( '<p class="lead">content</p>' )
      expect( workItem.content.rendered ).not.toEqual( '<p class="lead">content</p>' )
    } )

    it( 'should return an array', function() {
      expect( workLatest.length ).toBeGreaterThan( -1 )
    } )

    it( 'should return an array', function() {
      expect( workFeatured.length ).toBeGreaterThan( -1 )
    } )

  } )

} )
