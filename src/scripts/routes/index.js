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

export default appRoutes.config( function( $stateProvider, $urlRouterProvider ) {

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
        journalArticles: function( JournalFactory ) {
          return JournalFactory.latest()
        },
        pageContentIndex: function( PageFactory ) {
          return PageFactory.get( 'index' )
        },
        pageContentProfile: function( PageFactory ) {
          return PageFactory.get( 'profile' )
        },
        workItems: function( WorkFactory ) {
          return WorkFactory.getFeatured()
        }
      },
      data: {
        bodyClass: 'home'
      }
    } )

    // Journal Routes
    .state( 'site.journal', {
      abstract: true,
      template: '<ui-view/>',
      url: 'journal/',
      data: {
        bodyClass: 'journal'
      }
    } )
    .state( 'site.journal.index', {
      url: '',
      controller: 'JournalCtrl',
      resolve: {
        articles: function( JournalFactory ) {
          return JournalFactory.latest()
        },
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'journal' )
        }
      },
      template: pageJournal
    } )
    .state( 'site.journal.tag', {
      url: 'tag/:tag/',
      controller: 'JournalTagCtrl',
      resolve: {
        journalItems: function( JournalFactory, $stateParams ) {
          return JournalFactory.tag( $stateParams.tag )
        }
      },
      template: pageJournalTag
    } )
    .state( 'site.journal.post', {
      url: 'article/:slug/',
      controller: 'JournalSingleCtrl',
      resolve: {
        journalItem: function( JournalFactory, $stateParams ) {
          return JournalFactory.single( $stateParams.slug )
        }
      },
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
      template: pageWork,
      resolve: {
        workItems: function( WorkFactory ) {
          return WorkFactory.get()
        },
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'work' )
        }
      }
    } )
    .state( 'site.work.post', {
      url: ':slug/',
      controller: 'WorkSingleCtrl',
      resolve: {
        workItem: function( WorkFactory, $stateParams ) {
          return WorkFactory.single( $stateParams.slug )
        }
      },
      template: pageWorkSingle
    } )

    .state( 'site.profile', {
      url: 'profile/',
      controller: 'PageCtrl',
      template: pageProfile,
      resolve: {
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'profile' )
        }
      },
      data: {
        bodyClass: 'profile'
      }
    } )
    .state( 'site.contact', {
      url: 'contact/',
      controller: 'PageCtrl',
      resolve: {
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'contact' )
        }
      },
      template: pageContact,
      data: {
        bodyClass: 'contact'
      }
    } )
    .state( 'site.styleguide', {
      url: 'styleguide/',
      resolve: {
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'styleguide' )
        }
      },
      template: pageStyleguide,
      data: {
        bodyClass: 'styleguide'
      }
    } )
    .state( 'site.stuff', {
      url: 'stuff/',
      resolve: {
        pageContent: function( PageFactory ) {
          return PageFactory.get( 'stuff' )
        }
      },
      template: pageStuff,
      data: {
        bodyClass: 'stuff'
      }
    } )
    .state( 'site.404', {
      url: '404/',
      resolve: {
        pageContent: function( PageFactory ) {
          return PageFactory.get( '404' )
        }
      },
      template: page404,
      data: {
        bodyClass: 'page-404'
      }
    } )
    // automagic pages
    .state( 'site.page', {
      url: ':page/',
      controller: 'PageCtrl',
      resolve: {
        pageContent: function( PageFactory, $stateParams ) {
          return PageFactory.get( $stateParams.page )
        }
      },
      template: pageGeneral,
      data: {
        bodyClass: 'page'
      }
    } )
} )
