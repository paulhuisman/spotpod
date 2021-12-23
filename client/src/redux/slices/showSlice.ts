import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import SpotifyWebApi from 'spotify-web-api-node'
import ShowInterface from 'interfaces/show'

export const fetchShows = createAsyncThunk<
  // Return type of the payload creator
  number,
  // First argument to the payload creator
  number,
  {
    // Optional fields for defining thunkApi field types
    rejectValue: string
  }
>('shows/fetchShows', async (arg, { getState }) => {
  // Todo: AuthState type
  const { auth } = getState() as { auth: any }

  // Check if accessToken exists in state
  if(auth.accessToken === null) return
  
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID 
  })

  spotifyApi.setAccessToken(auth.accessToken)

  const response = await spotifyApi.getMySavedShows()

  return response.body.items.map((item: ShowInterface) => {
    return {
      id: item.show.id,
      name: item.show.name,
      publisher: item.show.publisher,
      image: item.show.images[0].url,
      uri: item.show.uri
    }
  })
})

export const showSlice = createSlice({
  name: 'shows',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchShows.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchShows.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.list = action.payload
    },
    [fetchShows.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  },
})

export default showSlice.reducer