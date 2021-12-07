import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShows } from '../redux/slices/showSlice'
import { fetchNewEpisodes } from '../redux/slices/episodeSlice'
import { playUris } from 'services/spotify'
import Header from 'components/Header'
import Player from 'components/Player'
import UserShow from 'components/UserShow'
import UserEpisode from 'components/UserEpisode'
import Loader from 'components/Loader'

const Dashboard = () => {
  const dispatch            = useDispatch()
  const showsList           = useSelector(state => state.shows.list)
  const showsFetchStatus    = useSelector(state => state.shows.status)
  const newEpisodesList     = useSelector(state => state.episodes.list)
  const episodesFetchStatus = useSelector(state => state.episodes.status)

  const [playingUris, setPlayingUris] = useState([])
  const [togglePlayer, setTogglePlayer]   = useState(false)

  useEffect(() => {
    dispatch(fetchShows())
  }, [dispatch])

  useEffect(() => {
    if(showsList) {
      dispatch(fetchNewEpisodes())
    }
  }, [showsList, dispatch])

  const playShow = (show) => {
    setTogglePlayer(true)

    setTimeout(() => {
      setPlayingUris([show.uri])
    }, 250)
  }

  const playEpisode = (episode) => {
    setTogglePlayer(true)

    setTimeout(() => {
      playUris([episode.uri])
    }, 250)
  }

  return (
    <div className="dashboard">
      <Header text="Your home" setTogglePlayer={setTogglePlayer} />

      { showsFetchStatus === 'loading'  ?
          <div className="min-w-full min-h-64 -mx-8 bg-lime-500 bg-opacity-75 mb-8 py-14">
            <Loader />
          </div>
        :
        <div className="flex overflow-x-scroll min-w-full bg-lime-500 mb-8 hide-scroll-bar -mx-8 pr-5 lg:rounded-lg">
          <div className="flex flex-nowrap min-w-full px-3 pl-6 py-6">
            {showsList?.map((show, i ,arr) => (
              <UserShow
                show={show}
                key={show.uri}
                playShow={playShow}
                last={arr.length - 1 === i}
              />
            ))}
          </div>
        </div>
      }

      <div className="">
        <h2 className="text-xl font-heading font-black mb-5">New in your queue</h2>
        { episodesFetchStatus === 'loading' ?
          <Loader />
        :
          <>
            {newEpisodesList?.map(episode => (
              <UserEpisode
                episode={episode}
                key={episode.uri}
                playEpisode={playEpisode}
              />
            ))}
          </>
        }
      </div>

      { togglePlayer &&
        <Player trackUris={playingUris} />
      }
    </div>
  )
}

export default Dashboard