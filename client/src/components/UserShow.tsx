import React from 'react'
import ShowInterface from 'interfaces/show'

const UserShow = (show: ShowInterface, playShow: any, last: boolean) => {
  const handlePlay = () => {
    playShow(show)
  }

  return (
    <div className={`inline-block px-2 animate-fade ${last ? 'pr-6' : ''}`} onClick={handlePlay} key={show.id}>
      <div className="w-32 lg:w-40 h-auto cursor-pointer max-w-xs overflow-hidden ">
        <img className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out" src={ show.image } alt={ show.name }/>
    
        <div className="mt-3 mx-2">
          <h3 className="text-sm font-heading font-bold mb-1">{ show.publisher }</h3>
          <p className="text-xs">{ show.name }</p>
        </div>
      </div>
    </div>
  )
}

export default UserShow