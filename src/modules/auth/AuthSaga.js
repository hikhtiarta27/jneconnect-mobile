import {
  call, put, takeLatest, putResolve
} from 'redux-saga/effects';

import {
  apiRequest
} from '../../config/ApiRequest'

import {
  SIGNINAPI,
  SIGNINFETCH,

  USERPROFILEAPI,
  USERPROFILEFETCH,

  USERPROFILEUPDATEAPI,
  USERPROFILEUPDATEFETCH,
  
  DIVISIAPI,
  DIVISIFETCH,

  STATUSAPI,
  STATUSFETCH

} from './AuthConfig'

import {
  signInFetch,
  signInSuccess,
  signInFailed,

  userProfileFetch,
  userProfileSuccess,
  userProfileFailed,  

  userProfileUpdateFetch,
  userProfileUpdateSuccess,
  userProfileUpdateFailed,  

  divisiFetch,
  divisiSuccess,
  divisiFailed,

  statusFetch,
  statusSuccess,
  statusFailed
} from './AuthAction'

function* workerAuth(param){  
  try{
    const token = yield call(apiRequest, SIGNINAPI, 'post', param.send)    
    if(token.status == 200 && token.data.auth == true){
      const data = {   
        email: token.data.email,     
        headers: [        
          {
            keyHeader: 'x-access-token',
            valueHeader: token.data.token,
          }
        ],
      };
      yield put(userProfileFetch(data))
      yield putResolve(signInSuccess(token.data))    
    }else{      
      yield putResolve(signInFailed({
        code: token.status,
        message: token.data.errors
      }))
    }    
  }catch(error){    
    yield putResolve(signInFailed({ code: '999', message: error }));
  }  
}

function* workerUser(param){
  try{
    const result = yield call(apiRequest, USERPROFILEAPI + '/' + param.send.email, 'get', param.send)
    if(result.status == 200 && result.data.errors == null) yield putResolve(userProfileSuccess(result.data.values))
    else yield putResolve(userProfileFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(userProfileFailed({ code: '999', message: error }));
  }
}

function* workerUserUpdate(param){
  try{
    const result = yield call(apiRequest, USERPROFILEUPDATEAPI, 'put', param.send)    
    if(result.status == 200 && result.data.errors == null) {      
      const data = {   
        email: param.send.param.email,
        headers: [        
          {
            keyHeader: 'x-access-token',
            valueHeader: param.send.param.token
          }
        ],
      };
      yield put(userProfileFetch(data))
      yield putResolve(userProfileUpdateSuccess(result.data.message))
    }
    else yield putResolve(userProfileUpdateFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(userProfileUpdateFailed({ code: '999', message: error }));
  }
}

function* workerDivisi(param){
  try{
    const result = yield call(apiRequest, DIVISIAPI, 'get', param.send)    
    if(result.status == 200 && result.data.errors == null) yield putResolve(divisiSuccess(result.data.values))
    else yield putResolve(divisiFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(divisiFailed({ code: '999', message: error }));
  }
}

function* workerStatus(param){
  try{
    const result = yield call(apiRequest, STATUSAPI, 'get', param.send)    
    if(result.status == 200 && result.data.errors == null) yield putResolve(statusSuccess(result.data.values))
    else yield putResolve(statusFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(statusFailed({ code: '999', message: error }));
  }
}

export const watcherAuth = [
  takeLatest(SIGNINFETCH, workerAuth),
  takeLatest(USERPROFILEFETCH, workerUser),
  takeLatest(USERPROFILEUPDATEFETCH, workerUserUpdate),
  takeLatest(DIVISIFETCH, workerDivisi),
  takeLatest(STATUSFETCH, workerStatus),
];