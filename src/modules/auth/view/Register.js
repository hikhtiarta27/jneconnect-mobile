import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import { Container, TextField, Button, Modal } from '../../../components'
import { _Style, _Font, _Color } from '../../../styles'

import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign'

import { connect } from 'react-redux';
import { apiRequest } from '../../../config/ApiRequest'
import Api from '../../../config/Api'

const userProfileScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Please enter a value'),
  password: Yup.string().required('Please enter a value').min(8, 'Min length 8'),
  reTypePassword: Yup.string().required('Please enter a value').oneOf([Yup.ref('password'), null], "Password didn't match"),
});

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      _formRegister: {
        email: '',
        password: '',
        reTypePassword: '',
      },
      isLoading: false,
      snackError: null
    }
  }

  _checkEmail = async (values) =>{
    this.setState({
      isLoading: true
    }, async ()=>{
      let data = {
        param: {
          email: values.email,
          passowrd: values.password,
        }, 
        headers: [        
          {
            keyHeader: 'x-access-token',
            valueHeader: this.props.auth.res.token
          }
        ],
      }
  
      await apiRequest(Api.checkEmail, 'post', data)
      .then(res => {              
        if(res.data.errors!=null){
          this.setState({snackError: 'Email exist, try another email adress!'})
        }else{
          this.props.navigation.navigate('RegisterInfo', {
            data: values
          })        
        }
        this.setState({isLoading: false})
      }).catch(err=>{
        console.log(err)
      })  
    })

      
  }

  _handleForm = (values) =>{
    this._checkEmail(values)    
  }

  render() {
    return (
      <Container style={{ backgroundColor: _Color.White, flex: 1, }} snackError={this.state.snackError}>
        {this.state.isLoading && <View style={{position: "absolute", top: 15, left: 0, right: 0,}}>
          <ActivityIndicator size="large" color="#000"/>
        </View> }
        <TouchableOpacity style={{
          marginVertical: 10,
        }} onPress={()=>this.props.navigation.goBack()}>
          <Icon name="arrowleft" size={25} />
        </TouchableOpacity>
        <View style={[_Style.mt20, _Style.mb20, { flex: 1, justifyContent: 'center' }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[_Font.PoppinsRegular, _Style.h1, { fontSize: 40, lineHeight: 40 + 2 }, _Style.mb20]}>Create your Account</Text>
            <Formik
              initialValues={this.state._formRegister}
              onSubmit={values => this._handleForm(values)}
              validationSchema={userProfileScheme}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, validateOnChange }) => (
                <>
                  {Object.keys(this.state._formRegister).map(function (v, i) {
                    return (
                      <TextField key={i}
                        autoCapitalize={"none"}
                        editable={true}
                        onChangeText={handleChange(v)}
                        onBlur={handleBlur(v)}
                        placeholder={
                          v == 'email' ? 'Email' :
                            v == 'password' ? 'Password' : 'Confirm Password'
                        }
                        keyboardType={
                          v == 'email' ? 'email-address' : 'default'
                        }
                        secureTextEntry={
                          v == 'password' ? values.password.length == 0 ? false : true :
                          v == 'reTypePassword' ? values.reTypePassword.length == 0 ? false : true : false
                        }
                        error={errors[v] && touched[v] ? errors[v] : null}
                      />
                    );
                  })}
                  <Button primary onPress={handleSubmit} buttonName="Next" />
                </>
              )}
            </Formik>

          </ScrollView>
        </View>        
      </Container>
    )
  }
}


const mapStateToProps = ({auth, report}) => ({
  auth: auth,
  fetch: auth.fetchUserProfile,
  res: auth.res,
  err: auth.err,  
});

const mapDispatchToProps = dispatch => ({
  dispatchReportFetch: value => dispatch(reportFetch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
