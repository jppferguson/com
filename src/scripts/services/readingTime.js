'use strict'

export default function() {

  return {
    get: function( text, wordsPerMinute = 200 ) {
      var minutes
      minutes = text.split( ' ' ).length / wordsPerMinute
      if ( minutes > 0 && minutes < 0.5 ) {
        return 'a few seconds read'
      }
      if ( minutes === 0 ) {
        minutes = 1
      }
      return Math.round( minutes ) + ' min read'
    }
  }

}
