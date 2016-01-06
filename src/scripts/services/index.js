'use strict'

import BodyFactory    from './BodyFactory'
import JournalFactory from './JournalFactory'
import MediaFactory   from './MediaFactory'
import PageFactory    from './PageFactory'
import readingTime    from './readingTime'
import ScrollFactory  from './ScrollFactory'
import WorkFactory    from './WorkFactory'

var appServices = angular.module( 'appServices', [] )
  .service( 'readingTime',    readingTime )
  .factory( 'BodyFactory',    BodyFactory )
  .service( 'JournalFactory', JournalFactory )
  .service( 'MediaFactory',   MediaFactory )
  .service( 'PageFactory',    PageFactory )
  .factory( 'ScrollFactory',  ScrollFactory )
  .service( 'WorkFactory',    WorkFactory )

export default appServices
