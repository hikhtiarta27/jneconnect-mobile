import { all } from 'redux-saga/effects';

import {
  watcherAuth,
} from '../modules/auth/AuthSaga'
import {
  watcherReport,
} from '../modules/report/ReportSaga'

const watcherList =  [
  ...watcherAuth,
  ...watcherReport
]

export default function* allSaga(){
  yield all(watcherList)
}