import { combineReducers } from 'redux';
import {authReducer, utilReducer} from '../modules/auth/AuthReducer'
import {reportReducer} from '../modules/report/ReportReducer'

const reduxReducer = combineReducers({
  auth: authReducer,
  util: utilReducer,
  report: reportReducer
});

export default reduxReducer;
