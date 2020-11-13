import server from './http';

export async function stripe_session(cart){
  let { data } = await server.post('/booking/checkout-session', { cart });
  return data;
}
// export async function getCart(id){
//   let { data } = await server.get(`cart/${id}`);
//   return data;
// }
//
// export async function createCart(){
//   let { data } = await server.get('cart');
//   return data;
// }
//
// export async function addCart(id_cart, cart){
//   let { data } = await server.patch(`cart/${id_cart}`, cart);
//   return data;
// }
//
// export async function setCnt(id_car){
//
// }
