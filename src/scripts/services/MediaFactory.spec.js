/* eslint max-nested-callbacks:0 */
'use strict'

import 'angular-mocks/angular-mocks'
import response from './MediaFactory.stub'

describe( 'Unit: MediaFactory', function() {
  var cv

  beforeEach( angular.mock.module( 'App' ) )

  describe( 'with httpBackend', function() {

    beforeEach( angular.mock.inject( function( $httpBackend, MediaFactory, API ) {
      $httpBackend.whenGET( API.ENDPOINT + 'media?filter[s]=cv' ).respond( response )
      $httpBackend.whenGET( /.*/ ).respond( '' )

      MediaFactory.getCV().then( function( data ) {
        cv = data
      } )

      $httpBackend.flush()
    } ) )

    it( 'should have a source url', function() {
      expect( cv ).toEqual( 'cv.pdf' )
    } )

  } )

} )
