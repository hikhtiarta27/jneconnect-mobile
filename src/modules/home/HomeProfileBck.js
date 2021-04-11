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

//redux
import {
  userProfileUpdateFetch
} from '../auth/AuthAction'
import {
  USERPROFILEUPDATESUCCESS,
  USERPROFILEUPDATEFAILED
} from '../auth/AuthConfig'
import { connect } from 'react-redux';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const userProfileScheme = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  address: Yup.string()
    .max(255, 'Too Long!')
    .required('Required'),  
  contactPerson: Yup.string().matches(phoneRegExp, 'Contact Person is not valid').required('Required')
});

class HomeProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isModal: false,
      isModalDivisi: false,            
      _userInfo: props.res,
      divisiList: props.divisi || [],
      _divisi: props.res.divisiId,
      snackError: null,
      action: this.props.action,
      err: this.props.err,
      res: this.props.res, 
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.action !== prevState.action) {
      let nextErr = prevState.err;
      let nextRes = prevState.res;

      if (nextProps.action === USERPROFILEUPDATEFAILED) {
        nextErr = nextProps.err;
      }
      if (nextProps.action === USERPROFILEUPDATESUCCESS) {
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
      if (this.state.action === USERPROFILEUPDATEFAILED) {
        // alert(this.props.err.message)
        this.setState({snackError: this.props.err.message})
      }

      if (this.state.action === USERPROFILEUPDATESUCCESS) {                
        setTimeout(() => {
          this.setState({snackError: 'User profile updated successfully!'})
        }, 500);
      }
    }
  }

  componentDidMount(){    
  }

  _handleForm = (values) =>{        
    const data = {
      param:{
        divisiId: this.state._divisi,
        email: values.email,
        name: values.name,
        contactPerson: values.contactPerson,
        address: values.address,
        token: this.props.token
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
    this.props.dispatchUserProfileUpdate(data)
    this.setState({
      isModal: false
    })
  }

  _renderTextField = (editable = false) => {       
    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={editable ? this.props.res : this.props.res}
          onSubmit={values => this._handleForm(values)}
          validationSchema={userProfileScheme}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              {!editable && <TextField                
                keyboardType="email-address"
                fieldName='Email'          
                editable={false}      
                defaultValue={values.email}                
              />}
              <TextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                fieldName='Name'
                editable={editable}
                defaultValue={values.name}
                error={errors.name && touched.name ? errors.name : null}
              />
              <TextField                                
                maxLength={255}
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
                maxLength={13}
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
                  {this.state.divisiList.map((v,i)=>{
                    if(v.id == this.state._divisi){
                      return (
                        <Text key={i} style={{flex: 1, color: editable ? "#000" : "#aaa",}}>{editable ? v.name : this.props.res.divisiName  }</Text>
                      )
                    }
                  })}                  
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

              {editable && <Button primary onPress={handleSubmit} buttonName="Save" />}
            </View>
          )}
        </Formik>
      </>
    );
  }

  render() {    
    return (
      <Container style={{ backgroundColor: '#fff' }} snackError={this.state.snackError}>

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


const mapStateToProps = ({auth, util}) => ({
  auth: auth,
  fetch: auth.fetchUserProfile,
  res: auth.res.profile,
  err: auth.err,
  action: auth.action,
  divisi: util.res.divisi,
  status: util.res.status,
  token: auth.res.token
});

const mapDispatchToProps = dispatch => ({
  dispatchUserProfileUpdate: value => dispatch(userProfileUpdateFetch(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeProfile);