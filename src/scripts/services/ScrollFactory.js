'use strict'

export default function( $rootScope, $window ) {
  var scroll = {
    down: true,
    previous: 0,
    current: 0
  }
  angular.element( $window ).bind( 'scroll', function() {
    scroll.prev    = scroll.current
    scroll.down    = scroll.prev < this.pageYOffset
    scroll.current = this.pageYOffset
    $rootScope.$broadcast( 'scroll:updated', scroll )
  } )

  return scroll

}
