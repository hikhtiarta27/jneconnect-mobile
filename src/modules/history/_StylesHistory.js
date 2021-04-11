import {
  StyleSheet
} from 'react-native'

import {_Style, _Font, _Color} from '../../styles'

export default _S = StyleSheet.create({
  buttonAction: {
    padding: 20,
    backgroundColor: _Color.White,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eaeaea'
  },
  buttonStatus:{
    paddingVertical: 12,
    paddingHorizontal: 15, 
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#aaa",
    color: '#000',
    backgroundColor: _Color.White,
    marginBottom: 10,
    justifyContent: 'center'
  }
})