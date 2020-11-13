<template>
  <q-layout view="lHh Lpr lFf">
<!--    Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Mirror
        </q-toolbar-title>

<!--        Cart Button-->
          <q-btn
            class="q-mr-sm"
            color="green"
            @click="$router.push({ name: 'cart' })">
              Cart
          </q-btn>
<!--        End Cart Button-->

<!--        Account button'S-->
        <q-btn-dropdown
          v-if="!user"
          label="My Account"
          color="purple">
          <q-list>
            <q-item
              @click="$router.push({name: 'login'})"
              clickable>
              <q-item-label>Login</q-item-label>
            </q-item>
            <q-item
              @click="$router.push({name: 'register'})"
              clickable>
              <q-item-label>Register</q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn v-else color="red" @click="logOutUser">Sign out</q-btn>
<!--        End Account button-->

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
    ...mapGetters('cart', ['cart']),
    ...mapGetters('user', ['user'])
  },
  methods:{
    ...mapActions('user', ['logout']),
    async logOutUser(){
      let status = await this.logout();
      if(status === 'success' && this.$route.path.startsWith("/office"))
        this.$router.push({ name: "main" })
    }
  }
}
</script>
