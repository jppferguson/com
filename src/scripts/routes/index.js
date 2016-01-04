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
      resolve: {
        $title: function() { return 'Welcome - ' }
      }
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
      template: pageJournal,
      resolve: {
        $title: function() { return 'Journal - ' }
      }
    } )
    .state( 'site.journal.tag', {
      url: 'tag/:tag/',
      controller: 'JournalTagCtrl',
      template: pageJournalTag,
      resolve: {
        postTitle: [ '$stateParams', function( $stateParams ) {
          return $stateParams.tag
        } ],
        $title: [ 'postTitle', function( postTitle ) {
          return postTitle + ' - '
        } ]
      }
    } )
    .state( 'site.journal.post', {
      url: 'article/:slug/',
      controller: 'JournalSingleCtrl',
      template: pageJournalSingle,
      resolve: {
        postTitle: [ '$stateParams', 'JournalFactory', function( $stateParams, JournalFactory ) {
          return JournalFactory.single( $stateParams.slug ).then( function( item ) {
            return item.title.rendered
          })
        } ],
        $title: [ 'postTitle', function( postTitle ) {
          return postTitle + ' - '
        } ]
      }
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
      template: pageWork,
      resolve: {
        $title: function() { return 'Work - ' }
      }
    } )
    .state( 'site.work.post', {
      url: ':slug/',
      controller: 'WorkSingleCtrl',
      template: pageWorkSingle,
      resolve: {
        postTitle: [ '$stateParams', 'WorkFactory', function( $stateParams, WorkFactory ) {
          return WorkFactory.single( $stateParams.slug ).then( function( item ) {
            return item.title.rendered
          })
        } ],
        $title: [ 'postTitle', function( postTitle ) {
          return postTitle + ' - '
        } ]
      }
    } )

    .state( 'site.profile', {
      url: 'profile/',
      controller: 'PageCtrl',
      template: pageProfile,
      resolve: {
        $title: function() { return 'Profile - ' }
      }
    } )
    .state( 'site.contact', {
      url: 'contact/',
      template: pageContact,
      resolve: {
        $title: function() { return 'Contact - ' }
      }
    } )
    .state( 'site.styleguide', {
      url: 'styleguide/',
      template: pageStyleguide,
      resolve: {
        $title: function() { return 'Style Guide - ' }
      }
    } )
    .state( 'site.404', {
      url: '404/',
      template: page404,
      resolve: {
        $title: function() { return 'Error 404 - ' }
      }
    } )
    // automagic pages
    .state( 'site.page', {
      url: ':page/',
      controller: 'PageCtrl',
      template: pageGeneral,
      resolve: {
        pageTitle: [ '$stateParams', 'PageFactory', function( $stateParams, PageFactory ) {
          return PageFactory.get( $stateParams.page ).then( function( item ) {
            return item.title.rendered
          })
        } ],
        $title: [ 'pageTitle', function( pageTitle ) {
          return pageTitle + ' - '
        } ]
      }
    } )
} ] )
