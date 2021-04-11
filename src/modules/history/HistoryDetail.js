import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Button, Container, Modal, TextField } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
import ActionSheet from "react-native-actions-sheet";
import _S from './_StylesHistory'
import { Formik } from 'formik';
import * as Yup from 'yup';

import { reportUpdateFetch, reportDetailFetch } from '../report/ReportAction'
import { REPORT, REPORT_DETAIL } from '../report/ReportConfig'
import { connect } from 'react-redux'
import { apiRequest } from '../../config/ApiRequest'
import Api from '../../config/Api'

const reportScheme = Yup.object().shape({
  description: Yup.string()
    .required('Required'),
});

class HistoryDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      editModal: false,
      deleteModal: false,
      report: props.navigation.getParam('data'),
      _formReport: props.navigation.getParam('data'),
      statusList: props.status || [],
      _status: parseInt(props.navigation.getParam('data').statusId),
      _statusRaw: parseInt(props.navigation.getParam('data').statusId),
      isModalStatus: false,
      action: this.props.action,
      err: this.props.err,
      res: this.props.res,
      snackError: null,
    },
    this.actionSheetRef = React.createRef()
    this.deleteSheetRef = React.createRef()
    this.formik = React.createRef()
  }

  componentDidMount() {
    let data = {
      id: this.state.report.id,
      email: this.props.profile.email,
      headers: [
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        },
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.token,
        }
      ],
    };
    this.props.dispatchReportDetailFetch(data)
    console.log(this.props.navigation.getParam('from'))
  }

  _handleForm = async (values) => {   
    this.setState({
      snackError: 'Loading...'
    }) 
    let data = {
      id: this.state.report.id,
      param: {
        statusId: this.state._status,
        description: values.description,
        token: this.props.token,
        email: this.props.profile.email
      },
      headers: [
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        },
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.token,
        }
      ],
    };    

    await apiRequest(Api.reportDetail + '/' + data.id , 'put', data)
    .then(res => {        
           
    }).catch(err=>{
      console.log(err)
    })

    data = {
      id: this.state.report.id,
      email: this.props.profile.email,
      headers: [
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        },
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.token,
        }
      ],
    };    

    await apiRequest(Api.reportDetail + '/' + data.email + '/' + data.id, 'get', data)
    .then(res => {        
      this.setState({ report: res.data.values }, ()=>{
        this.setState({editModal: false}, ()=>{
          setTimeout(()=>{
            this.setState({snackError: 'Report successfully updated'})
          }, 500) 
        })    
      })      
    }).catch(err=>{
      console.log(err)
    })

    
  }

  _handleDelete = async ()=>{
    let data = {
      id: this.state.report.id,      
      headers: [
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        },
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.token,
        }
      ],
    };    

    await apiRequest(Api.reportDelete + '/' + data.id , 'delete', data)
    .then(res => {          
      this.deleteSheetRef.current?.setModalVisible();
      setTimeout(()=>{
        this.setState({snackError: 'Deleting....'}, ()=>{
          setTimeout(() => {
            if(this.props.navigation.getParam('from')=='history'){
              this.props.navigation.navigate('History', {
                data: {
                  deleted: true
                }
              })
            } else{
              this.props.navigation.navigate('Home', {
                data: {
                  deleted: true
                }
              })
            }   
          }, 500);
        })
      }, 500)           
    }).catch(err=>{
      console.log(err)
    })
    
  }


  _renderFormReport = () => {
    return (
      <>
        <Formik
          innerRef={this.formik}
          initialValues={this.state.report}
          onSubmit={values => this._handleForm(values)}
          validationSchema={reportScheme}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextField
                autoFocus={true}
                editable={true}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                fieldName='Description'
                defaultValue={values.description}
                error={errors.description && touched.description ? errors.description : null}
              />

              <Text style={[_Style.h5, { marginBottom: 10, fontFamily: _Font.PoppinsSemiBold }]}>Status</Text>
              <TouchableOpacity onPress={() => this.setState({ isModalStatus: true })}
                style={_S.buttonStatus}
                activeOpacity={0.8}
              >
                <View style={{ flexDirection: 'row' }}>
                  {this.state.statusList.map((v, i) => {
                    if (v.id == this.state._status) {
                      return (
                        <Text key={i} style={{ flex: 1, color: '#000' }}>{v.name}</Text>
                      )
                    }
                  })}
                  <Icon name='caretdown' size={15} color='#000' />
                </View>
              </TouchableOpacity>

              <Modal
                headerName="Choose Status"
                cancelFunc={() => this.setState({ isModalStatus: false })}
                isVisible={this.state.isModalStatus}
                onBackButtonPress={() => this.setState({ isModalStatus: false })}
              >
                <>
                  {this.state.statusList.map((v, i) => {
                    return (
                      <TouchableOpacity key={i} style={[{ borderBottomColor: "#aaa", borderBottomWidth: 1, paddingVertical: 20 }, i == 0 ? {
                        borderTopColor: "#aaa", borderTopWidth: 1,
                      } : null]} activeOpacity={0.8} onPress={() => {
                        this.setState({
                          _status: v.id,
                          isModalStatus: false
                        })
                      }}>
                        <Text style={[_Style.h4, this.state._status == v.id ? { fontFamily: _Font.PoppinsBold } : { fontFamily: _Font.PoppinsRegular }]}>{v.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </>
              </Modal>

              <Button primary onPress={handleSubmit} buttonName="Save" />
            </View>
          )}
        </Formik>
      </>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: _Color.White }} snackError={this.state.snackError}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            height: 65,
            width: 65,
            backgroundColor: this.state.report.statusId == 1 ? _Color.Yellow : this.state.report.statusId == 2 ? _Color.Green : _Color.Red
          }}>
            <Text style={[_Style.h2]}>{this.state.report.description.substr(0, 2).toUpperCase()}</Text>
          </View>
          <View style={{
            marginLeft: 20,
            flexDirection: 'column',
            flex: 1,
          }}>
            <Text style={[_Style.h3, { fontSize: 13 }]}>{this.state.report.status}</Text>
            <Text style={[_Style.h4, { fontSize: 13 }]}>{this.state.report.date}</Text>
          </View>
          <TouchableOpacity
            style={{ paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}
            activeOpacity={1}
            onPress={() => {
              this.actionSheetRef.current?.setModalVisible();
            }}
          >
            <Icon name='ellipsis1' size={25} />
          </TouchableOpacity>
        </View>
        <Text style={[_Style.h3, _Style.mb10, _Style.mt20]} >Description</Text>
        <Text style={[_Style.h5, { color: "#888" }]}>{this.state.report.description}</Text>
        <ActionSheet ref={this.actionSheetRef}>
          <View >            
            <TouchableHighlight style={_S.buttonAction} underlayColor={_Color.Underlay} onPress={() => {
              this.setState({ editModal: true })
              this.actionSheetRef.current?.setModalVisible();
            }}>
              <Text style={[_Style.h5, {fontFamily: _Font.PoppinsSemiBold}]}>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight style={_S.buttonAction} underlayColor={_Color.Underlay} onPress={() => {
              this.deleteSheetRef.current?.setModalVisible();
              this.actionSheetRef.current?.setModalVisible();
            }}>
              <Text style={[_Style.h5, { color: _Color.RedLight }]}>Delete</Text>
            </TouchableHighlight>
          </View>
        </ActionSheet>
        <Modal
          headerName="Edit Report"
          cancelFunc={() => this.setState({ editModal: false, _status: this.state._statusRaw })}
          isVisible={this.state.editModal}
          onBackButtonPress={() => this.setState({ editModal: false, _status: this.state._statusRaw })}
        >
          <>
            {this._renderFormReport()}
          </>
        </Modal>
        <ActionSheet ref={this.deleteSheetRef} >
          <View >
            <Text style={[_Style.h3, { paddingVertical: 20, textAlign: 'center' }]}>Delete Report?</Text>
            <TouchableHighlight style={_S.buttonAction} underlayColor={_Color.Underlay} onPress={() => {
              this._handleDelete()              
            }}>
              <Text style={[_Style.h5, { color: _Color.RedLight }]}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight style={_S.buttonAction} underlayColor={_Color.Underlay} onPress={() => {
              this.deleteSheetRef.current?.setModalVisible();
            }}>
              <Text style={_Style.h5}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </ActionSheet>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, report, util }) => ({
  token: auth.res.token,
  report: report,
  profile: auth.res.profile,
  res: report.res,
  err: report.err,
  action: report.action,
  status: util.res.status
});

const mapDispatchToProps = dispatch => ({
  dispatchReportUpdateFetch: value => dispatch(reportUpdateFetch(value)),
  dispatchReportDetailFetch: value => dispatch(reportDetailFetch(value))

});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetail);
