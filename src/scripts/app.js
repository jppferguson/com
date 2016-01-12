'use strict'

import angular        from 'angular'
import fastClick      from 'fastclick'
import ngAnimate      from 'angular-animate'
import ngCookies      from 'angular-cookies'
import ngDisqus       from 'angular-disqus/angular-disqus'
import ngGA           from 'angular-google-analytics'
import ngRouter       from 'angular-ui-router'
import ngSanitize     from 'angular-sanitize'

import appConfig      from './_config'
import appRoutes      from './routes'
import appControllers from './controllers'
import appDirectives  from './directives'
import appFilters     from './filters'
import appServices    from './services'

var app

var appDependencies = [
  ngAnimate,
  ngCookies,
  'ngDisqus',
  ngGA.name,
  ngRouter,
  ngSanitize
]
var customModules = [
  appConfig,
  appRoutes,
  appControllers,
  appDirectives,
  appFilters,
  appServices
]

// Add the module name of each custom module to our app dependencies
customModules.forEach( function( model ) {
  appDependencies.push( model.name )
} )

app = angular.module( 'App', appDependencies )

app.config( function( $compileProvider, $disqusProvider, $httpProvider, $interpolateProvider, $locationProvider, $logProvider, $urlMatcherFactoryProvider, AnalyticsProvider, ENV, GA, LOG ) {

  $locationProvider.html5Mode( true )

  // cache by default
  $httpProvider.defaults.cache = true

  // Make a trailing slash optional for all routes
  $urlMatcherFactoryProvider.strictMode( false )

  $disqusProvider.setShortname( 'jppferguson' )

  // Log debug to the console
  $logProvider.debugEnabled( LOG )

  // Debug info, see: <https://docs.angularjs.org/guide/production>
  $compileProvider.debugInfoEnabled( ENV === 'production' )

  // Setup Google Analytics
  AnalyticsProvider
    .setAccount( GA.ACCOUNT )
    .setPageEvent( '$stateChangeSuccess' )
    .disableAnalytics( !GA.ENABLED )
  if( GA.DEBUGMODE ) {
    AnalyticsProvider.enterDebugMode()
  }

  // Use request parameters instead of a json payload
  $httpProvider.defaults.transformRequest = function( data ) {
    if ( typeof data === 'undefined' ) {
      return data
    }
    // return $.param( data )
  }

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded charset=UTF-8'

} )

app.run( [ '$rootScope', '$log', '$anchorScroll', '$window', '$timeout', '$state', 'Analytics', function( $rootScope, $log, $anchorScroll, $window, $timeout, $state, Analytics ) {

  // ensure we scroll to the top on route change
  // From: http://stackoverflow.com/questions/21055952
  var wrap = function( method ) {
    var orig = $window.window.history[ method ]
    $window.window.history[ method ] = function() {
      var retval = orig.apply( this, Array.prototype.slice.call( arguments ) )
      $anchorScroll()
      return retval
    }
  }
  wrap( 'pushState' )
  wrap( 'replaceState' )

  // get rid of iOS' gnarly delay for a more native feel
  fastClick.FastClick.attach( document.body )

  // Output message if GA debug mode is enabled
  if ( Analytics.configuration.debugMode ) {
    $log.info( 'GA debug mode is enabled' )
  }

  // Watch for URL changes so we can track them in GA
  // $rootScope.$on( '$locationChangeSuccess', function( event, next, current ) {
  //   $log.info( next, current )
  // } )
  $rootScope.$on( '$stateChangeError', function $stateChangeError( event, toState, toParams, fromState, fromParams, error ) {
    $log.group()
    $log.error( '$stateChangeError', error )
    $log.error( error.stack )
    $log.info( 'event', event )
    $log.info( 'toState', toState )
    $log.info( 'toParams', toParams )
    $log.info( 'fromState', fromState )
    $log.info( 'fromParams', fromParams )
    $log.groupEnd()
  } )

  function getTitleValue( title ) {
    return angular.isFunction( title ) ? title() : title
  }

  $rootScope.$on( '$stateChangeSuccess', function() {
    var state
    var title = getTitleValue( $state.$current.locals.globals.$title )
    $timeout( function() {
      $rootScope.$title = title
    } )

    $rootScope.$breadcrumbs = []
    state = $state.$current
    while ( state ) {
      if ( state.resolve && state.resolve.$title ) {
        $rootScope.$breadcrumbs.unshift( {
          title: getTitleValue( state.locals.globals.$title ),
          state: state.self.name,
          stateParams: state.locals.globals.$stateParams
        } )
      }
      state = state.parent
    }
  } )

} ] )
