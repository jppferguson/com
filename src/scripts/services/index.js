'use strict'

import JournalFactory from './JournalFactory'
import PageFactory    from './PageFactory'
import readingTime    from './readingTime'
import WorkFactory    from './WorkFactory'

var appServices = angular.module( 'appServices', [] )
  .service( 'readingTime',    readingTime )
  .service( 'JournalFactory', JournalFactory )
  .service( 'PageFactory',    PageFactory )
  .service( 'WorkFactory',    WorkFactory )

export default appServices
