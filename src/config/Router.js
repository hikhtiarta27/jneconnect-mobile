import { createAppContainer, createSwitchNavigator} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import React, { Component } from 'react'
import { _Style, _Font, _Color } from '../styles'
import {
  History,
  HistoryDetail,
  Home,
  HomeProfile,
  HomeNotification,
  HomeProfileEdit,
  ReportNew,
  Login,
  Register,
  RegisterInfo,
  LoadingScreen
} from '../modules'
import { createStackNavigator } from 'react-navigation-stack';

const homeStack = createStackNavigator({
  Home: {
    screen: Home,
    path: 'home',
    navigationOptions: {
      headerShown: false,
    }
  },
  HomeProfile: {
    screen: HomeProfile,
    path: 'home/profile',
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      gestureDirection: 'horizontal',
    }),
  },
  HomeNotification: {
    screen: HomeNotification,
    path: 'home/notification',
    navigationOptions: ({ navigation }) => ({
      title: 'Notification',
      gestureDirection: 'horizontal'
    }),
  },
  HistoryDetail: {
    screen: HistoryDetail,
    path: 'history/detail',
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Report',
      gestureDirection: 'horizontal'
    }),
  }
}, {
  initialRouteName: 'Home',
}
)

const historyStack = createStackNavigator({
  History: {
    screen: History,
    path: 'history',
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
  HistoryDetail: {
    screen: HistoryDetail,
    path: 'history/detail',
    navigationOptions: ({ navigation }) => ({
      title: 'Detail Report',
      gestureDirection: 'horizontal'
    }),
  }
}, {
  initialRouteName: 'History'
}
)

const authStack = createStackNavigator({
  Login: {
    screen: Login,
    path: 'login',
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
  Register: {
    screen: Register,
    path: 'register',
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  },
  RegisterInfo: {
    screen: RegisterInfo,
    path: 'register/info',
    navigationOptions: ({ navigation }) => ({
      headerShown: false
    }),
  }
}, {
  initialRouteName: 'Login'
}
)

const bottomTabNavigator = createBottomTabNavigator({
  Home: homeStack,  
  ReportNew: ReportNew,  
  History: historyStack,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName;
        if (routeName == 'Home') iconName = 'home'
        else if (routeName == 'ReportNew') iconName = 'plussquareo'
        else if (routeName == 'History') iconName = 'event'

        if (routeName == 'ReportNew')
          return <AntIcon name={iconName} size={25} color={tintColor} />
        else
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

const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  App: bottomTabNavigator,
  Auth: authStack
},{
  initialRouteName: 'Loading'
}
)

export default createAppContainer(switchNavigator)
