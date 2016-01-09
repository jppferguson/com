'use strict'
import a               from './a'
import backgroundImage from './backgroundImage'
import backgroundColour from './backgroundColour'
import cookieConsent   from './cookieConsent'
import elastic         from './elastic'
import floatingLabel   from './floatingLabel'
import headerHeight    from './headerHeight'
import highlight       from './highlight'
import likeWhatYouSee  from './likeWhatYouSee'
import loading         from './loading'
import mainNav         from './mainNav'
import preventOrphans  from './preventOrphans'
import readingTime     from './readingTime'
import uiSrefActiveIf  from './uiSrefActiveIf'
import workItem        from './workItem'

var appDirectives = angular.module( 'appDirectives', [] )
  .directive( 'a',               a )
  .directive( 'backgroundColour', backgroundColour )
  .directive( 'backgroundImage', backgroundImage )
  .directive( 'cookieConsent',   cookieConsent )
  .directive( 'elastic',         elastic )
  .directive( 'floatingLabel',   floatingLabel )
  .directive( 'headerHeight',    headerHeight )
  .directive( 'highlight',       highlight )
  .directive( 'likeWhatYouSee',  likeWhatYouSee )
  .directive( 'loading',         loading )
  .directive( 'mainNav',         mainNav )
  .directive( 'preventOrphans',  preventOrphans )
  .directive( 'readingTime',     readingTime )
  .directive( 'uiSrefActiveIf',  uiSrefActiveIf )
  .directive( 'workItem',        workItem )

export default appDirectives
