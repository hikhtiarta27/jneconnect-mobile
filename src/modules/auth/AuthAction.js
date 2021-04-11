import {
  SIGNINFETCH,
  SIGNINSUCCESS,
  SIGNINFAILED,

  USERPROFILEFETCH,
  USERPROFILESUCCESS,
  USERPROFILEFAILED,

  USERPROFILEUPDATEFETCH,
  USERPROFILEUPDATESUCCESS,
  USERPROFILEUPDATEFAILED,

  DIVISIFETCH,
  DIVISISUCCESS,
  DIVISIFAILED,

  STATUSFETCH,
  STATUSSUCCESS,
  STATUSFAILED,

  LOGOUT
} from './AuthConfig'

export const signInFetch = value => ({type: SIGNINFETCH, send: value})
export const signInSuccess = value => ({type: SIGNINSUCCESS, res: value})
export const signInFailed = value => ({type: SIGNINFAILED, err: value})

export const userProfileFetch = value => ({type: USERPROFILEFETCH, send: value})
export const userProfileSuccess = value => ({type: USERPROFILESUCCESS, res: value})
export const userProfileFailed = value => ({type: USERPROFILEFAILED, err: value})

export const userProfileUpdateFetch = value => ({type: USERPROFILEUPDATEFETCH, send: value})
export const userProfileUpdateSuccess = value => ({type: USERPROFILEUPDATESUCCESS})
export const userProfileUpdateFailed = value => ({type: USERPROFILEUPDATEFAILED, err: value})

export const divisiFetch = value => ({type: DIVISIFETCH, send: value})
export const divisiSuccess = value => ({type: DIVISISUCCESS, res: value})
export const divisiFailed = value => ({type: DIVISIFAILED, err: value})

export const statusFetch = value => ({type: STATUSFETCH, send: value})
export const statusSuccess = value => ({type: STATUSSUCCESS, res: value})
export const statusFailed = value => ({type: STATUSFAILED, err: value})

export const logoutFetch = value => ({type: LOGOUT.FETCH, send: value})
export const logoutSuccess = value => ({type: LOGOUT.SUCCESS, res: value})
export const logoutFailed = value => ({type: LOGOUT.FAILED, err: value})
