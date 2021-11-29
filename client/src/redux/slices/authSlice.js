import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  code: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCode, setAccessToken } = authSlice.actions

export default authSlice.reducer