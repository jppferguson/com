'use strict'

import angular        from 'angular'
import markdown       from './markdown'
import newlines       from './newLines'

var appFilters = angular.module( 'appFilters', [] )
  .filter( 'newlines', newlines )
  .filter( 'markdown', markdown )

export default appFilters
