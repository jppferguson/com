'use strict'

export default function( $scope, $http ) {
  var period = '1month'
  var apiArtists = 'https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=jppferguson&api_key=f83b830e4a70f079db1d33487d3ee59b&limit=5&format=json&period=' + period
  var apiTracks  = 'https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=jppferguson&api_key=f83b830e4a70f079db1d33487d3ee59b&limit=5&format=json&period=' + period
  $http.get( apiArtists ).then( function( resp ) {
    $scope.artists = resp.data.topartists.artist
  } )
  $http.get( apiTracks ).then( function( resp ) {
    $scope.tracks = resp.data.toptracks.track
  } )
}
