import React, {Component} from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import Snackbar from 'react-native-snackbar';

export default Container = (props) =>{
  return(
    <View style={{
      paddingVertical: 10,
      paddingHorizontal: 20,
      flex: 1,
      ...props.style
    }}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {props.children}
      {props.snackError != null && Snackbar.show({
        text: props.snackError,
        duration: Snackbar.LENGTH_SHORT,          
      })}
    </View>
  );
}

