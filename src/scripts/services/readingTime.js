'use strict'

export default function() {

  var formats = {
    value: function( time ) {
      return time
    },

    text: function( time ) {
      var result = ''

      if ( !time.minutes && !time.seconds ) {
        result = result + 'moment'
      }

      if ( time.minutes ) {
        result = result + time.minutes + ' min. '
      }

      if ( time.seconds ) {
        result = result + time.seconds + ' sec. '
      }

      return result
    }
  }

  return {
    get: function( text = '', custom ) {
      var words  = text.trim().split( /\s+/g ).length
      var wps    = ( custom && custom.wordsPerMinute || 210 ) / 60
      var rts    = words / wps
      var format = custom && custom.format || 'text'
      var mins   = Math.floor( rts / 60 )
      var secs   = Math.round( rts - mins * 60 )
      return formats[ format ].call( this, {
        minutes: mins,
        seconds: secs
      } )
    }
  }

}
