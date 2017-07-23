import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS';
const ROOT_URL='http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=es2017sG'

export const fetchPosts = () => {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
  return{
    type: FETCH_POSTS,
    payload: request
  }
}

export const createPost = (values) => {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  return {
    type:CREATE_POSTS,
    payload: request
  }
}
