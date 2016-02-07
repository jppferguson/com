'use strict'
import template from './template.jade'

export default function( $location, $log ) {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      appendTitle: '@',
      description: '@',
      thumbnail: '@',
      title: '@',
      type: '@'
    },
    template: template,
    link: function( $scope, $elem, attr ) {
      var charLimit = 160
      $scope.url = $location.absUrl()
      attr.$observe( 'title', function( value ) {
        if ( $scope.appendTitle !== 'false' ) {
          $scope.title = value + ' • Jamie Ferguson'
        }
      } )
      attr.$observe( 'description', function( value ) {
        if ( value.length > charLimit ) {
          $log.debug( 'Meta description is over ' + charLimit + 'chars. The following will be shown in search results:' )
          $log.debug( value.substr( 0, charLimit - 3 ) + '...' )
        }
      } )
      attr.$observe( 'thumbnail', function( value ) {
        if ( !value ) {
          $scope.thumbnail = '/assets/img/jamie-ferguson.jpg'
        }
      } )
    }
  }
}
