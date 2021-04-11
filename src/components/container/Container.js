import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Text
} from 'react-native'
import Snackbar from 'react-native-snackbar';
import NetInfo from "@react-native-community/netinfo";
import {_Color, _Style} from '../../styles'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: true
    }
  }

  componentDidMount(){
    this.unsubscribe = NetInfo.addEventListener(state => {    
      this.setState({isConnected: state.isConnected})
    });
  }

  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    return (
      <View style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        ...this.props.style
      }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {this.props.children}
        {this.props.snackError != null && Snackbar.show({
          text: this.props.snackError,
          duration: Snackbar.LENGTH_SHORT,
        })}
        {!this.state.isConnected && <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 5, backgroundColor: _Color.RedLight}}>
          <Text style={[_Style.h5, {textAlign: 'center', color: "#FFF"}]}>No Internect Connection</Text>
          </View>}
      </View>
    );
  }
}

export default Container
