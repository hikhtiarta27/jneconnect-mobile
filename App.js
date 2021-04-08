import React, { Component } from 'react'
import {View} from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReduxStore from './src/config/ReduxStore'
import BottomTab from './src/config/Router'

const {store, persistor} = ReduxStore();

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <BottomTab />
        </PersistGate>
      </Provider>
    )
  }
}

export default App;