import server from './http.js'

export async function sendEmail (form) {
  console.log(form);
  let { data } = await server.post("email/emailSent", form);

  return data;
}
