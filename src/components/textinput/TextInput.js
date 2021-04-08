import React, {Component} from 'react'
import {  
  TextInput,
  View,
  Text
} from 'react-native'
import { _Style, _Color, _Font } from '../../styles'

export default TextField = (props) =>{
  return(
    <View style={{flexDirection: 'column'}}>
      <Text style={[_Style.h5, {marginBottom: 10, fontFamily: _Font.PoppinsSemiBold}]}>{props.fieldName}</Text>
      <TextInput style={[{
        paddingVertical: 8,
        paddingHorizontal: 15, 
        borderWidth: 1,
        borderRadius: 8,     
        borderColor: "#aaa",
        color: props.editable ? "#000" : "#aaa",
        backgroundColor: _Color.White,
        marginBottom: 10,
        ...props.style
      }, _Style.h5]} {...props} />  
      {props.error ? <Text style={[_Style.h5, {color: _Color.Red}, _Style.mb10]}>{props.error}</Text>  : null}
    </View>    
  );
}

