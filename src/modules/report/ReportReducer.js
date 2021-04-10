import {
  REPORT,
  REPORT_DETAIL,
  REPORT_CREATE,
  REPORT_UPDATE,
  REPORT_DELETE
} from './ReportConfig'

const initialReportState = {
  fetchReport: false,
  fetchReportDetail: false,
  fetchReportCreate: false,
  fetchReportUpdate: false,
  fetchReportDelete: false,
  send: null,
  err: null,
  res: {
    report: []
  }
}

export const reportReducer = (state = initialReportState, action) =>{
  switch(action.type){
    case REPORT.FETCH : {
      return {
        ...state,
        fetchReport: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case REPORT.SUCCESS: {
      return {
        ...state,
        fetchReport: false,
        res: {
          ...state.res,
          report: action.res,          
        },
        action: action.type,
        err: null,
      }
    }
    case REPORT.FAILED: {
      return{
        ...state,
        fetchReport: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }

    case REPORT_DETAIL.FETCH : {
      return {
        ...state,
        fetchReportDetail: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case REPORT_DETAIL.SUCCESS: {
      return {
        ...state,
        fetchReportDetail: false,
        res: {
          ...state.res,
          reportDetail: action.res,          
        },
        action: action.type,
        err: null,
      }
    }
    case REPORT_DETAIL.FAILED: {
      return{
        ...state,
        fetchReportDetail: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }

    case REPORT_CREATE.FETCH : {
      return {
        ...state,
        fetchReportCreate: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case REPORT_CREATE.SUCCESS: {
      return {
        ...state,
        fetchReportCreate: false,    
        action: action.type,
        res: {
          ...state.res,
          message: action.res
        },
        err: null,
      }
    }
    case REPORT_CREATE.FAILED: {
      return{
        ...state,
        fetchReportCreate: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    case REPORT_UPDATE.FETCH : {
      return {
        ...state,
        fetchReportUpdate: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case REPORT_UPDATE.SUCCESS: {
      return {
        ...state,
        fetchReportUpdate: false,    
        action: action.type,
        err: null,
      }
    }
    case REPORT_UPDATE.FAILED: {
      return{
        ...state,
        fetchReportUpdate: false,
        action: action.type,
        err: {
          code: action.err.code,
          message: action.err.message
        }
      }
    }
    case REPORT_DELETE.FETCH : {
      return {
        ...state,
        fetchReportDelete: true,
        send: action.send,
        action: action.type,
        err: null,
      }
    }
    case REPORT_DELETE.SUCCESS: {
      return {
        ...state,
        fetchReportDelete: false,    
        action: action.type,
        err: null,
      }
    }
    case REPORT_DELETE.FAILED: {
      return{
        ...state,
        fetchReportDelete: false,
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

