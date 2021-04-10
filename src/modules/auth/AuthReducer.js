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
  STATUSFAILED

} from './AuthConfig'

const initialAuthState = {
  fetchSignIn: false,
  fetchUserProfile: false,
  fetchUserProfileUpdate: false,
  send: null,
  err: null,
  res: null
}

export const authReducer = (state = initialAuthState, action) =>{
  switch(action.type){
    case SIGNINFETCH : {
      return {
        ...state,
        fetchSignIn: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case SIGNINSUCCESS: {
      return {
        ...state,
        fetchSignIn: false,
        res: {
          ...state.res,
          ...action.res,          
        },
        action: action.type,
        err: null,
      }
    }
    case SIGNINFAILED: {
      return{
        ...state,
        fetchSignIn: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    case USERPROFILEFETCH : {
      return {
        ...state,
        fetchUserProfile: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case USERPROFILESUCCESS: {
      return {
        ...state,
        fetchUserProfile: false,
        res: {
          ...state.res,
          profile: {
            ...action.res
          },          
        },
        action: action.type,
        err: null,
      }
    }
    case USERPROFILEFAILED: {
      return{
        ...state,
        fetchUserProfile: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    case USERPROFILEUPDATEFETCH : {
      return {
        ...state,
        fetchUserProfileUpdate: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case USERPROFILEUPDATESUCCESS: {
      return {
        ...state,
        fetchUserProfileUpdate: false,        
        action: action.type,
        err: null,
      }
    }
    case USERPROFILEUPDATEFAILED: {
      return{
        ...state,
        fetchUserProfileUpdate: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    default: {
      return state
    }
  }
}

const initialUtilState = {
  fetchStatus: false,
  fetchDivisi: false,
  send: null,
  err: null,
  res: null
}

export const utilReducer = (state = initialUtilState, action) =>{
  switch(action.type){
    case DIVISIFETCH : {
      return {
        ...state,
        fetchDivisi: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case DIVISISUCCESS: {
      return {
        ...state,
        fetchDivisi: false,
        res: {
          ...state.res,
          divisi:action.res,      
        },
        action: action.type,
        err: null,
      }
    }
    case DIVISIFAILED: {
      return{
        ...state,
        fetchDivisi: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    case STATUSFETCH : {
      return {
        ...state,
        fetchStatus: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case STATUSSUCCESS: {
      return {
        ...state,
        fetchStatus: false,
        res: {
          ...state.res,
          status: action.res       
        },
        action: action.type,
        err: null,
      }
    }
    case STATUSFAILED: {
      return{
        ...state,
        fetchStatus: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    default: {
      return state
    }
  }
}

