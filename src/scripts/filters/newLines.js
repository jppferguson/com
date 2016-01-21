'use strict'

export default function() {
  return function( text ) {
    return text ? text.split( /\n/g ) : text
  }
}
