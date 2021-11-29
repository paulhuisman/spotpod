import { useState } from 'react'
import { useSelector } from 'react-redux'
import Player from './Player'
import UserEpisode from './UserEpisode'
import Loader from './Loader'
import { ReactComponent as PlayIcon } from '../assets/svg/play.svg'

const filterTypeLabels = {
  newest: 'Newest first',
  alphabetical: 'Alphabetical',
  interest: 'Most interesting' 
}

const Queue = () => {
  const newEpisodesList     = useSelector(state => state.episodes.list);
  const episodesFetchStatus = useSelector(state => state.episodes.status);

  const [playingTrack, setPlayingTrack]       = useState()
  const [showPlayer, setShowPlayer]           = useState(false)
  const [showFilter, setShowFilter]           = useState(false)
  const [queueFilterType, setQueueFilterType] = useState('newest')

  function playShow(show) {
    setShowPlayer(true)
    setPlayingTrack(show)
  }

  return (
    <div className="dashboard">
      <div className="flex justify-between relative mb-8">
      <h1 className="text-2xl font-heading font-black">Your queue</h1>
        <div className="hidden rounded-full absolute inset-x-auto -top-8 bg-lime-500 h-32 w-32 opacity-50"></div>
        <button className="rounded-xl uppercase font-bold text-xs pl-3 pr-2 bg-gradient-to-r from-blue-300 to-blue-600 text-white px-2">
          <div className="inline mr-2">Play queue</div>
          <PlayIcon />
        </button>
      </div>

      { episodesFetchStatus === 'loading' ?
          <Loader />
        :
          <div className="flex flex-col">
            <div className="flex h-12 w-full animate-fade">
              <div className="w-14 mr-6 border-r border-black relative">
                <div className="w-14 pr-6">&nbsp;</div>
              </div>  
              <div className="flex font-bold text-sm relative">
                <div className="mr-2">Sort queue by</div>
                <div onClick={() => setShowFilter(!showFilter)} className="flex align-middle text-orange">
                  <div className="mr-1">{filterTypeLabels[queueFilterType]}</div>
                  <div className={`${!showFilter ? "-mt-1" : ""}`}><span className={`arrow-down ${showFilter ? "arrow-down--inverted" : ""}`}></span></div>
                </div>
                { showFilter &&
                  <div className="bg-white absolute top-3 right-0 z-50 list-none divide-y divide-gray-100 rounded shadow my-4 animate-fadeFast">
                    <ul className="py-1" aria-labelledby="dropdown">
                      {Object.entries(filterTypeLabels).map(([key, label], i) => (
                        <li className={key} key={key}>
                            <a 
                              onClick={() => {setQueueFilterType(key); setShowFilter(false)}} 
                              className={`text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 ${queueFilterType == key ? "text-orange" : ""}`}
                            >{ label }</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
            </div>  

            {newEpisodesList.map(episode => (
              <UserEpisode
                episode={episode}
                key={episode.uri}
                playShow={playShow}
                queue={true}
              />
            ))}
          </div>
      }

      { showPlayer &&
        <Player trackUris={playingTrack?.uri} />
      }
    </div>
  )
}

export default Queue