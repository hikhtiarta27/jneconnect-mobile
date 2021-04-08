import React, {Component} from 'react'
import {
  View,
} from 'react-native'

export default Container = (props) =>{
  return(
    <View style={{
      paddingVertical: 10,
      paddingHorizontal: 20,
      flex: 1,
      ...props.style
    }}>
      {props.children}
    </View>
  );
}

