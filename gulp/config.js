
var config       = {}
var src          = 'src'
var dest         = 'dist'

// used for linting
config.gulpPath = './gulp'

// this file
config.configFile = 'gulp/config.js'

// setup settings object
config.settings = {}
config.settings.autoprefixer = [
  'Android >= 2.3',
  'BlackBerry >= 7',
  'Chrome >= 9',
  'Firefox >= 4',
  'Explorer >= 9',
  'iOS >= 5',
  'Opera >= 11',
  'Safari >= 5',
  'OperaMobile >= 11',
  'OperaMini >= 6',
  'ChromeAndroid >= 9',
  'FirefoxAndroid >= 4',
  'ExplorerMobile >= 9'
]
config.settings.minify = false
config.settings.sourceMaps = true

// setup sources object
config.sources = {}
config.sources.root = src

config.sources.www = {}
config.sources.www.root = src + '/public'
config.sources.www.glob = [
  config.sources.www.root + '/**/*',
  '!' + config.sources.www.root + '/.gitkeep'
]

config.sources.fonts = {}
config.sources.fonts.root = src + '/fonts'
config.sources.fonts.glob = config.sources.fonts.root + '/**/*'

config.sources.favicon = {}
config.sources.favicon.root = src + '/favicon'
config.sources.favicon.appName = 'Jamie Ferguson'
config.sources.favicon.master = config.sources.favicon.root + '/favicon.png'
config.sources.favicon.dataFile = config.sources.favicon.root + '/_data.json'

config.sources.icons = {}
config.sources.icons.root = src + '/icons'
config.sources.icons.className = 'icon'
config.sources.icons.defaultWidth = '128px'
config.sources.icons.defaultHeight = '128px'
config.sources.icons.fontName = 'iconfont'
config.sources.icons.fontPath = '../fonts/'
config.sources.icons.formats = [ 'ttf', 'eot', 'woff' ]
config.sources.icons.sassFile = '_icons.scss'
config.sources.icons.template = config.sources.icons.root + '/_template.scss'
config.sources.icons.glob = config.sources.icons.root + '/**/*.svg'

config.sources.images = {}
config.sources.images.root = src + '/images'
config.sources.images.glob = config.sources.images.root + '/**/*'

config.sources.scripts = {}
config.sources.scripts.root = src + '/scripts'
config.sources.scripts.config = config.sources.scripts.root + '/config'
config.sources.scripts.glob = config.sources.scripts.root + '/**/*.js'
config.sources.scripts.modernizr = {}
config.sources.scripts.modernizr.tests = [
  'css/flexbox',
  'css/flexboxlegacy',
  'css/flexboxtweener',
  'css/vhunit',
  'flexbox',
  'flexboxlegacy',
  'flexboxtweener',
  'svg',
  'vhunit',
  'touchevents'
]
config.sources.scripts.modernizr.options = [
  'setClasses',
  'html5shiv'
]
config.sources.scripts.build = [
  config.sources.scripts.root + '/app.js'
]

config.sources.styles = {}
config.sources.styles.root = src + '/stylesheets'
config.sources.styles.glob = '**/*.scss'
config.sources.styles.build = [
  config.sources.styles.root + '/main.scss'
]

config.sources.templates = {}
config.sources.templates.root = src + '/templates'
config.sources.templates.ext = 'jade'
config.sources.templates.watch = config.sources.templates.root + '/**/*.' + config.sources.templates.ext
config.sources.templates.build = [
  config.sources.templates.watch,
  '!' + config.sources.templates.root + '/includes/*.' + config.sources.templates.ext
]


config.sources.tests = {}
config.sources.tests.root = 'test'
config.sources.tests.glob = config.sources.scripts.root + '/**/*.spec.js'
config.sources.tests.karma = {
  configFile: __dirname + '/../karma.conf.js',
  browsers: [ 'PhantomJS' ],
  mochaReporter: {
    output: 'minimal'
  }
}


// setup destinations object
config.destinations = {}
config.destinations.root = dest
config.destinations.bundle = 'app.js'
config.destinations.assets = dest + '/assets'
config.destinations.favicon = config.destinations.assets + '/favicon'
config.destinations.fonts = config.destinations.assets + '/fonts'
config.destinations.images = config.destinations.assets + '/img'
config.destinations.scripts = config.destinations.assets + '/js'
config.destinations.styles = config.destinations.assets + '/css'
config.destinations.stylesheet = config.destinations.styles + '/main.css'
config.destinations.templates = dest

module.exports = config
