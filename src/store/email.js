import { sendEmail } from '../apis/email.js'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async emailSend({ commit }, form){
      let { data , status } = await sendEmail(form);

      return status;
    }
  }
}
