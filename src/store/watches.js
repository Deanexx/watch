import * as watchesApi from '../apis/watches.js'

export default {
  namespaced: true,
  state: {
    items: null
  },
  getters: {
    all: state => state.items.data.watches,
    item: (state, getters) => id => getters.all.find(el => el._id === id)
  },
  mutations: {
    setItems(state, items){
      state.items = items;
    }
  },
  actions: {
    async load({ commit }){
      let products = await watchesApi.all();
      commit('setItems', products);
      return products;
    }
  }

}
