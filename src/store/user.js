import * as userApi from '../apis/user.js'

let autoLoginResolver;
let autoLoginPromise = new Promise(resolve => { autoLoginResolver = resolve });

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    ready: () => autoLoginPromise
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    }
  },
  actions: {
   async loginUser({ commit }, form){
      let { data, status } = await userApi.loginUser(form);

      if(status === 'success')
        commit('setUser', data.user)

     return status;
    },

    async signupUser({ state, commit }, form){
      let { data, status } = await userApi.signupUser(form);

      if(status === 'success')
        commit('setUser', data.user);

      return status;
    },

    async isLoggedIn({ state, commit }){
      let { data, status } = await userApi.isLoggedIn();

      if (status === 'success')
        commit('setUser', data);
      autoLoginResolver();
    },

    async updatePassword({ commit }, form){
      let { data, status } = await userApi.updatePassword(form);

      if (status === 'success')
        commit('setUser', data);
      return status;
    },

    async logout({ state, commit }){
      let { status } = await userApi.logout();

      if (status === 'success')
        commit('setUser', null);
      return status;
    }
  }
}
