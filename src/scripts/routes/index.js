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
import pageWorkSingle    from '../pages/workSingle.jade'
import pageContact       from '../pages/contact.jade'

export default appRoutes.config( [ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise( '/404' )

  // From: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-make-a-trailing-slash-optional-for-all-routes
  $urlRouterProvider.rule( function( $injector, $location ) {
    var path = $location.url()

    // check to see if the path already has a slash where it should be
    if ( path[ path.length - 1 ] === '/' || path.indexOf( '/?' ) > -1 ) {
      return null
    }

    if ( path.indexOf( '?' ) > -1 ) {
      return path.replace( '?', '/?' )
    }

    return path + '/'
  } )

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
      template: pageIndex
    } )
    .state( 'site.journal', {
      abstract: true,
      template: '<ui-view/>',
      url: 'journal/'
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
      url: 'work/'
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
      template: pageProfile
    } )
    .state( 'site.contact', {
      url: 'contact/',
      template: pageContact
    } )
    .state( 'site.legals', {
      url: 'legals/',
      controller: 'PageCtrl',
      template: pageGeneral
    } )
    .state( 'site.privacy', {
      url: 'privacy/',
      controller: 'PageCtrl',
      template: pageGeneral
    } )
    .state( 'site.sitemap', {
      url: 'sitemap/',
      controller: 'PageCtrl',
      template: pageGeneral
    } )
    .state( 'site.styleguide', {
      url: 'styleguide/',
      template: pageStyleguide
    } )
    .state( 'site.404', {
      url: '404/',
      template: page404
    } )

} ] )
