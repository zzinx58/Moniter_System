import axios from "axios";

export const fetchData = () => {
  return axios.get('/').then(res => res.data)
}


export const axiosData = () => {
  return axios.get('/success').then(res => res.data)
}
// '(function() {return '123'})())'

export const axios200 = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
export const axios404 = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/s')
}