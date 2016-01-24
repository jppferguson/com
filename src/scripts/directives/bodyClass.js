'use strict'

export default function( $rootScope ) {
  return {
    restrict: 'A',
    link: function( $scope, $elem ) {
      $rootScope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState ) {
        var fromClassnames = angular.isDefined( fromState.data ) && angular.isDefined( fromState.data.bodyClass ) ? fromState.data.bodyClass : null
        var toClassnames = angular.isDefined( toState.data ) && angular.isDefined( toState.data.bodyClass ) ? toState.data.bodyClass : null

        // don't do anything if they are the same
        if ( fromClassnames !== toClassnames ) {
          if ( fromClassnames ) {
            $elem.removeClass( fromClassnames )
          }

          if ( toClassnames ) {
            $elem.addClass( toClassnames )
          }
        }
      } )
    }
  }
}
