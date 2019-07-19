import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:5000/account',
  timeout: 5000,
  withCredentials: true
})

let user = {}


export default { api, auth, user }