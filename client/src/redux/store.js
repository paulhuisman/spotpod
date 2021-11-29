import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import showsReducer from './slices/showSlice'
import episodeReducer from './slices/episodeSlice'

// combining two reducers into a single reducer
const reducer = combineReducers({
  auth: authReducer,
  shows: showsReducer,
  episodes: episodeReducer
})

export default configureStore({ reducer })