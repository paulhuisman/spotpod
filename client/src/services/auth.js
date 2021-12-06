import axios from 'axios'

export const generateAccessToken = async (code) => {
  const SERVER = process.env.REACT_APP_SERVER || 'http://localhost:3001'

  const res = await axios.post(`${SERVER}/login`, {
    code
  })
  
  if(res.data.accessToken) {
    return res.data.accessToken
  }

  return null
}

// export const refreshAccessToken = async (token) => {
//   // const state = store.getState()

//   const SERVER = process.env.REACT_APP_SERVER || 'http://localhost:3001'

//   const res = await axios.post(`${SERVER}/refresh`, {
//     token 
//   })
  
//   if(res.data.accessToken) {
//     console.log('Refresh', res.data.accessToken)
//     return res.data.accessToken
//   }

//   return null
// }