'use strict'

export default function( $scope, $http, $log ) {

  $scope.form = {}
  $scope.sent = false

  $scope.submitForm = function() {
    $http( {
      url: '//wordpress.jppferguson.com/app/themes/jppferguson/contact.php',
      method: 'POST',
      data: JSON.stringify( $scope.form ),
      transformRequest: false,
      headers: { 'Content-Type': undefined } // eslint-disable-line no-undefined
    } ).then( function( resp ) {
      $log.info( resp.data )
      if ( resp.data.success === true ) {
        $scope.sent = true
      }
    } )

  }

}
