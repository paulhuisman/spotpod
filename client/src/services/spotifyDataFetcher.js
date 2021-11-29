import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID 
})

const SpotifyDataFetcher = (accessToken) => {
  const [loading, setLoading] = useState(false)
  const [userShows, setUserShows] = useState([])
  const [userNewEpisodes, setUserNewEpisodes] = useState([])

  useEffect(() => {
    if (!accessToken) return

    setLoading(true)

    try {
      spotifyApi.setAccessToken(accessToken)
    } catch (error) {
      console.log('Error generating access token', error)
    }
    
  }, [accessToken])

  useEffect(() => {
    // Get user's saved shows
    setTimeout(() => {
      spotifyApi.getMySavedShows().then(res => {
        if(res.body.items === null) return

        // Set users show state
        setUserShows(
          res.body.items.map(item => {
            return {
              id: item.show.id,
              name: item.show.name,
              publisher: item.show.publisher,
              image: item.show.images[0].url,
              uri: item.show.uri
            }
          })
        )

        setLoading(false)
      })
    }, 1200) // TMP: Some delay to actually see the loading animation :)
  }, [])

  useEffect(() => {
    if(userShows.length === 0 || loading) return

    // Get show's episodes
    userShows.forEach((item) => {
      spotifyApi.getShowEpisodes(item.id, { limit: 5 }).then(res => {
        if(res.body.items === null) return

        // Find the first show's episode that's not fully played
        const firstUnplayedEpisode = res.body.items.find(episode => {
          return episode.resume_point.fully_played === false
        })

        if(firstUnplayedEpisode) {
          // Set users queue episodes after sorting on newest release date first
          setUserNewEpisodes(data => {
            const dataToSort = [...data, firstUnplayedEpisode]
            dataToSort.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) 
            return dataToSort 
          })
        }
      })
    })

  }, [userShows, loading])

  return {userShows, userNewEpisodes, loading}
}

export default SpotifyDataFetcher