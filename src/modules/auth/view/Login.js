import React, { Component } from 'react'
import { View, Text,  TouchableOpacity, ActivityIndicator} from 'react-native'
import { Container, TextField, Button, Modal } from '../../../components'
import { _Style, _Font, _Color } from '../../../styles'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import Snackbar from 'react-native-snackbar';

//redux
import {
  signInFetch
} from '../AuthAction';
import {
  SIGNINSUCCESS,
  SIGNINFAILED,
  USERPROFILEUPDATESUCCESS,
  USERPROFILEUPDATEFAILED
} from '../AuthConfig'
import { connect } from 'react-redux';

const loginScheme = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Please enter a value'),
  password: Yup.string().required('Please enter a value'),
});

class Login extends Component {

  constructor(props){
    super(props)
    this.state = {
      login: {
        email: '',
        password: ''     
      },                  
      action: this.props.action,
      err: this.props.err,
      res: this.props.res,  
      snackError: null    
    }
  }

  _handleForm = (values) =>{        
    const data = {
      param: values,
      headers: [        
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        }
      ],
    };

    this.props.dispatchSignIn(data)                     
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.action !== prevState.action) {
      let nextErr = prevState.err;
      let nextRes = prevState.res;

      if (nextProps.action === SIGNINFAILED) {
        nextErr = nextProps.err;
      }
      if (nextProps.action === SIGNINSUCCESS) {
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
      if (this.state.action === SIGNINSUCCESS) {      //profile fetch           
        this.setState({snackError: 'Login success!'}, ()=>{
          this.props.navigation.navigate('App');
        })        
      }else if (this.state.action === SIGNINFAILED) {
        // alert(this.props.err.message)
        this.setState({snackError: this.props.err.message})
      }
      
    }
  }
  

  render() {

    return (
      <Container style={{backgroundColor: _Color.White}} snackError={this.state.snackError}>
        {this.props.fetch && <View style={{position: "absolute", top: 15, left: 0, right: 0,}}>
          <ActivityIndicator size="large" color="#000"/>
        </View> }
        <View style={[_Style.mt20, _Style.mb20, {flex: 1, justifyContent: 'center'}]}>
          <Text style={[_Font.PoppinsRegular, _Style.h1, {fontSize: 40, lineHeight: 40 + 2}, _Style.mb20]}>Hello There!</Text>
          <Formik            
            initialValues={this.state.login}
            onSubmit={values => this._handleForm(values)}
            validationSchema={loginScheme}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextField
                autoCapitalize={"none"}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                returnKeyType='next'
                editable={true}
                placeholder='Email'           
                error={errors.email && touched.email ? errors.email : null}
              />
              <TextField
                autoCapitalize={"none"}
                placeholder='Password'
                editable={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                // fieldName='Password'   
                secureTextEntry={values.password.length==0 ? false : true}             
                error={errors.password && touched.password ? errors.password : null}
              />
              <Button primary onPress={handleSubmit} buttonName="Login" />    
            </View>
          )}
        </Formik>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={_Style.h5}>You are not a member? </Text>
          <TouchableOpacity style={{
            paddingHorizontal: 3,  
            paddingVertical: 10
          }} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate('Register')}>
            <Text style={{
              fontSize: 14,
              fontFamily: _Font.PoppinsSemiBold
            }}>Register</Text>
          </TouchableOpacity>
        </View>
        </View>        
      </Container>
    )
  }
}

const mapStateToProps = ({auth}) => ({
  auth: auth,
  fetch: auth.fetchSignIn,
  res: auth.res,
  err: auth.err,
  action: auth.action,  
});

const mapDispatchToProps = dispatch => ({
  dispatchSignIn: value => dispatch(signInFetch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
