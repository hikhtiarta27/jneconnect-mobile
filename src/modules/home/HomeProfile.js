import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Container, TextField, Button, Modal } from '../../components'
import { _Style, _Font, _Color } from '../../styles'
// import Modal from 'react-native-modal'
import { Formik } from 'formik';
import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const userProfileScheme = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  address: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  contactPerson: Yup.string().matches(phoneRegExp, 'Contact Person is not valid').required('Required')
});

class HomeProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      isModalDivisi: false,      
      userInfo: {
        name: 'Hasan Ikhtiarta',
        email: 'hasan@gmail.com',
        address: 'Bogor',
        contactPerson: '08129791631',
        divisiName: 'IT'
      },
      _userInfo: {
        name: 'Hasan Ikhtiarta',
        email: 'hasan@gmail.com',
        address: 'Bogor',
        contactPerson: '08129791631',
        divisiName: 'IT'
      },
      divisiList: ['IT', 'Finance', 'HR'],
      _divisi: 0,
    }
  }

  _renderTextField = (editable = false) => {    
    return (
      <>
        <Formik
          initialValues={editable ? this.state._userInfo : this.state.userInfo}
          onSubmit={values => console.log(values)}
          validationSchema={userProfileScheme}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextField
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                fieldName='Email'
                editable={editable}
                defaultValue={values.email}
                error={errors.email && touched.email ? errors.email : null}
              />
              <TextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                fieldName='Name'
                editable={editable}
                defaultValue={values.name}
                error={errors.name && touched.name ? errors.name : null}
              />
              <TextField
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                fieldName='Address'
                editable={editable}
                defaultValue={values.address}
                error={errors.address && touched.address ? errors.address : null}
              />
              <TextField
                onChangeText={handleChange('contactPerson')}
                onBlur={handleBlur('contactPerson')}
                keyboardType="phone-pad"
                fieldName='Contact Person'
                editable={editable}
                defaultValue={values.contactPerson}
                error={errors.contactPerson && touched.contactPerson ? errors.contactPerson : null}
              />              

              <Text style={[_Style.h5, {marginBottom: 10, fontFamily: _Font.PoppinsSemiBold}]}>Divisi</Text>
              <TouchableOpacity onPress={()=>this.setState({isModalDivisi: true})}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 15, 
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: "#aaa",
                  color: editable ? "#000" : "#aaa",
                  backgroundColor: _Color.White,
                  marginBottom: 10,
                  justifyContent: 'center'
                }}
                activeOpacity={0.8}
                disabled={!editable}
              >
                <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 1, color: editable ? "#000" : "#aaa",}}>{editable ? this.state.divisiList[this.state._divisi] : this.state.userInfo.divisiName}</Text>
                  <Icon name='caretdown' size={15} color={editable ? "#000" : "#aaa"}/>
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
                      <TouchableOpacity key={i} style={[{borderBottomColor: "#aaa", borderBottomWidth: 1, paddingVertical: 15}, i == 0 ? {
                        borderTopColor: "#aaa", borderTopWidth: 1,
                      } : null]} activeOpacity={0.8} onPress={()=>{
                        this.setState({
                          _divisi: i,
                          isModalDivisi: false
                        })
                      }}>
                        <Text style={[_Style.h4, this.state._divisi == i ? {fontFamily: _Font.PoppinsBold} : {fontFamily: _Font.PoppinsRegular}]}>{v}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </>
              </Modal>

              {editable && <Button primary onPress={handleSubmit} buttonName="Save" />}
            </View>
          )}
        </Formik>
      </>
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>

        {this._renderTextField()}

        <Button
          primary
          buttonName='Edit Profile'
          onPress={() => this.setState({ isModal: true })} />


        <Modal
          headerName="Edit Profile"
          cancelFunc={() => this.setState({ isModal: false })}
          isVisible={this.state.isModal}
          onBackButtonPress={() => this.setState({ isModal: false })}
        >
          <>
            {this._renderTextField(true)}
          </>
        </Modal>

      </Container>
    );
  }
}

export default HomeProfile