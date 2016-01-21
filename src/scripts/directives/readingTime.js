'use strict'

export default function( readingTime ) {
  return {
    replace: true,
    restrict: 'A',
    scope: {
      textToRead: '=',
      wordsPerMinute: '@?',
      format: '@?'
    },
    template: '<span>{{txt}}</span>',
    link: function( $scope ) {
      $scope.$watch( function() {
        return $scope.textToRead
      }, function( text ) {
        $scope.txt = readingTime.get( text, $scope.wordsPerMinute )
      } )
    }
  }
}
