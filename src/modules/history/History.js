import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView, FlatList, RefreshControl, SafeAreaView } from 'react-native'
import { Container } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
import moment from 'moment';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

class History extends Component {

  constructor(props) {
    super(props)
    this.state = {
      configList: ['Today', 'Yesterday', 'Daily', 'Monthly', 'Yearly'],
      currentList: 0,
      refreshing: false,
      listReport: [],
      selectedDate: null,
      selectedDateRaw: null,
      isOpen: false
    }
  }

  componentDidMount = () => {
    this._getData()
  }

  _handleDatePicker = (x, y) => {
    var tmp = moment(y).format('LL');
    this.setState({ selectedDateRaw: y, isOpen: false, selectedDate: tmp })
  }

  _changeCurrentList = async (x) => {
    this.setState({
      currentList: x
    })
    if (x == 1) {
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1)
      this._getData(yesterday)
    }
  }

  _getData = (yesterday = null) => {
    console.log(yesterday)
    this.setState({
      refreshing: false,
    })
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then(res => {
        var tmp = [
          {
            'id': 1,
            'statusId': '1',
            'status': 'On Progress',
            'description': 'Create new API for fund',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 2,
            'statusId': '3',
            'status': 'Canceled',
            'description': 'Build APK',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 3,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 4,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 5,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 6,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 7,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 8,
            'statusId': '2',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          },
          {
            'id': 9,
            'statusId': '1',
            'status': 'Done',
            'description': 'Create new API for product',
            'date': 'Apr 7, 2021'
          }

        ]
        this.setState({
          listReport: tmp
        })
      }).finally(() => this.setState({ refreshing: false }))

  }

  _renderData = () => {
    if (this.state.currentList == 0) {
      return (
        <View style={_Style.mt20}>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this._getData}
            data={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else if (this.state.currentList == 1) {
      return (
        <View >
          <Text style={[_Style.mt20, _Style.mb10, _Style.h4]}>Apr 6, 2021</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this._getData}
            data={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else if (this.state.currentList == 2 || this.state.currentList == 3) {
      return (
        <View >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}
            onPress={() => this.setState({ isOpen: true })}>
            <Text style={_Style.h4}>{this.state.selectedDate ? this.state.selectedDate : "Select Date"}</Text>
          </TouchableOpacity>
          {this._handleDatePickerShow()}        
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this._getData}
            data={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )
    }
  }

  _handleDatePickerShow = () => {
    if (this.state.isOpen) {
      return (
        <DateTimePicker          
          testID="dateTimePicker"
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display="calendar"          
          onChange={(event, selectedDate) => this._handleDatePicker(event, selectedDate)}
        />
      );
    }
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
      <Container>
        <View style={[_Style.mt20, _Style.mb10]}>
          <Text style={_Style.h1}>Report History</Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {this.state.configList.map((v, i) => {
              return (
                <TouchableHighlight key={i}
                  underlayColor={_Color.GreyLight}
                  onPress={() => this._changeCurrentList(i)}
                  style={[{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    color: this.state.currentList == i ? _Color.Black : _Color.White,
                    backgroundColor: this.state.currentList == i ? _Color.Yellow : _Color.White,
                  },
                  ]}
                >
                  <Text style={this.state.currentList == i ? [_Style.h5, { fontFamily: _Font.PoppinsBold }] : _Style.h5}>{v}</Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
        {this._renderData()}
        <View style={{ marginBottom: 90 }}></View>
      </Container>
    );
  }
}

export default History