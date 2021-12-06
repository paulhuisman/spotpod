import { useSelector } from 'react-redux'

import { playUris } from 'services/spotify'

import Button from 'components/Button'
import { ReactComponent as PlayIcon } from 'assets/svg/play.svg'

const Header = ({ text, setTogglePlayer }) => {
  const newEpisodesList = useSelector(state => state.episodes.list)
  
  const playQueue = () => {
    setTogglePlayer(true)

    setTimeout(() => {
      playUris(newEpisodesList?.map(episode => episode.uri))
    }, 200)
  }

  return (
    <div className="flex justify-between mb-8 relative">
      <h1 className="text-2xl font-heading font-black">{ text }</h1>
      <Button onClick={playQueue} text="Play queue" icon={<PlayIcon />}>Play queue</Button>
    </div>
  )
}

export default Header