import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView, FlatList, RefreshControl, SafeAreaView } from 'react-native'
import { Container } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
import moment from 'moment';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

//redux
import {
  reportFetch
} from '../report/ReportAction'
import {
  REPORT
} from '../report/ReportConfig'
import { apiRequest } from '../../config/ApiRequest'
import Api from '../../config/Api'
import { connect } from 'react-redux';

const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const yearList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

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
      isOpen: false,
      ytd: '',
      _month: 0,
      _year: 0
    }
  }

  componentDidMount() {
    this._getData()
    var date = new Date()
    date.setDate(date.getDate() - 1)
    var tmp = moment(date).format('LL');
    this.setState({ ytd: tmp }, () => {
      console.log('History Start---')
    })
  }

  _handleDatePicker = (x, y) => {
    var tmp = moment(y).format('LL');
    this.setState({ selectedDateRaw: y, isOpen: false, selectedDate: tmp }, () => {
      this._getData()
    })
  }

  _changeCurrentList = async (x) => {
    this.setState({
      currentList: x
    }, () => {
      this._getData()
    })

  }

  _getData = async (yesterday = null) => {
    let data = {
      url: Api.reportList,
      headers: [
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.auth.res.token
        }
      ],
    }
    if (this.state.currentList == 0) {
      var ytd = new Date()
      ytd.setDate(ytd.getDate())
      data = {
        ...data,
        urlParam: {
          date: moment(ytd).format("YYYY-MM-D"),
        },
      }
    } else if (this.state.currentList == 1) {
      var ytd = new Date()
      ytd.setDate(ytd.getDate() - 1)

      data = {
        ...data,
        urlParam: {
          date: moment(ytd).format("YYYY-MM-D"),
        },
      }

    } else if (this.state.currentList == 2) {
      var ytd = new Date(this.state.selectedDateRaw)
      data = {
        ...data,
        urlParam: {
          date: moment(ytd).format("YYYY-MM-D"),
        },
      }
    } else if (this.state.currentList == 3) {      
      data = {
        ...data,
        urlParam: {
          month: this.state._month + 1,
          year: yearList[this.state._year]
        },
      }
    } else if (this.state.currentList == 4) {
      data = {
        ...data,
        urlParam: {          
          year: yearList[this.state._year]
        },
      }
    }      
    await this._getApi(data)
  }

  _getApi = async (data) => {
    this.setState({
      refreshing: true,
    })
    await apiRequest(data.url + '/' + this.props.res.profile.email, 'get', data)
      .then(res => {
        this.setState({
          listReport: res.data.values
        })
        this.setState({ refreshing: false })
      }).catch(err => {
        console.log(err)
      })
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
            extraData={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else if (this.state.currentList == 1) {
      return (
        <View >
          <Text style={[_Style.mt20, _Style.mb10, _Style.h4]}>{this.state.ytd}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this._getData}
            data={this.state.listReport}
            extraData={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    } else if (this.state.currentList == 2 || this.state.currentList == 3 || this.state.currentList == 4) {
      return (
        <View >
          {this.state.currentList == 2 ?
            <>
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                }}
                onPress={() => this.setState({ isOpen: true })}>
                <Text style={_Style.h4}>{this.state.selectedDate ? this.state.selectedDate : "Select Date"}</Text>
              </TouchableOpacity>
              {this._handleDatePickerShow()}
            </>
            : this.state.currentList == 3 ?
            <>
              <View style={{marginTop: 15,}}>                
                {this._renderMonth()}
              </View>
              <View style={{marginVertical: 15,}}>                
                {this._renderYear()}
              </View>
            </> 
            : 
            <>              
              <View style={{marginVertical: 15,}}>                
                {this._renderYear()}
              </View>
            </>
          }
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={this._getData}
            data={this.state.listReport}
            extraData={this.state.listReport}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )
    }
  }

  _renderMonth = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {monthList.map((v, i) => {
          return (
            <TouchableHighlight key={i}
              underlayColor={_Color.GreyLight}
              onPress={() => this._handleMonthYear('month', i)}
              style={[{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginRight: 10,
                borderRadius: 10,
                color: this.state._month == i ? _Color.Black : _Color.White,
                backgroundColor: this.state._month == i ? _Color.Yellow : _Color.White,
              },
              ]}
            >
              <Text style={this.state._month == i ? [_Style.h5, { fontFamily: _Font.PoppinsBold }] : _Style.h5}>{v}</Text>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }

  _renderYear = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {yearList.map((v, i) => {
          return (
            <TouchableHighlight key={i}
              underlayColor={_Color.GreyLight}
              onPress={() => this._handleMonthYear('year', i)}
              style={[{
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginRight: 10,
                borderRadius: 10,
                color: this.state._year == i ? _Color.Black : _Color.White,
                backgroundColor: this.state._year == i ? _Color.Yellow : _Color.White,
              },
              ]}
            >
              <Text style={this.state._year == i ? [_Style.h5, { fontFamily: _Font.PoppinsBold }] : _Style.h5}>{v}</Text>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }

  _handleMonthYear = (x, val) =>{
    if(x == 'month') this.setState({_month: val},()=>this._getData())
    else this.setState({_year: val}, ()=>this._getData())
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
          data: item,
          from: 'history'
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
        {this.state.listReport.length == 0 ? <View style={{ backgroundColor: _Color.White, padding: 10, borderRadius: 10, }}>
          <Text>No Data</Text>
        </View> : null}
        <View style={{ marginBottom: 90 }}></View>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, report }) => ({
  auth: auth,
  fetch: auth.fetchUserProfile,
  res: auth.res,
  err: auth.err,
  action: auth.action,
  reportRes: report.res,
  reportErr: report.err,
  reportAction: report.action
});

const mapDispatchToProps = dispatch => ({
  dispatchReportFetch: value => dispatch(reportFetch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(History);