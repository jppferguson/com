'use strict'
import template from './template.jade'

export default function() {
  return {
    restrict: 'AE',
    replace: false,
    transclude: true,
    template: template
  }
}
