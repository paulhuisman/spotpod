import { useState, useEffect} from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { fetchShows } from '../redux/slices/showSlice'
import { fetchNewEpisodes } from '../redux/slices/episodeSlice'
import { playUris } from 'services/spotify'
import ShowInterface from 'interfaces/show'
import EpisodeInterface from 'interfaces/episode'
import Header from 'components/Header'
import Player from 'components/Player'
import UserShow from 'components/UserShow'
import UserEpisode from 'components/UserEpisode'
import Loader from 'components/Loader'

const Dashboard = () => {
  const dispatch            = useDispatch()
  const showsList           = useSelector((state:RootStateOrAny) => state.shows.list)
  const showsFetchStatus    = useSelector((state:RootStateOrAny) => state.shows.status)
  const newEpisodesList     = useSelector((state:RootStateOrAny) => state.episodes.list)
  const episodesFetchStatus = useSelector((state:RootStateOrAny) => state.episodes.status)

  const [playingUris, setPlayingUris]   = useState<string[] | null>([])
  const [togglePlayer, setTogglePlayer] = useState<boolean | null>(false)

  useEffect(() => {
    dispatch(fetchShows())
  }, [dispatch])

  useEffect(() => {
    if(showsList) {
      dispatch(fetchNewEpisodes())
    }
  }, [showsList, dispatch])

  const playShow = (show: ShowInterface) => {
    setTogglePlayer(true)

    setTimeout(() => {
      setPlayingUris([show.uri])
    }, 250)
  }

  const playEpisode = (episode: any) => {
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
            {showsList?.map((show: ShowInterface, i: number, arr: []) => (
              <UserShow
                key={i}
                show={show}
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
            {newEpisodesList?.map((episode: EpisodeInterface, i: number) => (
              <UserEpisode
                key={i}
                episode={episode}
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