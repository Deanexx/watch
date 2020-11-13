import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://floating-fjord-06765.herokuapp.com/',
  timeout: 10000,
  withCredentials: true
});

export function addResponseHandler(onSuccess, onError){
  instance.interceptors.response.use(onSuccess, onError);
}

export default instance;
