import {
  call, put, takeLatest, putResolve, takeEvery, take
} from 'redux-saga/effects';

import {
  apiRequest
} from '../../config/ApiRequest'

import {
  REPORT,
  REPORT_DETAIL,
  REPORT_CREATE,
  REPORT_UPDATE,
  REPORT_DELETE
} from './ReportConfig'

import {
  reportFetch,
  reportSuccess,
  reportFailed,

  reportDetailFetch,
  reportDetailSuccess,
  reportDetailFailed,

  reportCreateFetch,
  reportCreateSuccess,
  reportCreateFailed,

  reportUpdateFetch,
  reportUpdateSuccess,
  reportUpdateFailed,

  reportDeleteFetch,
  reportDeleteSuccess,
  reportDeleteFailed,
} from './ReportAction'

function* workerReport(param){  
  try{
    const result = yield call(apiRequest, REPORT.API + '/' + param.send.email, 'get', param.send)            
    if(result.status == 200 && result.data.errors == null) yield putResolve(reportSuccess(result.data.values))
    else yield putResolve(reportFailed({ code: result.status, message: error }));
  }catch(error){
    console.log(error)
    yield putResolve(reportFailed({ code: '999', message: error }));
  }
}

function* workerReportDetail(param){  
  try{
    const result = yield call(apiRequest, REPORT_DETAIL.API + '/' + param.send.email + '/' + param.send.id, 'get', param.send)            
    if(result.status == 200 && result.data.errors == null) yield putResolve(reportDetailSuccess(result.data.values))
    else yield putResolve(reportDetailFailed({ code: result.status, message: error }));
  }catch(error){
    console.log(error)
    yield putResolve(reportDetailFailed({ code: '999', message: error }));
  }
}

function* workerReportCreate(param){  
  try{
    const result = yield call(apiRequest, REPORT_CREATE.API, 'post', param.send)        
    if(result.status == 200 && result.data.errors == null) yield putResolve(reportCreateSuccess(result.data.message))
    else yield putResolve(reportCreateFailed({ code: result.status, message: error }));
  }catch(error){
    console.log(error)
    yield putResolve(reportCreateFailed({ code: '999', message: error }));
  }
}

function* workerReportUpdate(param){
  try{
    const result = yield call(apiRequest, REPORT_UPDATE.API + '/' + param.send.id, 'put', param.send)
    
    if(result.status == 200 && result.data.errors == null) {
      // var ytd = new Date()
      // ytd.setDate(ytd.getDate()-1)
      // const data = {   
      //   email: param.send.param.email,
      //   urlParam: {        
      //     date: moment(ytd).format("YYYY-MM-D"),
      //   },
      //   headers: [        
      //     {
      //       keyHeader: 'x-access-token',
      //       valueHeader: param.send.param.token
      //     }
      //   ],
      // };
      // yield put(reportFetch(data))
      yield putResolve(reportUpdateSuccess(result.data.message))
    }
    else yield putResolve(reportUpdateFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(reportUpdateFailed({ code: '999', message: error }));
  }
}

function* workerReportDelete(param){
  try{
    const result = yield call(apiRequest, REPORT_DELETE.API + '/' + param.send.id, 'delete', param.send)
    if(result.status == 200 && result.data.errors == null) yield putResolve(reportDeleteSuccess(result.data.message))
    else yield putResolve(reportDeleteFailed({ code: result.status, message: error }));
  }catch(error){
    yield putResolve(reportDeleteFailed({ code: '999', message: error }));
  }
}

// function* workerUserUpdate(param){
//   try{
//     const result = yield call(apiRequest, USERPROFILEUPDATEAPI, 'put', param.send)    
//     if(result.status == 200 && result.data.errors == null) {      
//       const data = {   
//         email: param.send.param.email,
//         headers: [        
//           {
//             keyHeader: 'x-access-token',
//             valueHeader: param.send.param.token
//           }
//         ],
//       };
//       yield put(userProfileFetch(data))
//       yield putResolve(userProfileUpdateSuccess(result.data.message))
//     }
//     else yield putResolve(userProfileUpdateFailed({ code: result.status, message: error }));
//   }catch(error){
//     yield putResolve(userProfileUpdateFailed({ code: '999', message: error }));
//   }
// }

export const watcherReport = [  
  // takeLatest(REPORT.FETCH, workerReport),  
  takeLatest(REPORT.FETCH, workerReport),
  takeLatest(REPORT_DETAIL.FETCH, workerReportDetail),  
  takeLatest(REPORT_CREATE.FETCH, workerReportCreate),  
  takeLatest(REPORT_UPDATE.FETCH, workerReportUpdate),  
  takeLatest(REPORT_DELETE.FETCH, workerReportDelete),  

];