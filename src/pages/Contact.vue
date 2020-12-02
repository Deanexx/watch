<template>
  <q-form>
    <q-input v-model="form.email.value" label="From"></q-input>
    <q-input v-model="form.message.value" label="Message"></q-input>
    <q-btn :loading="loader" @click="sendForm">Send message</q-btn>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loader: false,
      form: {
        email: {
          value: '',
          pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i,
          errorMessage: 'Provide valid email',
        },
        message: {
          value: '',
          pattern:  /^[\w\s\d!@$%&*()_+.,':"-=]{10,350}$/,
          errorMessage: 'Please use English letters, message no less then 10 symbols'
        }
      }
    }
  },
  methods: {

    ...mapActions('email', ['emailSend']),
   async sendForm(){
      this.loader = true;

      for(const property in this.form){
        let field = this.form[property];

        if(!field.pattern.test(field.value)){
          this.loader = false;

          return this.$q.notify({
            message: field.errorMessage,
            color: "yellow"
          })
        }
      }

     let message = `You received message from ${this.form.email.value} \n \n ${this.form.message.value}}`;

     if(await this.emailSend({ message }) === 'success')
       this.$router.push({ name: 'main' })
     this.loader = false;
    }
  }
}
</script>
