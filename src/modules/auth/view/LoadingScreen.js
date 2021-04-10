import React, {Component} from 'react'
import {
  View,
  Text,
  Animated,
  Image
} from 'react-native'
import {Container} from '../../../components'

//redux
import {
  divisiFetch,
  statusFetch
} from '../AuthAction'
import {
  SIGNINSUCCESS,
  SIGNINFAILED
} from '../AuthConfig'
import { connect } from 'react-redux';

class LoadingScreen extends Component{

  constructor(props){
    super(props)    
    this.state = {
      fade: new Animated.Value(0)
    }
  }

  componentDidMount(){  
    const data = {      
      headers: [        
        {
          keyHeader: 'Content-Type',
          valueHeader: 'application/x-www-form-urlencoded',
        }
      ],
    };    
    this.props.dispatchDivisi(data)
    this.props.dispatchStatus(data) 
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true
    }).start(()=>{      
      if(this.props.res != null && this.props.res.token != null && this.props.res.auth)        
        this.props.navigation.navigate('App')
      else this.props.navigation.navigate('Auth')      
      // this.props.navigation.navigate('Auth')  
    }); 
  }

  render(){
    return(
      <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={[            
            {padding: 20},
            {
              opacity: this.state.fade
            }
          ]}
        >
          <Image style={{width: 60}} resizeMode="center" resizeMethod="auto" source={require('../../../assets/img/connection.png')}/>
        </Animated.View>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => ({
  fetch: auth.fetchSignIn,
  res: auth.res,
  err: auth.err,
  action: auth.action,  
});

const mapDispatchToProps = dispatch => ({
  dispatchDivisi: value => dispatch(divisiFetch(value)),
  dispatchStatus: value => dispatch(statusFetch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);