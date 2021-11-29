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