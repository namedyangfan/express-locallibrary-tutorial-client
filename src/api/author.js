import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}catalog/`

export const get = () => { return axios.get(`${API}authors`)}

export const post = (params) => { 
  return axios.post(`${API}author/create`, null, {params})
}
