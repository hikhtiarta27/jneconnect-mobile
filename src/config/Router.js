import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import React, { Component } from 'react'
import { _Style, _Font, _Color } from '../styles'
import {
  History,
  HistoryDetail,
  Home,
  HomeProfile,
  HomeNotification,
  HomeProfileEdit
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
  HomeProfileEdit: {
    screen: HomeProfileEdit,
    path: 'home/profile/edit',
    navigationOptions: ({ navigation }) => ({
      title: 'Edit Profile',
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


const bottomTabNavigator = createBottomTabNavigator({
  Home: homeStack,
  History: historyStack,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let iconName;
        if (routeName == 'Home') iconName = 'home'
        else if (routeName == 'History') iconName = 'event'

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
