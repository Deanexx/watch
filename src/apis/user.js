import server from './http.js'

export async function signupUser(form){
  let { data } = await server.post("users/signup", form, {
    errorSuppression: true
  });
  return data;
}

export async function loginUser(form){
  let { data } = await server.post("users/login", form, {
    errorSuppression: true
  })
  return data;
}

export async function updatePassword(form){
  let { data } = await server.post("users/updatePassword", form, {
    errorSuppression: true
  })
  return data;
}

export async function isLoggedIn(){
  let { data } = await server.get("users/isLoggedIn", {
    errorSuppression: true
  });
  return data;
}

export async function logout(){
  let { data } = await server.get("users/logout");
  return data;
}
