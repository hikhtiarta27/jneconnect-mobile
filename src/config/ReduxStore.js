import AsyncStorage from '@react-native-community/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';

import rootSaga from './ReduxSaga'
import rootReducer from './ReduxReducer'

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
let persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default () => {
  return { store, persistor }
}
