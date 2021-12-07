import { useState } from 'react'
import { useSelector } from 'react-redux'
import Player from 'components/Player'
import Header from 'components/Header'
import Loader from 'components/Loader'
import { ReactComponent as PlayIcon } from 'assets/svg/play.svg'

const Subscriptions = () => {
  const newEpisodesList     = useSelector(state => state.episodes.list)
  const episodesFetchStatus = useSelector(state => state.episodes.status)
  const [playingTrack, setPlayingTrack] = useState()

  const playShow = (show) => {
    setPlayingTrack(show)
  }

  return (
    <div className="dashboard">
      <Header text="Your subscriptions" />

      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar -mx-8 min-w-full">
        <div className="flex flex-nowrap bg-gray-200 rounded-md bg-opacity-75 px-3 py-6">
       
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-cabin mb-2">Work in progress..</h2>
      </div>
    </div>
  )
}

export default Subscriptions