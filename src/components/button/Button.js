import React, {Component} from 'react'
import {  
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import { _Style, _Color, _Font } from '../../styles'

export default Button = (props) =>{
  return(
    <TouchableHighlight 
      underlayColor="#eee"
      style={[{                        
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,        
        backgroundColor: props.primary ? _Color.Yellow : _Color.GreyDark,
        ...props.style
      }, _Style.mt10]} {...props}>
      <Text style={[_Style.h5, {fontFamily: _Font.PoppinsSemiBold, textAlign: 'center'}]}>{props.buttonName}</Text>
    </TouchableHighlight>  
  );
}

