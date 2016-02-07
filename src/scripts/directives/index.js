'use strict'
import a               from './a'
import backgroundImage from './backgroundImage'
import backgroundColour from './backgroundColour'
import backgroundPosition from './backgroundPosition'
import bodyClass       from './bodyClass'
import content         from './content'
import cookieConsent   from './cookieConsent'
import disqus          from './disqus'
import elastic         from './elastic'
import floatingLabel   from './floatingLabel'
import headerHeight    from './headerHeight'
import highlight       from './highlight'
import likeWhatYouSee  from './likeWhatYouSee'
import loading         from './loading'
import mainNav         from './mainNav'
import metaTags        from './metaTags'
import preventOrphans  from './preventOrphans'
import readingTime     from './readingTime'
import uiSrefActiveIf  from './uiSrefActiveIf'
import workItem        from './workItem'
import zoom            from './zoom'

var appDirectives = angular.module( 'appDirectives', [] )
  .directive( 'a',               a )
  .directive( 'backgroundColour', backgroundColour )
  .directive( 'backgroundImage', backgroundImage )
  .directive( 'backgroundPosition', backgroundPosition )
  .directive( 'bodyClass',       bodyClass )
  .directive( 'content',         content )
  .directive( 'cookieConsent',   cookieConsent )
  .directive( 'disqus',          disqus )
  .directive( 'elastic',         elastic )
  .directive( 'floatingLabel',   floatingLabel )
  .directive( 'headerHeight',    headerHeight )
  .directive( 'highlight',       highlight )
  .directive( 'likeWhatYouSee',  likeWhatYouSee )
  .directive( 'loading',         loading )
  .directive( 'mainNav',         mainNav )
  .directive( 'metaTags',        metaTags )
  .directive( 'preventOrphans',  preventOrphans )
  .directive( 'readingTime',     readingTime )
  .directive( 'uiSrefActiveIf',  uiSrefActiveIf )
  .directive( 'workItem',        workItem )
  .directive( 'zoom',            zoom )

export default appDirectives
