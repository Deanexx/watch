export default {
  cart: state => state.cart,
  cartAmount: state => state.cart.length,
  amount: (state, getters) => getters.cart.length,
  item: state => id => state.cart.find(el => el.id === id),
  inCart: (state, getters) => id => getters.index(id) !== -1,
  index: state => id => state.cart.findIndex(el => el.id === id),
  cartTotal(state, getters) {
    return getters.itemDetails.reduce((total, el) => {
      return total + (el.price * el.cnt)
  }, 0)
  },
  itemDetails(state, getters, rootState, rootGetters){
    return getters.cart.map(el => {
      let { title, images, price } = rootGetters['watches/item'](el.id);

      return {
        ...el,
        title,
        images,
        price
      }
    })
  }
}
