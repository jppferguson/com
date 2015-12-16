'use strict'

import _ from 'lodash'

// the main script file
console.log( _.trim( '__ Oh hai, can i haz teh codez plz? __', '_ ' ) ) // eslint-disable-line

export function testable( input ) {
  return input
}

export function alsoTestable( input ) {
  return input.toString()
}
