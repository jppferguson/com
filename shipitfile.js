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
      branch: 'staging',
      deployTo: '/var/www/staging.jppferguson.com',
      servers: 'deploy@utopia.digo.jppferguson.com:' + sshPort,
      postNpmInstall: 'gulp prod'
    },

    craptest: {
      deployTo: '/var/www/staging.jppferguson.com2',
      repositoryUrl: 'https://github.com/jppferguson/com.git',
      servers: 'deploy@utopia222.digo.jppferguson.com:' + sshPort,
      postNpmInstall: 'gulp prod'
    }

  } )

  // Events
  .on( 'fetched', function() {
    shipit.start( 'npm:install' )
  } )
  .on( 'npm_installed', function() {
    if( typeof shipit.config.postNpmInstall === 'string' ) {
      shipit.start( 'npm:post-install' )
    }
  } )


  // Tasks
  shipit.blTask( 'npm:install', function () {
    return shipit.local( 'npm install' ).then( function ( res ) {
      shipit.emit( 'npm_installed' )
      return res.child.stdout
    } ).catch( function ( e ) {
      throw new Error( e )
      process.exit( 1 )
    } )
  } )
  shipit.blTask('npm:post-install', function () {
    return shipit.local( shipit.config.postNpmInstall )
  } )
}
