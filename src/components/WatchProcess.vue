<template>
  <div>
    <q-btn color="green" v-if="!inCart(id)" @click="addToCart(id)">Add to cart</q-btn>
    <q-btn color="red" v-else @click="removeItemFromCart(id)">Remove from cart</q-btn>
    <div v-if="inCart(id)">
      <q-btn color="yellow" class="q-mr-sm" @click="setCnt({id, cnt: 1})">+</q-btn>
      <q-btn color="yellow" @click="setCnt({id, cnt: -1})">-</q-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: "WatchProcess",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('cart', ['cart', 'inCart']),
  },
  methods:{
    ...mapMutations('cart', ['addToCart']),
    ...mapActions('cart', ['removeItemFromCart', 'setCnt'])
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
