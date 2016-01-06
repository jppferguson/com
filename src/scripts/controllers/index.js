'use strict'
import CVCtrl            from './CVCtrl'
import ContactCtrl       from './ContactCtrl'
import FooterCtrl        from './FooterCtrl'
import MusicCtrl         from './MusicCtrl'
import PageCtrl          from './PageCtrl'
import IndexCtrl         from './IndexCtrl'
import JournalCtrl       from './JournalCtrl'
import JournalTagCtrl    from './JournalTagCtrl'
import JournalSingleCtrl from './JournalSingleCtrl'
import WorkCtrl          from './WorkCtrl'
import WorkSingleCtrl    from './WorkSingleCtrl'

var appControllers = angular.module( 'appControllers', [] )
  .controller( 'CVCtrl',            CVCtrl )
  .controller( 'ContactCtrl',       ContactCtrl )
  .controller( 'FooterCtrl',        FooterCtrl )
  .controller( 'PageCtrl',          PageCtrl )
  .controller( 'MusicCtrl',         MusicCtrl )
  .controller( 'IndexCtrl',         IndexCtrl )
  .controller( 'JournalCtrl',       JournalCtrl )
  .controller( 'JournalTagCtrl',    JournalTagCtrl )
  .controller( 'JournalSingleCtrl', JournalSingleCtrl )
  .controller( 'WorkCtrl',          WorkCtrl )
  .controller( 'WorkSingleCtrl',    WorkSingleCtrl )

export default appControllers
