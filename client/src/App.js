import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import { Login, Dashboard, Queue, Subscriptions, Discover, FooterNav } from './components'

import { generateAccessToken } from './services/auth'
import { setAccessToken } from './redux/slices/authSlice'

const App = () => {
  const dispatch = useDispatch()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')

    // Generate access token based on code from Login form redirect
    if(code) {
      generateAccessToken(code).then((res) => {
        // Update access token in store
        dispatch(setAccessToken(res))

        // Remove "?code" from url
        window.history.pushState({}, null, '/')

        // Set authenticated state
        setIsAuthenticated(true)
      })
    }
    else {
      // TODO: refresh access token
    }
  }, [dispatch])

  return (
    <div className="app min-h-screen relative bg-lime ">
      { isAuthenticated ?
        <div className="py-8 px-7 pb-32 max-w-screen-lg lg:mx-auto">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/queue">
              <Queue />
            </Route>
            <Route exact path="/subscriptions">
              <Subscriptions />
            </Route>
            <Route exact path="/discover">
              <Discover />
            </Route>
          </Switch>
        </div> :
        <Login />
      }
      { isAuthenticated &&
        <FooterNav />
      }
    </div>
  )
}

export default App