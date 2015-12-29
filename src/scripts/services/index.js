'use strict'

import readingTime    from './readingTime'

var appServices = angular.module( 'appServices', [] )
  .service( 'readingTime',    readingTime )

export default appServices
