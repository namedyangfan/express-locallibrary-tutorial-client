import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}catalog/book/`

export const post = (params) => { 
  return axios.post(`${API}create`, null, {params})
}

export const get = () => { 
  return axios.get(`${process.env.REACT_APP_API_URL}catalog/books`)
}

export const addAuthor = (params) => { 
  return axios.put(`${API}add_author`, null, {params})
}