<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
    <div v-if="!inCart(id)" :key="1">
      <q-btn color="dark" @click="addToCart(id)" no-caps>Add to cart</q-btn>
    </div>
    <div v-else :key="2">
      <q-btn color="orange-9" class="q-mr-xs" @click="setCnt({id, cnt: 1})" no-caps>+</q-btn>
      <q-btn color="red-5" @click="removeItemFromCart(id)" no-caps>Remove from cart</q-btn>
      <q-btn color="orange-9" class="q-ml-xs" @click="setCnt({id, cnt: -1})" no-caps>-</q-btn>
    </div>
  </transition>
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
  }
}
</script>

<style scoped>

</style>
