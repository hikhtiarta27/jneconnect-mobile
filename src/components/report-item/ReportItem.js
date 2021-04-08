import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native'
import { _Style, _Color, _Font } from '../../styles'

export default ReportItem = (props) => {
  const {item, key} = props
  return (
    <TouchableHighlight key={key}
      underlayColor={_Color.GreyLight}
      onPress={() => console.log('Press')}
      style={[{
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 18,
        backgroundColor: _Color.White,
      }, _Style.mb10]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          height: 53,
          width: 55,
          backgroundColor: item.statusId == 1 ? _Color.Yellow : item.statusId == 2 ? _Color.Green : _Color.Red
        }}>
          <Text style={[_Style.h2]}>{item.description.substr(0, 2).toUpperCase()}</Text>
        </View>
        <View style={{
          marginLeft: 15,
          flexDirection: 'column',
          flex: 1,
          marginBottom: 8,
        }}>
          <View style={{
            flexDirection: 'row',
            flex: 1,
          }}>
            <Text style={[_Style.h3, { fontSize: 13 }]}>{item.status}</Text>
            <Text style={[_Style.h4, { fontSize: 13, textAlign: 'right', flex: 1, }]}>{item.date}</Text>
          </View>
          <Text style={[_Style.h5, { color: "#888" }]} numberOfLines={1}>{item.description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

