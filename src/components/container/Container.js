import {
  View,
} from 'react-native'

export default Container = (props) =>{
  return(
    <View style={{
      marginHorizontal:10
    }}>
      {props.children}
    </View>
  );
}

