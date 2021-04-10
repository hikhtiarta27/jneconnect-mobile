import React, { Component } from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView, RefreshControl, Alert } from 'react-native'
import { Container, TextField, Button, Modal } from '../../../components'
import { _Style, _Font, _Color } from '../../../styles'
// import Modal from 'react-native-modal'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign'

import { connect } from 'react-redux'
import { apiRequest } from '../../../config/ApiRequest'
import Api from '../../../config/Api'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const userProfileScheme = Yup.object().shape({
  name: Yup.string().required('Please enter a value'),
  address: Yup.string().max(255, 'Max 255 Character!').required('Please enter a value'),
  contactPerson: Yup.string().matches(phoneRegExp, 'Contact Person is not valid').required('Please enter a value').max(13, 'Max 13 Digit').min(10, 'Min 10 Digit'),
});

class RegisterInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      _formRegiser: {
        name: '',
        address: '',
        contactPerson: '',
      },
      divisiList: props.divisi || [],
      _divisi: 1,
      isModalDivisi: false,   
      formAll: props.navigation.getParam('data'),
      snackError: null
    }
  }

  _handleForm = async (values) => {    
    values ={
      ...values,
      ...this.state.formAll,
      divisiId: this.state._divisi
    }

    let data = {      
      param: {
        ...values
      },
      headers: [
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        }
      ],
    };  
    
    await apiRequest(Api.register, 'post', data)
    .then(res => {              
      console.log(res)
      if(res.data.errors!=null){
        this.setState({snackError: res.data.errors})
      }else{
        this.setState({snackError: 'Registration completed succesfully!'}, ()=>{
          this.props.navigation.navigate('Login')
        })
      }
    }).catch(err=>{
      console.log(err)
    })    

  }

  render() {
    return (
      <Container style={{ backgroundColor: _Color.White, flex: 1, }} snackError={this.state.snackError}>
        <TouchableOpacity style={{
          marginVertical: 10,
        }} onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrowleft" size={25} />
        </TouchableOpacity>
        <View style={[_Style.mt20]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[_Font.PoppinsRegular, _Style.h1, { fontSize: 40, lineHeight: 40 + 10 }, _Style.mb20]}>User Profile</Text>
            <Formik
              initialValues={this.state._formRegiser}
              onSubmit={values => this._handleForm(values)}
              validationSchema={userProfileScheme}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, validateOnChange }) => (
                <>
                  {Object.keys(this.state._formRegiser).map(function (v, i) {
                    return (
                      <TextField
                        key={i}
                        editable={true}
                        onChangeText={handleChange(v)}
                        onBlur={handleBlur(v)}
                        placeholder={
                          v == 'name' ? 'Name' :
                            v == 'address' ? 'Address' : 'Contact Person'
                        }
                        keyboardType={
                          v == 'contactPerson' ? 'phone-pad' : 'default'
                        }
                        maxLength={
                          v == 'contactPerson' ? 13 :
                            v == 'address' ? 255 : null
                        }
                        error={errors[v] && touched[v] ? errors[v] : null}
                      />
                    );
                  })}

                  {/* <Text style={[_Style.h5, { marginBottom: 10, fontFamily: _Font.PoppinsSemiBold }]}>Divisi</Text> */}
                  <TouchableOpacity onPress={() => this.setState({ isModalDivisi: true })}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 15,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: "#aaa",
                      color:  "#000",
                      backgroundColor: _Color.White,
                      marginBottom: 10,
                      justifyContent: 'center'
                    }}
                    activeOpacity={0.8}                    
                  >
                    <View style={{ flexDirection: 'row' }}>
                      {this.state.divisiList.map((v,i)=>{
                        if(v.id == this.state._divisi){
                          return (
                            <Text key={i} style={{flex: 1, color: "#000" }}>{v.name} Division</Text>
                          )
                        }
                      })} 
                      <Icon name='caretdown' size={15} color={"#000"} />
                    </View>
                  </TouchableOpacity>

                  <Modal
                    headerName="Choose Division"
                    cancelFunc={() => this.setState({ isModalDivisi: false })}
                    isVisible={this.state.isModalDivisi}
                    onBackButtonPress={() => this.setState({ isModalDivisi: false })}
                  >
                    <>
                    {this.state.divisiList.map((v,i)=>{
                      return(
                        <TouchableOpacity key={i} style={[{borderBottomColor: "#aaa", borderBottomWidth: 1, paddingVertical: 20}, i == 0 ? {
                          borderTopColor: "#aaa", borderTopWidth: 1,
                        } : null]} activeOpacity={0.8} onPress={()=>{
                          this.setState({
                            _divisi: v.id,
                            isModalDivisi: false
                          })
                        }}>
                          <Text style={[_Style.h4, this.state._divisi == v.id ? {fontFamily: _Font.PoppinsBold} : {fontFamily: _Font.PoppinsRegular}]}>{v.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                    </>
                  </Modal>

                  <Button primary onPress={handleSubmit} buttonName="Register" />
                </>
              )}
            </Formik>
          </ScrollView>

        </View>
      </Container>
    )
  }
}

const mapStateToProps = ({auth, util}) => ({
  auth: auth,
  fetch: auth.fetchUserProfile,
  res: auth.res,
  err: auth.err,  
  divisi: util.res.divisi
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterInfo);
