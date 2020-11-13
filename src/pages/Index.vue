<template>
  <q-page>
    <div class="row justify-around">
      <q-card
        class="col-2"
        v-for="(watch, i) in watches"
        :key="i">
        <q-img :src="require(`../assets/watchesImg/${watch.images[0]}`)"/>
        <q-card-section>
          {{ watch.brand }}
        </q-card-section>
        <q-card-section>
          {{ watch.title }}
        </q-card-section>
        <q-card-section>
          {{ watch.price }}
        </q-card-section>
        <q-card-actions>
          <watch-process :id="watch._id"/>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import WatchProcess from "components/WatchProcess.vue"
import { mapGetters } from 'vuex';

export default {
  components: {
    WatchProcess
  },
  name: 'PageIndex',
  computed: {
    ...mapGetters('watches', { watches: 'all' }),
    ...mapGetters('cart', ['cart']),
    inCart(){
      return true;
    }
  }
}
</script>
