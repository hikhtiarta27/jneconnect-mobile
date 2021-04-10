import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView, RefreshControl, FlatList } from 'react-native'
import { Container, Modal } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
import { History } from '../../modules'
import moment from 'moment'

//redux
import {
  reportFetch
} from '../report/ReportAction'
import {
  REPORT
} from '../report/ReportConfig'
import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      listReport: [],       
    }
  }

  componentDidMount(){    
    this._handleRefresh()
  }  

  _handleRefresh = async() => {
    this.setState({
      refreshing: false,
    })    
    var ytd = new Date()
    ytd.setDate(ytd.getDate()-1)
    const data = {
      email: this.props.res.profile.email,
      urlParam: {        
        date: moment(ytd).format("YYYY-MM-D"),
      },
      headers: [        
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.auth.res.token
        }
      ],
    };

    await this.props.dispatchReportFetch(data)    
    this.setState({refreshing: false})
    
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight key={index}
        underlayColor={_Color.GreyLight}
        onPress={() => this.props.navigation.navigate('HistoryDetail', {
          data: item,
          from: 'home'
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
    const {name} = this.props.res.profile    
    return (
      <Container style={{ backgroundColor: _Color.Grey, flex: 1 }}>        
        <View style={[{
          flexDirection: 'row',
          alignItems: 'center'
        }, _Style.mt20, _Style.mb20]}>
          <View style={{
            flex: 1,
            flexDirection: 'column'
          }}>
            <Text style={[_Font.PoppinsRegular, _Style.h1s]}>Hey <Text style={_Style.h1}>{name.substring(0, name.indexOf(" ") == -1 ? name.length : name.indexOf(" "))}!</Text></Text>
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
              showsVerticalScrollIndicator={false}
              refreshing={this.state.refreshing}
              onRefresh={this._handleRefresh}
              data={this.props.reportRes.report}
              extraData={this.props.reportRes.report}
              renderItem={this._renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        {/* </ScrollView> */}        
      </Container>
    );
  }
}

const mapStateToProps = ({auth, report}) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
