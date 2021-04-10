import {
  REPORT,
  REPORT_DETAIL,
  REPORT_CREATE,
  REPORT_UPDATE,
  REPORT_DELETE
} from './ReportConfig'

export const reportFetch = value => ({type: REPORT.FETCH, send: value})
export const reportSuccess = value => ({type: REPORT.SUCCESS, res: value})
export const reportFailed = value => ({type: REPORT.FAILED, err: value})

export const reportDetailFetch = value => ({type: REPORT_DETAIL.FETCH, send: value})
export const reportDetailSuccess = value => ({type: REPORT_DETAIL.SUCCESS, res: value})
export const reportDetailFailed = value => ({type: REPORT_DETAIL.FAILED, err: value})

export const reportCreateFetch = value => ({type: REPORT_CREATE.FETCH, send: value})
export const reportCreateSuccess = value => ({type: REPORT_CREATE.SUCCESS, res: value})
export const reportCreateFailed = value => ({type: REPORT_CREATE.FAILED, err: value})

export const reportUpdateFetch = value => ({type: REPORT_UPDATE.FETCH, send: value})
export const reportUpdateSuccess = value => ({type: REPORT_UPDATE.SUCCESS, res: value})
export const reportUpdateFailed = value => ({type: REPORT_UPDATE.FAILED, err: value})

export const reportDeleteFetch = value => ({type: REPORT_DELETE.FETCH, send: value})
export const reportDeleteSuccess = value => ({type: REPORT_DELETE.SUCCESS, res: value})
export const reportDeleteFailed = value => ({type: REPORT_DELETE.FAILED, err: value})
