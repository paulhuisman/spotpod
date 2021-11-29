import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import SpotifyWebApi from 'spotify-web-api-node'

export const fetchNewEpisodes = createAsyncThunk('shows/fetchNewEpisodes', async (arg, { getState }) => {
  const state = getState()

  // Check if accessToken exists in state
  if(state.auth.accessToken === null) return

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID 
  })

  spotifyApi.setAccessToken(state.auth.accessToken)
  
  // Loop through shows and get episodes for each one
  let episodesList = []
  await Promise.all(state.shows?.list.map(async (show) => {
    try {
      const response = await spotifyApi.getShowEpisodes(show.id, { limit: 5 })

      // Find the first show's episode that's not fully played
      const firstUnplayedEpisode = response.body.items.find(episode => {
        return episode.resume_point.fully_played === false
      })

      episodesList.push(firstUnplayedEpisode)
    } catch (error) {
      console.log('Error', error);
    }
  }))

  // Reorder episodes list based on release date
  episodesList.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) 

  return episodesList 
})

export const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchNewEpisodes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNewEpisodes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.list = action.payload
    },
    [fetchNewEpisodes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default episodeSlice.reducer