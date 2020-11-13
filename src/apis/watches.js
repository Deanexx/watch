import server from './http'

export async function all(){

  let { data } = await server.get('watches');
  return data;
}
