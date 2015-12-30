module.exports = function ( shipit ) {
  require( 'shipit-deploy' )( shipit )
  require( 'shipit-npm' )( shipit )

  shipit.initConfig( {

    default: {
      workspace: '/tmp/deploy_jppferguson_com',
      dirToCopy: 'dist',
      deployTo: '/tmp/deploy_to',
      currentPath: 'www',
      repositoryUrl: 'https://github.com/jppferguson/com.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      // key: '/path/to/key',
      shallowClone: true,
      postNpmInstall: 'gulp prod',
      npm: {
        remote: false
      }
    },

    development: {
      // branch: 'development',
      deployTo: '/var/www/site/stage.jppf.dev',
      servers: 'deploy@jcloud.dvm',
      postNpmInstall: 'gulp prod'
    },

    staging: {
      // branch: 'staging',
      deployTo: '/var/www/staging.jppferguson.com',
      servers: 'deploy@utopia.digo.jppferguson.com',
      postNpmInstall: 'gulp prod'
    }

  } )

  // Events
  .on( 'npm_installed', function() {
    if( typeof shipit.config.postNpmInstall === 'string' ) {
      shipit.start( 'post-npm-install' )
    }
  } )

  // Tasks
  shipit.blTask('post-npm-install', function () {
    //postNpmInstall: 'gulp --env="{environment_name}"'
    //the NG_ENV environment var is not necessary here but should be set in our CI scripts before running shipit deploy. eg NG_ENV={environment_name} shipit {environment_name} deploy

    var postNpmRemote = typeof shipit.config.npm !== 'undefined' ? shipit.config.npm.remote !== false : true
    var method = postNpmRemote ? 'remote' : 'local'
    var postNpmInstallPath = postNpmRemote ? shipit.releasePath || shipit.currentPath : shipit.config.workspace
    return shipit[ method ]( 'cd '+postNpmInstallPath+' && '+shipit.config.postNpmInstall )
  } )
}
