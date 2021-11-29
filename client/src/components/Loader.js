import React from 'react'
import { ReactComponent as DownloadIcon } from '../assets/svg/download.svg'

const Loader = () => {
  return (
    <div className="flex items-center justify-center pb-2">
      <DownloadIcon />
    </div>
  )
}

export default Loader