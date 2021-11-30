import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchShows } from '../../redux/slices/showSlice'
import { fetchNewEpisodes } from '../../redux/slices/episodeSlice'
import Player from '../snippets/Player'
import UserShow from '../snippets/UserShow'
import UserEpisode from '../snippets/UserEpisode'
import Loader from 'components/snippets/Loader'
import Button from 'components/snippets/Button'
import { ReactComponent as PlayIcon } from 'assets/svg/play.svg'

const Dashboard = () => {
  const dispatch            = useDispatch()
  const showsList           = useSelector(state => state.shows.list);
  const showsFetchStatus    = useSelector(state => state.shows.status);
  const newEpisodesList     = useSelector(state => state.episodes.list);
  const episodesFetchStatus = useSelector(state => state.episodes.status);

  const [playingUris, setPlayingUris] = useState([])
  const [showPlayer, setShowPlayer]   = useState(false)


  useEffect(() => {
    dispatch(fetchShows())
  }, [dispatch])

  useEffect(() => {
    if(showsList) {
      dispatch(fetchNewEpisodes())
    }
  }, [showsList, dispatch])

  const playShow = (show) => {
    setShowPlayer(true)

    setTimeout(() => {
      setPlayingUris([show.uri])
    }, 200);
  }
  
  const playQueue = () => {
    setShowPlayer(true)

    setPlayingUris(newEpisodesList.map(episode => episode.uri))
  }

  return (
    <div className="dashboard">
      <div className="flex justify-between mb-8 relative">
        <h1 className="text-2xl font-heading font-black">Your home</h1>
        <Button onClick={playQueue} text="Play queue" icon={<PlayIcon />}>Play queue</Button>
      </div>

      { showsFetchStatus === 'loading'  ?
          <div className="min-w-full min-h-64 -mx-8 bg-lime-500 bg-opacity-75 mb-8 py-14">
            <Loader />
          </div>
        :
        <div className="flex overflow-x-scroll bg-lime-500 mb-8 hide-scroll-bar -mx-8 pr-5 min-w-full">
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
                playShow={playShow}
              />
            ))}
          </>
        }
      </div>

      { showPlayer &&
        <Player trackUris={playingUris} />
      }
    </div>
  )
}

export default Dashboard