import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ trackUris })  => {
  const accessToken = useSelector(state => state.auth.accessToken)

  const [play, setPlay] = useState(false)

  console.log('Playing URIs:', trackUris)

  useEffect(() => {
    setPlay(true)
  }, [trackUris])

  if (!accessToken) return null
  
  return (
    <div className="dashboard__player block fixed inset-x-0 bottom-20 z-10 border-b border-lime-700">
      <SpotifyPlayer
        token={accessToken}
        callback={state => !state.isPlaying && setPlay(false)}
        play={play}
        uris={trackUris}
        syncExternalDevice={false}
        styles={{
          activeColor: '#000',
          bgColor: '#E3E1D2',
          color: '#121212',
          loaderColor: '#121212',
          sliderColor: '#5984F8',
          trackArtistColor: '#121212',
          trackNameColor: '#121212',
        }}
      />
    </div>
  )
}

export default Player