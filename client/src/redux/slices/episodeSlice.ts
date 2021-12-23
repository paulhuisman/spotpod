import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import SpotifyWebApi from 'spotify-web-api-node'

export const fetchNewEpisodes = createAsyncThunk('shows/fetchNewEpisodes', async (sort = 'newest', { getState }) => {
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
        return episode.resume_point?.fully_played === false
      })

      episodesList.push(firstUnplayedEpisode)
    } catch (error) {
      console.log('Error', error)
    }
  }))

  // Reorder episodes list based on release date
  const sortType = state.episodes.sortType ? state.episodes.sortType : 'newest'
  episodesList = orderEpisodes(episodesList, sortType)

  return episodesList 
})

const orderEpisodes = (episodesList, sortType) => {
  const sortedData = [...episodesList]

  switch (sortType) {
    case 'alphabetical':
      sortedData.sort((a, b) => a.name.localeCompare(b.name))
      break
  
    case 'newest':
      sortedData.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) 
      break
  }

  return sortedData
}

export const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    list: [],
    status: 'idle',
    sortType: 'newest',
    error: null,
  },
  reducers: {
    updateOrder(state, action) {
      state.list = orderEpisodes(current(state.list), action.payload)
      state.sortType = action.payload
    },
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

export const { updateOrder } = episodeSlice.actions

export default episodeSlice.reducer