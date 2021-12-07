import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from 'components/Header'

const Discover = () => {
  const accessToken = useSelector(state => state.auth.accessToken)

  const [playingTrack, setPlayingTrack] = useState()

  const playShow = (show) => {
    setPlayingTrack(show)
  }

  return (
    <div className="dashboard">
      <Header text="Your discoveries" />

      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar -mx-8 min-w-full">
        <div className="flex flex-nowrap bg-gray-200 rounded-md bg-opacity-75 px-3 py-6">
       
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-cabin mb-2">Work in progress..</h2>
      </div>

      {/* <div className="dashboard__player">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div> */}
    </div>
  )
}

export default Discover