import axios from '../utils/axios';
import url from './url'

export async function queryGet() {
  return axios(`${url.API2}/linkceo/admin/sys-user/?fromAppType=test&user_account=42129`);
}
// export async function queryGet() {
//   return axios(`${url.API1}/queryget`);
// }
export async function queryPost(params) {
  console.log(params,'params');
  return axios(`${url.API1}/querypost`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}