/* eslint max-nested-callbacks:0 */
'use strict'

import 'angular-mocks/angular-mocks'
import response from './JournalFactory.stub'

describe( 'Unit: JournalFactory', function() {
  var $sce
  var journalItem
  var journalLatest
  var journalTag

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {

    beforeEach( angular.mock.inject( function( $httpBackend, $stateParams, JournalFactory, API, _$sce_ ) {
      $sce = _$sce_
      $httpBackend.whenGET( /posts\/.*/ ).respond( 200, response )
      $httpBackend.whenGET( /.*/ ).respond( 200, '' )

      JournalFactory.latest().then( function( data ) {
        journalLatest = data
      } )
      JournalFactory.tag( 'tag' ).then( function( data ) {
        journalTag = data
      } )
      JournalFactory.single( 'test' ).then( function( data ) {
        journalItem = data
      } )

      $httpBackend.flush()
    } ) )

    it( 'should have a title that can be overwritten by custom_meta.header', function() {
      expect( $sce.getTrustedHtml( journalItem.title.rendered ) ).toEqual( 'header' )
    } )

    it( 'should set tags property', function() {
      expect( journalItem.tags ).toEqual( [] )
    } )

    it( 'should have content with trusted html', function() {
      expect( $sce.getTrustedHtml( journalItem.content.rendered ) ).toEqual( '<p class="lead">content</p>' )
      expect( journalItem.content.rendered ).not.toEqual( '<p class="lead">content</p>' )
    } )

    it( 'should return an array', function() {
      expect( journalLatest.length ).toBeGreaterThan( -1 )
    } )

    it( 'should return an array', function() {
      expect( journalTag.length ).toBeGreaterThan( -1 )
    } )

  } )

} )
