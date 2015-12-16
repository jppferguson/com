'use strict'

import notify from 'gulp-notify'
import util   from 'gulp-util'

module.exports = function( error ) {

  if ( !global.isProduction && typeof error === 'object' ) {

    notify.onError( {
      title: 'GulpJS',
      subtitle: 'Compile Error',
      message: '<%= error.message %>',
      sound: 'Pop'
    } )( error )
    this.emit( 'end' )

  } else {

    util.log(
      util.colors.bgRed.black( ' ERROR ' ),
      util.colors.red( error )
    )
    process.exit( 1 )

  }

}
