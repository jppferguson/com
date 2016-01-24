'use strict'
var appRoutes = angular.module( 'appRoutes', [] )
import siteHeader        from '../pages/siteHeader.jade'
import siteFooter        from '../pages/siteFooter.jade'
import page404           from '../pages/404.jade'
import pageIndex         from '../pages/index.jade'
import pageGeneral       from '../pages/page.jade'
import pageProfile       from '../pages/profile.jade'
import pageJournal       from '../pages/journal.jade'
import pageJournalTag    from '../pages/journalTag.jade'
import pageJournalSingle from '../pages/journalSingle.jade'
import pageStyleguide    from '../pages/styleguide.jade'
import pageWork          from '../pages/work.jade'
import pageStuff         from '../pages/stuff.jade'
import pageWorkSingle    from '../pages/workSingle.jade'
import pageContact       from '../pages/contact.jade'
import RedirectOldRoutes from './RedirectOldRoutes'
import TrailingSlash     from './TrailingSlash'

export default appRoutes.config( [ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

  $urlRouterProvider
    .otherwise( '/404' )
    .rule( RedirectOldRoutes )
    .rule( TrailingSlash )

  $stateProvider
    .state( 'site', {
      url: '/',
      abstract: true,
      views: {
        'site-header': {
          template: siteHeader
        },
        '': {
          template: '<ui-view></ui-view>'
        },
        'site-footer': {
          template: siteFooter
        }
      }
    } )
    .state( 'site.index', {
      url: '',
      controller: 'IndexCtrl',
      template: pageIndex,
      data: {
        bodyClass: 'home'
      }
    } )
    .state( 'site.journal', {
      abstract: true,
      template: '<ui-view/>',
      url: 'journal/',
      data: {
        bodyClass: 'journal'
      }
    } )

    // Journal Routes
    .state( 'site.journal.index', {
      url: '',
      controller: 'JournalCtrl',
      template: pageJournal
    } )
    .state( 'site.journal.tag', {
      url: 'tag/:tag/',
      controller: 'JournalTagCtrl',
      template: pageJournalTag
    } )
    .state( 'site.journal.post', {
      url: 'article/:slug/',
      controller: 'JournalSingleCtrl',
      template: pageJournalSingle
    } )

    // Work Routes
    .state( 'site.work', {
      abstract: true,
      template: '<ui-view/>',
      url: 'work/',
      data: {
        bodyClass: 'work'
      }
    } )
    .state( 'site.work.index', {
      url: '',
      controller: 'WorkCtrl',
      template: pageWork
    } )
    .state( 'site.work.post', {
      url: ':slug/',
      controller: 'WorkSingleCtrl',
      template: pageWorkSingle
    } )

    .state( 'site.profile', {
      url: 'profile/',
      controller: 'PageCtrl',
      template: pageProfile,
      data: {
        bodyClass: 'profile'
      }
    } )
    .state( 'site.contact', {
      url: 'contact/',
      controller: 'PageCtrl',
      template: pageContact,
      data: {
        bodyClass: 'contact'
      }
    } )
    .state( 'site.styleguide', {
      url: 'styleguide/',
      template: pageStyleguide,
      data: {
        bodyClass: 'styleguide'
      }
    } )
    .state( 'site.stuff', {
      url: 'stuff/',
      template: pageStuff,
      data: {
        bodyClass: 'stuff'
      }
    } )
    .state( 'site.404', {
      url: '404/',
      template: page404,
      data: {
        bodyClass: 'page-404'
      }
    } )
    // automagic pages
    .state( 'site.page', {
      url: ':page/',
      controller: 'PageCtrl',
      template: pageGeneral,
      data: {
        bodyClass: 'page'
      }
    } )
} ] )
