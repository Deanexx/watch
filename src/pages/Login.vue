<template>
  <div class="row">
    <q-form class="col-3" @submit="onSubmit">
      <q-input v-model="login.value"/>
      <q-input v-model="password.value"/>
      <q-btn type="submit"
             :loading="loader"
             color="primary">Log in</q-btn>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
name: "Login.vue",
  data(){
    return{
      loader: false,
      login: {
        value: null,
        pattern: /^[A-Za-z]{3,10}$/
      },
      password: {
        value: null,
        pattern:  /^[a-zA-Z0-9-!@()_+=]{6,20}$/
      }
    }
  },
  methods: {
    ...mapActions('user', ['loginUser']),
    async onSubmit(){
      this.loader = true;
      let login = this.login.value;
      let password = this.password.value;

      if(this.login.pattern.test(login) && this.password.pattern.test(password)){
        let res = await this.loginUser({ login, password });
        if(res === 'success') this.$router.push({ name: "main"})
      }
      else
        this.$q.notify({
          color: 'yellow',
          message: "Please check login and password"
        })
      this.loader = false;
    }
  }

}
</script>

<style scoped>

</style>
