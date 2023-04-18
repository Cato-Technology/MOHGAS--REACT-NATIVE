import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../utils/constants';
import DashBoard from '../screens/dashboard';
import Chat from '../screens/chat';

import Profile from '../screens/profile';
import Mail from '../screens/mail';
import OrderHistory from '../screens/order-history';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={DashBoard} />
      <Stack.Screen name={SCREENS.ORDER_HISTORY} component={OrderHistory} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
