import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}catalog/book/`

export const post = (params) => { 
  return axios.post(`${API}create`, null, {params})
}
