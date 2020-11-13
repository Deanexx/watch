<template>
  <div class="row">
    <div class="col-6">

    </div>
    <div class="col-6">

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

  export default {
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters('cart', ["cart"]),
    },
    methods: {

    },
    created(){
      console.log(this.cart);
    }
  }
</script>
