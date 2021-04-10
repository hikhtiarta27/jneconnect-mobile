import React, { Component } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { Container, TextField, Button, Modal } from '../../../components'
import { _Style, _Font, _Color } from '../../../styles'
// import Modal from 'react-native-modal'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign'

import { connect } from 'react-redux'
import { 
  reportCreateFetch
} from '../ReportAction'
import {
  REPORT_CREATE
} from '../ReportConfig'

const reportScheme = Yup.object().shape({
  description: Yup.string()
    .required('Required'),
});

class ReportNew extends Component {

  constructor(props){
    super(props)
    this.state = {
      report: {
        description: ''        
      },
      statusList: props.status || [],
      _status: 1,
      isModalReport: false, 
      action: this.props.action,
      err: this.props.err,
      res: this.props.res,            
      snackError: null
    }
  }  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.action !== prevState.action) {
      let nextErr = prevState.err;
      let nextRes = prevState.res;

      if (nextProps.action === REPORT_CREATE.FAILED) {
        nextErr = nextProps.err;
      }
      if (nextProps.action === REPORT_CREATE.SUCCESS) {
        nextRes = nextProps.res;
      }

      return {
        action: nextProps.action,
        err: nextErr,
        res: nextRes,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.action !== this.state.action) {
      if (this.state.action === REPORT_CREATE.FAILED) {
        this.setState({
          snackError: this.props.err.message
        })
      }

      if (this.state.action === REPORT_CREATE.SUCCESS) {                
        this.setState({
          snackError: this.props.res.message
        }, ()=>{
          setTimeout(() => {
            this.setState({snackError: null})
          }, 100);
        })        
      }
    }
  }

  _handleForm = (values) =>{    
    const data = {
      param:{
        statusId: this.state._status,
        description: values.description,        
        userId: this.props.auth.profile.id
      },
      headers: [        
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        },
        {
          keyHeader: 'x-access-token',
          valueHeader: this.props.auth.token,
        }
      ],
    };    
    this.props.dispatchReportCreateFetch(data)
  }

  render() {
    return (
      <Container style={{backgroundColor: _Color.White}} snackError={this.state.snackError}>
        <View style={[_Style.mt20, _Style.mb20]}>
          <Text style={[_Font.PoppinsRegular, _Style.h1, _Style.mb20]}>New Daily Report!</Text>
          <Formik           
            enableReinitialize={true} 
            initialValues={this.state.report}
            onSubmit={(values, {resetForm, setValues})=>{              
              resetForm({
                values: this.state.report
              })              
              this._handleForm(values)
            }}
            validationSchema={reportScheme}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextField
                editable={true}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                fieldName='Description'                
                error={errors.description && touched.description ? errors.description : null}
              />

              <Text style={[_Style.h5, { marginBottom: 10, fontFamily: _Font.PoppinsSemiBold }]}>Status</Text>
              <TouchableOpacity onPress={() => this.setState({ isModalReport: true })}
                style={_S.buttonStatus}
                activeOpacity={0.8}
              >
                <View style={{ flexDirection: 'row' }}>
                  {this.state.statusList.map((v,i)=>{
                    if(v.id == this.state._status){
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
                cancelFunc={() => this.setState({ isModalReport: false })}
                isVisible={this.state.isModalReport}
                onBackButtonPress={() => this.setState({ isModalReport: false })}
              >
                <>
                  {this.state.statusList.map((v, i) => {
                    return (
                      <TouchableOpacity key={i} style={[{ borderBottomColor: "#aaa", borderBottomWidth: 1, paddingVertical: 20 }, i == 0 ? {
                        borderTopColor: "#aaa", borderTopWidth: 1,
                      } : null]} activeOpacity={0.8} onPress={() => {
                        this.setState({
                          _status: v.id,
                          isModalReport: false
                        })
                      }}>
                        <Text style={[_Style.h4, this.state._status == v.id ? { fontFamily: _Font.PoppinsBold } : { fontFamily: _Font.PoppinsRegular }]}>{v.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </>
              </Modal>

              <Button primary onPress={handleSubmit} buttonName="Report" />
            </View>
          )}
        </Formik>


        </View>
      </Container>
    )
  }
}

const mapStateToProps = ({report, util, auth}) => ({  
  fetch: report.fetchReportCreate,
  res: report.res,
  err: report.err,
  action: report.action,  
  status: util.res.status,
  divisi: util.res.divisi,
  token: auth.res.token,
  auth: auth.res
});

const mapDispatchToProps = dispatch => ({
  dispatchReportCreateFetch: value => dispatch(reportCreateFetch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportNew);