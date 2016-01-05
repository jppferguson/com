'use strict'

import JournalFactory from './JournalFactory'
import MediaFactory   from './MediaFactory'
import PageFactory    from './PageFactory'
import readingTime    from './readingTime'
import WorkFactory    from './WorkFactory'

var appServices = angular.module( 'appServices', [] )
  .service( 'readingTime',    readingTime )
  .service( 'JournalFactory', JournalFactory )
  .service( 'MediaFactory',   MediaFactory )
  .service( 'PageFactory',    PageFactory )
  .service( 'WorkFactory',    WorkFactory )

export default appServices
