'use strict'

export default function( $compile ) {
  return {
    restrict: 'AE',
    replace: true,
    template: '',
    compile: function( $elem, attr ) {
      var $label = angular.element( $elem[0].querySelector( 'label' ) )
      var $input = angular.element( $elem[0].querySelector( 'input,textarea' ) )
      var id = attr.floatingLabel
      var text = $label.text()

      $elem.removeAttr( 'floating-label' )

      $input.attr( 'id', id )
      $input.attr( 'ng-model', id )
      $input.attr( 'placeholder', text )

      $label.attr( 'ng-class', '{\'show-hide\' : true}' )
      $label.attr( 'ng-show', id )
      $label.attr( 'for', id )

      return {
        post: function postLink( $scope, $linkElem ) {
          $compile( $linkElem )( $scope )
        }
      }
    }
  }
}
