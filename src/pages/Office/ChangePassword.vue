<template>
  <q-form @submit="sendForm">
    <q-input label="Current password" v-model="form.passwordCurrent.value"/>
    <q-input label="New password" v-model="form.password.value"/>
    <q-input label="Confirm new password" v-model="form.passwordConfirm.value"/>
    <q-btn :loading="loader" type="submit">Send</q-btn>
  </q-form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loader: false,
      form: {
        passwordCurrent: {
          value: null,
          message: "Pleas provide current password"
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
      }
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
    ...mapActions('user', ['updatePassword']),
    async sendForm(){
      this.loader = true;
      let error;

      console.log(this.form.password.pattern.test(this.form.password.value))

      if(!this.form.passwordCurrent.value)
        error = this.form.passwordCurrent.message
      if(!this.form.password.pattern.test(this.form.password.value))
        error = this.form.password.message
      if(this.form.password.value !== this.form.passwordConfirm.value)
        error = this.form.passwordConfirm.message
      if(error){
        this.loader = false;
        return this.$q.notify({
          message: error,
          color: 'yellow'
        })
      }

      console.log()
      let res = await this.updatePassword(this.innerForm);
      if (res === "success"){
        this.$q.notify({
          message: "Password been updated",
          color: 'green'
        })
        this.$router.push({ name: 'main' })
      }
    }
  }
}
</script>
