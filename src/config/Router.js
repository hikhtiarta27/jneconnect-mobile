import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import React, {Component} from 'react'
import {View} from 'react-native'

class Home extends Component{
  render(){
    return(<View></View>);
  }
}

class About extends Component{
  render(){
    return(<View></View>);
  }
}

const bottomTabNavigator = createBottomTabNavigator({
    Home: Home,
    About: About,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) =>{
        const {routeName} = navigation.state
        let iconName;
        if(routeName == 'Home') iconName = 'home'
        else if(routeName == 'About') iconName = 'event'

        return <SimpleIcon name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#B6BECB',
      showLabel: false
    }
  }
)

export default createAppContainer(bottomTabNavigator)
