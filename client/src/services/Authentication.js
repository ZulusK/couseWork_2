import Api from '@/services/Api'

export default {
  register(credentials) {
    return Api().post('api/v1/users/signup',credentials);
  }
}
//
// AuthenticationServices.register({
//   email:"Danil",
//   passed:'123456'
// });
