import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { playUris } from 'services/spotify'
import Player from 'components/Player'
import UserEpisode from 'components/UserEpisode'
import Loader from 'components/Loader'
import Header from 'components/Header'
import { updateOrder } from '../redux/slices/episodeSlice'

const filterTypeLabels = {
  newest: 'Newest first',
  alphabetical: 'Alphabetical',
  // interest: 'Most interesting' 
}

const Queue = () => {
  const dispatch            = useDispatch()
  const newEpisodesList     = useSelector(state => state.episodes.list)
  const listSortType        = useSelector(state => state.episodes.sortType)
  const episodesFetchStatus = useSelector(state => state.episodes.status)

  const [togglePlayer, setTogglePlayer]       = useState(false)
  const [showFilter, setShowFilter]           = useState(false)
  const [queueFilterType, setQueueFilterType] = useState('newest')

  useEffect(() => {
    if(listSortType !== null) {
      setQueueFilterType(listSortType)
    }
  }, [])

  const playEpisode = (episode) => {
    setTogglePlayer(true)
    
    setTimeout(() => {
      playUris([episode.uri])
    }, 100)
  }

  const updateListSort = (sortType) => {
    setShowFilter(false)
    setQueueFilterType(sortType)

    dispatch(updateOrder(sortType))
  }

  return (
    <div className="dashboard">
      <Header text="Your queue" setTogglePlayer={setTogglePlayer} />

      { episodesFetchStatus === 'loading' ?
          <Loader />
        :
          <div className="flex flex-col">
            <div className="flex h-12 w-full animate-fade">
              <div className="w-14 lg:w-20 mr-6 border-r border-black relative">
                <div className="w-14 lg:w-20 pr-6"></div>
              </div>  
              <div className="flex font-bold text-sm lg:text-base relative">
                <div className="mr-2">Sort queue by</div>
                <div onClick={() => setShowFilter(!showFilter)} className="flex align-middle text-orange cursor-pointer">
                  <div className="mr-1">{filterTypeLabels[queueFilterType]}</div>
                  <div className={`${!showFilter ? "-mt-1" : ""}`}><span className={`arrow-down ${showFilter ? "arrow-down--inverted" : ""}`}></span></div>
                </div>
                { showFilter &&
                  <div className="bg-white absolute top-3 right-0 z-50 list-none divide-y divide-gray-100 rounded shadow my-4 animate-fadeFast">
                    <ul className="py-1" aria-labelledby="dropdown">
                      {Object.entries(filterTypeLabels).map(([key, label], i) => (
                        <li className={key} key={key}>
                          <a 
                            onClick={() => updateListSort(key)} 
                            className={`text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 ${queueFilterType === key ? "text-orange" : ""}`}
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
                playEpisode={playEpisode}
                variant="queue"
              />
            ))}
          </div>
      }

      { togglePlayer &&
        <Player />
      }
    </div>
  )
}

export default Queue