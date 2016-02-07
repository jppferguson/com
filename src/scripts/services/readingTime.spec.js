'use strict'

import 'angular-mocks/angular-mocks'

describe( 'Unit: readingTime', function() {

  var readingTime

  beforeEach( angular.mock.module( 'App' ) )

  beforeEach( angular.mock.inject( function( _readingTime_ ) {
    readingTime = _readingTime_
  } ) )

  it( 'should output the reading time', function() {
    expect( readingTime.get( 'blah blah' ) ).toEqual( 'a few seconds read' )
  } )

  it( 'should allow updating the words per minute', function() {
    expect( readingTime.get( 'blah blah blah blah', 1 ) ).toEqual( '4 min read' )
  } )

  it( 'should round to the nearest minute', function() {
    expect( readingTime.get( 'blah', 1.2 ) ).toEqual( '1 min read' )
    expect( readingTime.get( 'blah blah blah', 2 ) ).toEqual( '2 min read' )
    expect( readingTime.get( 'blah blah blah blah', 3 ) ).toEqual( '1 min read' )
  } )

} )
