import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SCREENS from '../../utils/constants';

import {StyleSheet, Text, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TabRouter, useTheme} from '@react-navigation/native';
import HomeNavigator from './home-navigator';
import Chat from '../../screens/customer/chat';

import Profile from '../../screens/customer/profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import ProfileNavigator from './profile-navigator';
import HomeNavigatorVendor from '../vendor-navigator/home-navigator-vendor';
import Support from '../../screens/customer/support';
import Orders from '../../screens/customer/orders';
import SupportNavigator from './support-navigator';
import OrdersNavigator from './orders-navigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: 'Rubik-Regular',

          color: colors.tabTextColor,
        },
        tabBarIconStyle: {
          color: 'grey',
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? '#4ca757' : 'gray',
              fontSize: 9,
              paddingBottom: 5,
            }}>
            {route.name}
          </Text>
        ),

        tabBarStyle: {
          height: 65,
          backgroundColor: colors.primary,
          borderTopColor: 'rgba(0, 0, 0, 0)',
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 2,
          padding: 10,
          // paddingHorizontal: 20,
        },
        tabBarItemStyle: {
          marginHorizontal: 15,
          borderRadius: 4,

          // height: 50,
        },
        // tabBarActiveTintColor: colors.darkblue,
        // tabBarInactiveTintColor: colors.inactive,
        // tabBarActiveBackgroundColor: '#F2F4F7',
      })}>
      <Tab.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" size={30} color={focused ? '#4ca757' : 'gray'} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={SCREENS.SPORTS}
        component={SportsNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <SportIcon fill={focused ? '#4ca757' : 'gray'} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name={SCREENS.SUPPORT_NAVIGATOR}
        component={SupportNavigator}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: focused ? '#4ca757' : 'gray',
                fontSize: 9,
                marginBottom: 5,
              }}>
              SUPPORT
            </Text>
          ),
          tabBarLabelStyle: {color: 'gray', paddingBottom: 4},
          tabBarIcon: ({focused}) => (
            <Icon4
              name="support-agent"
              size={30}
              color={focused ? '#4ca757' : 'gray'}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name={SCREENS.ORDERS_NAVIGATOR_CUSTOMER}
        component={OrdersNavigator}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: focused ? '#4ca757' : 'gray',
                fontSize: 9,
                marginBottom: 5,
              }}>
              Orders
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <AntDesign
              name="copy1"
              size={24}
              color={focused ? '#4ca757' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          tabBarLabel: ({focused, color, size}) => (
            <Text
              style={{
                color: focused ? '#4ca757' : 'gray',
                fontSize: 9,
                marginBottom: 5,
              }}>
              PROFILE
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Icon3
              name="person"
              size={24}
              color={focused ? '#4ca757' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  redDot: {
    width: wp(2.4),
    height: wp(2.4),
    backgroundColor: 'red',
    borderRadius: wp(1.2),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 3,
  },
});
export default BottomTabNavigator;
