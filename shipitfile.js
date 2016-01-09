module.exports = function ( shipit ) {
  var sshPort = process.env.SSH_PORT ? parseInt( process.env.SSH_PORT ) : 22

  require( 'shipit-deploy' )( shipit )

  shipit.initConfig( {

    default: {
      workspace: '/tmp/deploy_jppferguson_com',
      dirToCopy: 'dist',
      deployTo: '/tmp/deploy_to',
      currentPath: 'html',
      repositoryUrl: 'https://github.com/jppferguson/com.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 5,
      shallowClone: true,
      postNpmInstall: 'gulp prod',
      npm: {
        remote: false
      }
    },

    development: {
      branch: 'development',
      deployTo: '/var/www/site/stage.jppf.dev',
      keepReleases: 2,
      servers: 'deploy@jcloud.dvm',
      postNpmInstall: 'gulp prod'
    },

    staging: {
      branch: 'staging',
      deployTo: '/var/www/staging.jppferguson.com',
      keepReleases: 2,
      servers: 'deploy@utopia.digo.jppferguson.com:' + sshPort,
      postNpmInstall: 'gulp prod'
    },

    production: {
      branch: 'master',
      deployTo: '/var/www/jppferguson.com',
      servers: 'deploy@utopia.digo.jppferguson.com:' + sshPort,
      postNpmInstall: 'gulp prod'
    }

  } )

  // Events
  .on( 'fetched', function() {
    shipit.start( 'npm:copy' )
  } )
  .on( 'npm_copied', function() {
    shipit.start( 'npm:install' )
  } )
  .on( 'npm_installed', function() {
    if( typeof shipit.config.postNpmInstall === 'string' ) {
      shipit.start( 'npm:post-install' )
    }
  } )


  // Tasks
  shipit.blTask('npm:copy', function () {
    shipit.local( 'ln -s ${PWD}/node_modules ' + shipit.config.workspace + '/node_modules' )
    shipit.emit( 'npm_copied' )
  } )
  shipit.blTask( 'npm:install', function () {
    return shipit.local( 'cd ' + shipit.config.workspace + ' && npm install' ).then( function ( res ) {
      shipit.emit( 'npm_installed' )
    } ).catch( function ( e ) {
      throw new Error( e )
      process.exit( 1 )
    } )
  } )
  shipit.blTask('npm:post-install', function () {
    return shipit.local( 'cd ' + shipit.config.workspace + ' && ' + shipit.config.postNpmInstall )
  } )
}
