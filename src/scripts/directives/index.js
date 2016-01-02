'use strict'
import a               from './a'
import backgroundImage from './backgroundImage'
import elastic         from './elastic'
import floatingLabel   from './floatingLabel'
import likeWhatYouSee  from './likeWhatYouSee'
import loading         from './loading'
import readingTime     from './readingTime'
import uiSrefActiveIf  from './uiSrefActiveIf'
import workItem        from './workItem'

var appDirectives = angular.module( 'appDirectives', [] )
  .directive( 'a',               a )
  .directive( 'backgroundImage', backgroundImage )
  .directive( 'elastic',         elastic )
  .directive( 'floatingLabel',   floatingLabel )
  .directive( 'likeWhatYouSee',  likeWhatYouSee )
  .directive( 'loading',         loading )
  .directive( 'readingTime',     readingTime )
  .directive( 'uiSrefActiveIf',  uiSrefActiveIf )
  .directive( 'workItem',        workItem )

export default appDirectives
