<template>
  <q-page>
    <q-carousel
      v-model="slide"
      animated
      arrows
      :autoplay="3500"
      swipeable
      navigation
      infinite>
      <q-carousel-slide v-for="(item, i) in sliderInfo"
                        :name="i"
                        :img-src="require(`../assets/watchesImg/slider${i + 1}-mirora-1920x634.jpg`)"
                        :key="i">
        <div class="q-ml-xl" style="width: 45%">
          <p class="text-h5 text-secondary">Exlusive offer -20% off this week</p>
          <p class="text-h2 text-white">{{ item.title}}</p>
          <p class="text-weight-thin text-white text-h5">{{ item.description}}</p>
          <p class="text-white text-h5">Starting at <span class="text-secondary text-h3">${{ item.price}}</span> </p>
          <q-btn class="btn__slider" no-caps>
            Add to cart
          </q-btn>
        </div>

      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-around bg-primary">
      <div class="col-12 flex justify-center q-mt-lg">
        <q-btn class="btn__shop" :class="{btn__shop__active: btnActive === 'btn1'}" @click="changeState('btn1', 'featured')" :ripple="false">Featured</q-btn>
        <q-btn class="btn__shop" :class="{btn__shop__active: btnActive === 'btn2'}" @click="changeState('btn2', 'newArrivals')" :ripple="false">New Arrivals</q-btn>
        <q-btn class="btn__shop" :class="{btn__shop__active: btnActive === 'btn3'}" @click="changeState('btn3', 'bestSeller')" :ripple="false">Bestseller</q-btn>
        <q-btn class="btn__shop" :class="{btn__shop__active: btnActive === 'btn4'}" @click="changeState('btn4', 'onSale')" :ripple="false">On Sale</q-btn>
      </div>
      <transition-group class="row col-12 flex justify-around q-mb-lg" enter-active-class="animated zoomIn">
        <q-card
          class="col-2 q-mt-md bg-transparent relative-position"
          v-for="(watch) in chosenWatches"
          @mouseover.native="onHover=watch._id"
          @mouseleave.native="onHover=''"
          :key="watch._id">
          <q-img :src="require(`../assets/watchesImg/${onHover === watch._id ? watch.images[1] : watch.images[0]}`)" spinner-color="yellow" spinner-size="50px"/>
          <q-card-section class="text-white text-center q-pb-xs">
            {{ watch.brand }}
          </q-card-section>
          <q-card-section class="text-white text-center q-pb-xs title__style">
            {{ watch.title }}
          </q-card-section>
          <q-card-section class="text-center q-pb-xs price__class">
            ${{ watch.price }}
          </q-card-section>
          <transition enter-active-class="animate__fadeInDown" mode="in-out">
            <q-card-actions class="position__btn" v-if="onHover === watch._id">
              <watch-process :id="watch._id"/>
            </q-card-actions>
          </transition>
        </q-card>
      </transition-group>
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
  data(){
    return {
      selectedFilter: 'featured',
      btnActive: 'btn1',
      onHover: '',
      slide: 1,
      sliderInfo: [
        {
        title: "H-Vault Classico",
        price: 1499.99,
        description: "H-Vault Watches Are A Lot Like Classic American Muscle Cars - Expect For The American Part That Is.",
      },
        {
          title: "Z-Heyza Classico",
          price: 1099.99,
          description: "Z-Heyza Watches Are A Lot Like Classic American Muscle Cars - Expect For The American Part That Is.",
        }]
    }
  },
  computed: {
    ...mapGetters('watches', { watches: 'all' }),
    ...mapGetters('cart', ['cart']),
    chosenWatches(){
      return this.watches.filter(el => el.type === this.selectedFilter)
    }
  },
  methods: {
    changeState(btnActive, selectedFilter){
      console.log(btnActive, selectedFilter);
      console.log(this.btnActive, this.selectedFilter);
      this.selectedFilter = selectedFilter;
      this.btnActive = btnActive;
    }
  },
  mounted(){
    console.log(this.watches);
  }
}
</script>

<style lang="sass" scoped>
  .btn__slider
    border: 2px solid $secondary !important
    color: $wht
    transition: all .2s linear
    &:hover
      background: $secondary
      color: black

  .btn__shop
    border: 2px solid $dark3
    border-radius: 0
    color: $wht
    transition: all .2s linear
    &:hover
      color: $secondary
    &:not(:first-child, :last-child)
      position: relative
      border: 1px solid $dark3
    &:first-child
      &:after
        content: ''
        cursor: default
        width: 50px
        height: 2px
        position: absolute
        top: 50%
        left: -50px
        border: 1px solid $dark3
    &:last-child
      &:after
        @extend .btn__shop:first-child:after
        left: 100%
  .btn__shop__active
    border: 1px solid $secondary
  .price__class
    color: $secondary
  .title__style
    background: url("~assets/watchesImg/line.png") no-repeat center bottom
  .position__btn
    position: absolute
    display: flex
    justify-content: center
    width: 100%
    padding: 0
    margin: 0
    bottom: 0
    left: 50%
    transform: translateX(-50%)
</style>
