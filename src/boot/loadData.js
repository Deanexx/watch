// import something here
import * as server from '../apis/user.js'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ store }) => {
  const cartId = localStorage.getItem('cart');

  await store.dispatch('user/isLoggedIn');
  await store.dispatch('watches/load');
  await store.dispatch('cart/findCart', JSON.parse(cartId));
  // await store.dispatch('user/logout');
  // console.log(store.getters['user/user']);
}
