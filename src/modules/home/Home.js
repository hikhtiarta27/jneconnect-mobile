import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView, RefreshControl, FlatList } from 'react-native'
import { Container, Modal } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
import { History } from '../../modules'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      listReport: []
    }
  }

  componentDidMount(){
    this._handleRefresh()
  }

  _handleRefresh = () => {
    console.log('refresh')
    this.setState({
      refreshing: false,
    })

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then(res=>{
      var tmp = [
        {
          'id': 1,
          'statusId': 1,
          'status': 'On Progress',
          'description': 'Create new API for fund',
          'date': 'Apr 7, 2021'
        },
        {
          'id': 2,
          'statusId': 3,
          'status': 'Canceled',
          'description': 'Build APK dasko asdka soda sd kaos dkaosd kaosk doaso dao kdosa',
          'date': 'Apr 7, 2021'
        },
        {
          'id': 3,
          'statusId': 2,
          'status': 'Done',
          'description': 'Create new API for product',
          'date': 'Apr 7, 2021'
        }
      ]
      this.setState({
        listReport: tmp
      })
    }).finally(()=>this.setState({refreshing: false}))
    
    
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight key={index}
        underlayColor={_Color.GreyLight}
        onPress={() => this.props.navigation.navigate('HistoryDetail', {
          data: item
        })}
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

  render() {
    return (
      <Container style={{ backgroundColor: _Color.Grey, flex: 1 }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={[{
          flexDirection: 'row',
          alignItems: 'center'
        }, _Style.mt20, _Style.mb20]}>
          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>
            <Text style={[_Font.PoppinsRegular, _Style.h1s]}>Hey <Text style={_Style.h1}>Hasan!</Text></Text>
            <Text style={[_Style.h3s]}>Welcome Back</Text>
          </View>
          <TouchableHighlight
            underlayColor={_Color.GreyLight}
            onPress={() => this.props.navigation.navigate('HomeProfile')}
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: 15,
              padding: 13,
              backgroundColor: _Color.Yellow
            }}
          >
            <SimpleIcon name='user' size={20} />
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={_Color.GreyLight}
            onPress={() => this.props.navigation.navigate('HomeNotification')}
            style={{
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: 15,
              padding: 13,
              backgroundColor: "#ccc",
              marginLeft: 10,
            }}
          >
            <SimpleIcon name='bell' size={20} />
          </TouchableHighlight>
        </View>
        {/* <ScrollView showsVerticalScrollIndicator={false}
          
        > */}
          <View>
            <Text style={[_Style.h2, _Style.mb20]} >Yesterday is <Text style={{ fontStyle: 'italic' }}>History</Text></Text>
            <FlatList 
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              data={this.state.listReport}
              renderItem={this._renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        {/* </ScrollView> */}
      </Container>
    );
  }
}

export default Home