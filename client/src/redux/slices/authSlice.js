import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deviceId: null,
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDeviceId, setAccessToken } = authSlice.actions

export default authSlice.reducer