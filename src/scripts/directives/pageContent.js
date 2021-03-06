'use strict'

export default function( $compile ) {
  return {
    restrict: 'AE',
    priority: 1001,
    terminal: true,
    compile: function( $el ) {
      var fn
      $el.removeAttr( 'page-content' ) // necessary to avoid infinite compile loop
      $el.attr( 'highlight', '' )
      $el.attr( 'preventOrphans', '' )
      $el.attr( 'zoom', '' )
      fn = $compile( $el )
      return function( scope ) {
        fn( scope )
      }
    }
  }
}
