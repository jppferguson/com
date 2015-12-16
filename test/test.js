'use strict'

import assert from 'assert'
import { testable, alsoTestable } from '../src/scripts/app'

describe( 'testable', function() {
  it( 'should return stuff', function() {
    assert.equal( 12345, testable(12345) )
    assert.equal( 'ddd', testable('ddd') )
  } )
} )

describe( 'alsoTestable', function() {
  it( 'should also return stuff but as a string', function() {
    assert.equal( '4141', alsoTestable(4141) )
    assert.equal( 'string', typeof alsoTestable(12.34) )
  } )
} )
