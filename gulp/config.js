
var config       = {}
var src          = 'src'
var dest         = 'dist'

// used for linting
config.gulpPath = './gulp'

// setup settings object
config.settings = {}
config.settings.autoprefixer = 'last 2 versions'
config.settings.minify = false
config.settings.sourceMaps = true

// setup sources object
config.sources = {}
config.sources.root = src

config.sources.www = {}
config.sources.www.root = src + '/public'
config.sources.www.glob = [
  config.sources.www.root + '/**/*',
  config.sources.www.root + '/.htaccess'
]

config.sources.fonts = {}
config.sources.fonts.root = src + '/fonts'
config.sources.fonts.glob = config.sources.fonts.root + '/**/*'

config.sources.icons = {}
config.sources.icons.root = src + '/icons'
config.sources.icons.className = 'icon'
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
config.sources.scripts.glob = config.sources.scripts.root + '/**/*.js'
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
config.sources.tests.glob = config.sources.tests.root + '/**/*.spec.js'
config.sources.tests.karma = {
  configFile: __dirname + '/../' + config.sources.tests.root + '/karma.conf.js',
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
config.destinations.fonts = config.destinations.assets + '/fonts'
config.destinations.images = config.destinations.assets + '/img'
config.destinations.scripts = config.destinations.assets + '/js'
config.destinations.styles = config.destinations.assets + '/css'
config.destinations.stylesheet = config.destinations.styles + '/main.css'
config.destinations.templates = dest

module.exports = config
