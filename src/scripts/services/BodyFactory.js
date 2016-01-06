'use strict'

export default function( $rootScope ) {
  var scope = $rootScope.$new( true )
  scope.nav = { inView: true }
  return scope
}
