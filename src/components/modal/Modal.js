import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native'
import { _Style, _Font, _Color } from '../../styles'
import Icon from 'react-native-vector-icons/AntDesign'
import Modals from 'react-native-modal'

export default Modal = (props) => {
  return (
    <Modals
      {...props}
      animationIn="slideInUp"
      animationOut="slideOutDown"      
      style={[{
        backgroundColor: _Color.White,
        padding: 20,
        margin: 0
      }, props.style]}      
    >
      <>
        {props.cancelFunc && <View style={[_Style.mb20, { flexDirection: 'row', alignItems: 'center' }]}>
          <TouchableOpacity onPress={props.cancelFunc}>
            <Icon name="close" size={25} />
          </TouchableOpacity>
          <Text style={[{ flex: 1, marginHorizontal: 27, }, _Style.h2]}>{props.headerName}</Text>
        </View>}
        <ScrollView showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      </>
    </Modals>
  );
}