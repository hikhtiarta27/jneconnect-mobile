export const baseApi = 'http://jneconnect.kopistasi.id'

export default {
  //util
  divisi: '/divisi',
  status: '/status',
  //user
  userProfile: '/api/user', //:email //get
  userUpdate: '/api/user', //put
  //report
  reportList: '/api/report', //:email //get
  reportDetail: '/api/report', //:email //:id //get
  reportCreate: '/api/report', //post
  reportUpdate: '/api/report', //:id //put
  reportDelete: '/api/report', //:id //put
  //auth
  login: '/api/auth/signin', //post
  register: '/api/auth/register', //post
  verifyToken: '/api/auth/verify', //post
  checkEmail: '/api/auth/register/check' //post

}