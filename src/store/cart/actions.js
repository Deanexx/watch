import { loadStripe } from '@stripe/stripe-js';
import * as cartApi from '../../apis/cart.js'

const stripePromise = loadStripe('pk_test_51HmAWHFLoGPo9cymcDQCMabQRNHdblFxbqddj2pP7T1ZoOWPfDPW1G1XIa3W2htsF8PTi3XWVOL3mH4TtTIzCQOz00QnRXjqrp');

export async function findCart ({ state,  commit}, cart) {
  cart = cart ? cart : [];
  commit('setCart', cart)
}

export async function removeItemFromCart({state, getters, commit}, id){
  let ind  = getters.index(id);

  commit('removeFromCart', ind);
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

export async function setCnt({state, getters, commit, rootGetters}, { id, cnt }){
  let ind  = getters.index(id);

  if(state.cart[ind].cnt + cnt >= 1 && state.cart[ind].cnt + cnt <= rootGetters['watches/item'](id).cnt)
    commit('addCnt', { ind, cnt})
  localStorage.setItem('cart', JSON.stringify(state.cart));
}

export async function checkOutCart({ commit }, cart){
  const stripe = await stripePromise;
  const response = await cartApi.stripe_session(cart);
  if(response.status === "success")
  {
    commit("clearCart")
    localStorage.removeItem('cart');

    const result = await stripe.redirectToCheckout({
        sessionId: response.session.id
      });
      if (result.error)
        return false;
  }
  return true;
  }

/*
export async function findCart ({ state,  commit}, idCart) {
  let { data } = !idCart ? await cartApis.createCart() :  await cartApis.getCart(idCart);

  if(data.newCart)
    localStorage.setItem('cart', data.cart._id);
  commit('setCart', data);
  commit('setToken', data.cart._id);
}

export async function addCart({state, commit}, { cart }){
  let { data } = await cartApis.addCart(state.token, cart);

  commit('updateCart', data);
}
*/
