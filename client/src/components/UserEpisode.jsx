import React from 'react'
import { timeFormatter } from 'helpers/dates'
import { setMaxChars } from 'helpers/truncate'

const UserEpisode = ({ episode, playEpisode, variant }) => {
  const handlePlay = () => {
    playEpisode(episode)
  }

  if(variant === "queue") {
    return (
      <div className="flex w-full cursor-pointer animate-fade bg-transparent" onClick={handlePlay} key={episode.id}>
        <div className="w-14 lg:w-20 mr-6 border-r border-black relative">
          <div className="w-14 lg:w-20 pt-8 lg:pt-11 pr-6 text-lime-700 text-xxs lg:text-xs text-right">{timeFormatter(episode.duration_ms)}</div>
          <div className="w-6 h-6 bg-white rounded-full shadow absolute top-8 lg:top-12 -right-4">
            <div className="rounded-full bg-orange w-1 h-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>  

        <img className="w-24 h-24 lg:w-32 lg:h-32 object-cover mr-4 mb-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out" src={ episode.images[0].url } alt={ episode.name }/>

        <div className="mr-2 mb-6">
          <h3 className="text-sm lg:text-base font-bold mb-1 active:underline">{ episode.name }</h3>
          <p className="text-xxs lg:text-xs text-lime-700">{ episode.description.length > setMaxChars() ? `${episode.description.substring(0, setMaxChars())} ...` : episode.description }</p>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="flex mb-4 w-full cursor-pointer animate-fade bg-transparent" onClick={handlePlay} key={episode.id}>
        <img className="w-20 h-20 lg:w-32 lg:h-32 object-cover mr-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out" src={ episode.images[0].url } alt={ episode.name }/>
    
        <div className="mr-2">
          <h3 className="text-sm lg:text-base font-bold mb-1 active:underline">{ episode.name }</h3>
          <p className="text-xxs lg:text-xs text-lime-700">{ episode.description.length > setMaxChars() ? `${episode.description.substring(0, setMaxChars())} ...` : episode.description }</p>
        </div>
        
        <button className="h-10 w-10 rounded-xl ml-auto my-auto bg-gradient-to-b from-lime-500 to-lime-700 text-white px-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline fill-current text-white">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"></path>
          </svg>
        </button>
      </div>
    )
  }

}

export default UserEpisode