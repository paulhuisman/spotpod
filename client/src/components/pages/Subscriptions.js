import { useState } from 'react'
import { useSelector } from 'react-redux'
import Player from 'components/snippets/Player'
import Loader from 'components/snippets/Loader'
import { ReactComponent as PlayIcon } from 'assets/svg/play.svg'

const Subscriptions = () => {
  const newEpisodesList     = useSelector(state => state.episodes.list);
  const episodesFetchStatus = useSelector(state => state.episodes.status);
  const [playingTrack, setPlayingTrack] = useState()

  function playShow(show) {
    setPlayingTrack(show)
  }

  return (
    <div className="dashboard">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-cabin">Your queue</h1>
        <button className="rounded-lg bg-blue-500 text-white px-2">Play queue</button>
      </div>

      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar -mx-8 min-w-full">
        <div className="flex flex-nowrap bg-gray-200 rounded-md bg-opacity-75 px-3 py-6">
       
        </div>
      </div>

      <div className="">
        <h2 className="text-xl font-cabin mb-2">New in your queue</h2>
      </div>

      <div className="dashboard__player">
        <Player trackUri={playingTrack?.uri} />
      </div>
    </div>
  )
}

export default Subscriptions