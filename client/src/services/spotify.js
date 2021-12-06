import store from 'redux/store'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID 
})

export const playUris = async (trackUris) => {
  const state = store.getState()

  spotifyApi.setAccessToken(state.auth.accessToken)

  // W.I.P.
  spotifyApi.getMyDevices()
    .then(data => {
      if(typeof data.body.devices[0] !== 'undefined' && data.body.devices[0].id) {
        fetch(`${process.env.REACT_APP_SPOTIFY_API_URL}?device_id=${data.body.devices[0].id}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: trackUris }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.auth.accessToken}`
          },
        })
      }
    }, err => {
      console.log('Error:', err)
    })

  return null
}