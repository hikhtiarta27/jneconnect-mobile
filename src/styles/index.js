import _Font from './Font'
import _Color from './Color'
import { StyleSheet } from 'react-native'

const addLineHeight = 4
const fontSize = 18

const _Style = StyleSheet.create({

  //text  
  h1: {
    fontSize: fontSize,
    lineHeight: fontSize + addLineHeight,
    fontFamily: _Font.PoppinsBold,
    letterSpacing: 0.15,    
  },
  h1s: {
    fontSize: fontSize,
    lineHeight: fontSize + addLineHeight,
    letterSpacing: 0.15,
  },
  h2: {
    fontSize: fontSize - 2,
    lineHeight: fontSize - 2 + addLineHeight,
    fontFamily: _Font.PoppinsSemiBold,
    letterSpacing: 0.15,
  },
  h3: {
    fontSize: fontSize - 3,
    lineHeight: fontSize - 3 + addLineHeight,
    fontFamily: _Font.PoppinsSemiBold,    
  },
  h3s: {
    fontSize: fontSize - 3,
    lineHeight: fontSize - 3 + addLineHeight,  
    fontFamily: _Font.PoppinsRegular,  
  },
  h4: {
    fontSize: fontSize - 4,
    lineHeight: fontSize - 4 + addLineHeight,
    fontFamily: _Font.PoppinsRegular,    
  },
  h5: {
    fontSize: fontSize - 6,
    lineHeight: fontSize - 6 + addLineHeight,
    fontFamily: _Font.PoppinsRegular,    
  },

  //margin

  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  }
})

export {
  _Font,
  _Style,
  _Color
}