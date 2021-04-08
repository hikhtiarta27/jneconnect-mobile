import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import { Button, Container } from '../../components'
import { _Style, _Font, _Color } from '../../styles'

class HistoryDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      report: props.navigation.getParam('data')
    }
  }

  render() {

    const { report } = this.state

    return (
      <Container style={{ backgroundColor: _Color.White }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
          marginTop: 10,
        }}>
          <View style={{            
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            height: 65,
            width: 65,
            backgroundColor: report.statusId == 1 ? _Color.Yellow : report.statusId == 2 ? _Color.Green : _Color.Red
          }}>
            <Text style={[_Style.h2]}>{report.description.substr(0, 2).toUpperCase()}</Text>
          </View>
          <View style={{
            marginLeft: 20,
            flexDirection: 'column',                        
          }}>            
            <Text style={[_Style.h3, { fontSize: 13 }]}>{report.status}</Text>
            <Text style={[_Style.h4, { fontSize: 13 }]}>{report.date}</Text>
          </View>
        </View>
        <Text style={[_Style.h3, _Style.mb10, _Style.mt20]} >Description</Text>        
        <Text style={[_Style.h5, { color: "#888" }]}>{report.description}</Text>
        <View>

        </View>
      </Container>
    );
  }
}

export default HistoryDetail;