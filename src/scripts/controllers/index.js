'use strict'
import CVCtrl            from './CVCtrl'
import FooterCtrl        from './FooterCtrl'
import HeaderCtrl        from './HeaderCtrl'
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
  .controller( 'FooterCtrl',        FooterCtrl )
  .controller( 'HeaderCtrl',        HeaderCtrl )
  .controller( 'PageCtrl',          PageCtrl )
  .controller( 'MusicCtrl',         MusicCtrl )
  .controller( 'IndexCtrl',         IndexCtrl )
  .controller( 'JournalCtrl',       JournalCtrl )
  .controller( 'JournalTagCtrl',    JournalTagCtrl )
  .controller( 'JournalSingleCtrl', JournalSingleCtrl )
  .controller( 'WorkCtrl',          WorkCtrl )
  .controller( 'WorkSingleCtrl',    WorkSingleCtrl )

export default appControllers
