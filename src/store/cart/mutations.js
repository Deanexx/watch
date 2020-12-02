export function setCart (state, cart) {
  state.cart = cart;
}

export function addToCart(state, id){
  state.cart.push({ id, cnt: 1 })
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

export function removeFromCart(state, ind){
  state.cart.splice(ind, 1)
}

export function addCnt(state, { ind, cnt }){
  state.cart[ind].cnt += cnt;
}

export function clearCart(state){
  state.cart = [];
}


// export function setToken (state, token) {
//   state.token = token;
// }

// export function updateCart (state, cartItems) {
//   state.cart.cart.items = cartItems;
// }
