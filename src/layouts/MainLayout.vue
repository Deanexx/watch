<template>
  <q-layout view="lHh Lpr lFf">
<!--    Header -->
    <q-header elevated>
      <q-toolbar>

<!--        Account button -->

        <q-btn-dropdown
          class="q-ml-auto global__btn__class q-px-md"
          no-caps
          v-if="!user"
          :ripple="false"
          :unelevated="true"
          label="My Account"
          content-class="global__btn__class"
          dense
          color="transparent">
          <q-list class="list">
            <q-item
              class="q-py-md list__item"
              @click="$router.push({name: 'login'})"
              clickable>
              <q-item-label>Login</q-item-label>
            </q-item>
            <q-item
              class="list__item"
              @click="$router.push({name: 'register'})"
              clickable>
              <q-item-label>Register</q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn v-else color="red" @click="logOutUser">Sign out</q-btn>
      </q-toolbar>
      <q-toolbar class="relative-position">
        <img alt="Logo" class="absolute-center" width="161" height="47" src="~assets/watchesImg/logo.png">
<!--        Cart Button-->
          <q-btn
            class="absolute-right cart__btn q-mr-md"
            color="transparent"
            :ripple="false"
            @click="$router.push({ name: 'cart' })">
              <div class="items__cnt">
                <div class="items__cnt__content">{{ cartAmount }}</div>
              </div>
              <q-icon name="las la-shopping-cart"/>
              <span class="cart__btn__divider"></span>
              <span>{{ cartTotal }}</span>
          </q-btn>

      </q-toolbar>
      <q-tabs>
        <q-tabs>
          <q-route-tab label="Main" :to="{ name: 'main'}"/>
          <q-route-tab label="Contact" :to="{ name: 'contact'}"/>
          <q-route-tab v-if="user"
                       label="Office"
                       :to="{ name: $route.name === 'changePassword' ? 'changePassword' : 'orders'}"/>
        </q-tabs>
      </q-tabs>
    </q-header>

<!--    End Header-->


    <q-page-container>

        <!--  Menu for Office-->
        <q-list v-if="$route.path.startsWith('/office')">
          <q-item clickable
                  @click="$router.push({ name: 'orders'})">
            <q-item-section>
              Orders
            </q-item-section>
          </q-item>
          <q-item clickable
                  @click="$router.push({ name: 'changePassword'})">
            <q-item-section>
              Change Password
            </q-item-section>
          </q-item>
        </q-list>

        <!--  End Menu for Office-->

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('cart', ['cart', 'cartTotal', 'cartAmount']),
    ...mapGetters('user', ['user'])
  },
  methods:{
    ...mapActions('user', ['logout']),
    async logOutUser(){
      let status = await this.logout();
      if(status === 'success' && this.$route.path.startsWith("/office"))
        this.$router.push({ name: "main" })
    }
  },
  mounted(){
    console.log(this.cart)
  }
}
</script>

<style lang="sass" scoped>

.items__cnt
  position: absolute
  left: -10px
  font-size: 15px
  top: 50%
  width: 25px
  height: 25px
  line-height: 10px
  margin-top: -13px
  padding: 0
  background: #a8741a
  border-radius: 50%
  color: #fff
  &__content
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)

.cart__btn
  width: 120px
  box-shadow: none !important
  border: 1px $wht solid
  transition: all .2s linear
  &:hover
    color: $secondary !important
  &__divider
    width: 1px
    height: 70%
    border-radius: 10%
    background: $wht
    margin: 0 10px


.global__btn__class
  border-right: 1px $dark2 solid
  border-left: 1px $dark2 solid
  border-radius: 0 !important
  transition: all .2s linear
  &:hover
    color: $secondary !important

.list
  background: $dark3
  color: #fff
  &__item
    &:hover
      color: $secondary !important
    &:first-child
      position: relative
      &:after
        content: ''
        position: absolute
        bottom: 0
        left: 5%
        width: 90%
        border-radius: 50%
        height: 1px
        background: white

.q-menu
  border-color: black !important
</style>
