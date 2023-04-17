import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SCREENS from '../utils/constants';

import {StyleSheet, Text, View} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TabRouter, useTheme} from '@react-navigation/native';
import HomeNavigator from './home-navigator';
import Chat from '../screens/chat';
import Mail from '../screens/mail';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          //  fontFamily: fonts.mulishRegular,

          color: colors.tabTextColor,
        },
        tabBarIconStyle: {
          color: 'grey',
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? '#f9d649' : '#a38630',
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
        // options={{
        //   tabBarIcon: ({focused}) => (
        //     <MatchesIcon fill={focused ? '#f9d649' : '#a38630'} />
        //   ),
        // }}
      />
      {/* <Tab.Screen
        name={SCREENS.SPORTS}
        component={SportsNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <SportIcon fill={focused ? '#f9d649' : '#a38630'} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={SCREENS.CHAT}
        component={Chat}
        // options={{
        //   tabBarIcon: ({focused}) => (
        //     <BetIcon fill={focused ? '#f9d649' : '#a38630'} />
        //   ),
        // }}
      />
      <Tab.Screen
        name={SCREENS.MAIL}
        component={Mail}
        // options={{
        //   tabBarIcon: ({focused}) => (
        //     <NewsIcon fill={focused ? '#f9d649' : '#a38630'} />
        //   ),
        // }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={Profile}
        // options={{
        //   tabBarIcon: ({focused}) => (
        //     <ProfileIcon fill={focused ? '#f9d649' : '#a38630'} />
        //   ),
        // }}
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
