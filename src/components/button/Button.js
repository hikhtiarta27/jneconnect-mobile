import React, {Component} from 'react'
import {  
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import { _Style, _Color, _Font } from '../../styles'

export default Button = ({style, buttonName, primary, onPress}) =>{
  return(    
    <TouchableHighlight 
      underlayColor={_Color.Underlay}
      style={{                        
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,        
        backgroundColor: primary ? _Color.Yellow : _Color.GreyDark,               
        marginBottom: 10,
        ...style,
      }} onPress={onPress}>
      <Text style={[_Style.h5, {fontFamily: _Font.PoppinsSemiBold, textAlign: 'center'}]}>{buttonName}</Text>
    </TouchableHighlight>  
  );
}

