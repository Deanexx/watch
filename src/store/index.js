import Vue from 'vue'
import Vuex from 'vuex'

// import example from './cart'
import watches from './watches'
import cart from './cart'
import user from './user'

import { Notify } from 'quasar';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

import { addResponseHandler } from './../apis/http';

const Store = new Vuex.Store({
  modules: {
    watches,
    cart,
    user
  },
  strict: process.env.DEV
})

export default function (/* { ssrContext } */) {

  return Store
}

addResponseHandler(
  response => {
    return response;
  },
  error => {
    console.log(error.response);
    if(error.response.status === 401 || error.response.status === 400)
      Notify.create({
        color: 'red',
        message: error.response.data.message
      })
    if(!('errorSuppression' in error.config)){
      return Promise.reject(error);
    }

    return { data: {  status: 'fail' } };
  })

export { Store }
