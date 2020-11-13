<template>
  <div class="row">
    <q-form class="col-3" @submit="onSubmit">
      <q-input label="login" v-model="form.login.value"/>
      <q-input label="email" v-model="form.email.value"/>
      <q-input label="password" v-model="form.password.value"/>
      <q-input label="password confirm" v-model="form.passwordConfirm.value"/>
      <q-btn type="submit"
             :loading="loader"
             color="primary">Register in</q-btn>
    </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Register.vue",
  data(){
    return {
      form: {
        login: {
          value: null,
          pattern: /^[a-zA-Z]{3,20}$/,
          message: "Login should be at least 3 letters long"
        },
        email: {
          value: null,
          pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
          message: "Pleas check email for correction"
        },
        password: {
           value: null,
           pattern: /^[a-zA-Z0-9-!@()_+=]{6,20}$/,
           message: "Password at least 6 symbols long and less then 20"
        },
        passwordConfirm: {
          value: null,
          message: "Confirm password isn't the same"
        }
      },
      loader: false
    }
  },
  computed: {
    innerForm(){
      let innerForm = {};

      for(const prop in this.form){
        innerForm[prop] = this.form[prop].value;
      }
      return innerForm;
    }
  },
  methods: {
    ...mapActions('user', ['signupUser']),
    async onSubmit(){
      this.loader = true;
      let arrForm = Object.entries(this.form);

      let error = arrForm.find(field => {
        if(field[0] === "passwordConfirm")
          return field[1].value !== this.form.password.value;
        return !(field[1].pattern.test(field[1].value));
      })

      if(error)
      {
        this.loader = false;
        return this.$q.notify({
          color: "yellow",
          message: error[1].message
        })
      }
      let status = await this.signupUser(this.innerForm)
      if(status === "success")
        this.$router.push({ name: "main"});
      this.loader = false;
     }
  }
}
</script>

<style scoped>

</style>
