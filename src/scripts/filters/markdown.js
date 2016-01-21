'use strict'

import marked from 'marked'

export default function() {
  return function( text ) {
    return marked( text )
  }
}
