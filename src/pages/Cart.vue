<template>
  <q-page>
    <table class="q-mx-auto q-mt-sm">
      <tr style="height: 50px !important;">
        <th>Remove</th>
        <th>Image</th>
        <th>Product</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
      <tr v-for="(item, i) in itemDetails"
           :key="i">
        <td>
          <q-btn @click="removeItemFromCart(item.id)">Remove</q-btn>
        </td>
        <td>
          <q-img height="50px" width="50px" :src="require(`../assets/watchesImg/${item.images[0]}`)"/>
        </td>
        <td>
          {{ item.title }}
        </td>
        <td>
          {{ item.price }}
        </td>
        <td>
          {{ item.cnt }}
          <q-btn color="yellow" class="q-mr-sm" @click="setCnt({ id: item.id, cnt: 1})">+</q-btn>
          <q-btn color="yellow" @click="setCnt({id: item.id, cnt: -1})">-</q-btn>
        </td>
        <td>
          {{ item.cnt * item.price }}
        </td>
      </tr>
    </table>
    <div>
      <p>Cart Total</p>
      <p>{{ cartTotal }}</p>
      <q-btn @click="paymentDone">Proceed to Checkout</q-btn>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: "Cart.vue",
  computed: {
    ...mapGetters('cart', ["itemDetails", "cartTotal", "cart"]),
  },
  methods: {
    ...mapActions('cart', ['removeItemFromCart', 'setCnt', 'checkOutCart', 'clearCart']),
    async paymentDone(){
      let res = await this.checkOutCart(this.cart);
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  height: 100px;
  }
table{
  width: 80%;
}
</style>
