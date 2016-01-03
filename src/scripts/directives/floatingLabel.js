'use strict'

export default function( $compile ) {
  return {
    restrict: 'AE',
    replace: true,
    template: '',
    compile: function( $elem, attr ) {
      var $label = angular.element( $elem[0].querySelector( 'label' ) )
      var $input = angular.element( $elem[0].querySelector( '.form-control' ) )
      var id = attr.floatingLabel
      var text = $label.text()

      $elem.removeAttr( 'floating-label' )

      $input.attr( 'id', id )
      $input.attr( 'ng-model', id )
      if( $input[0].nodeName === 'SELECT' ) {
        $input.prepend(angular.element('<option value="" disabled>' + text + '</option>'))
      } else {
        $input.attr( 'placeholder', text )
      }

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
