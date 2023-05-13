import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../../utils/constants';

import Profile from '../../screens/customer/profile';
import EditProfile from '../../screens/customer/home/edit-profile';
import OrderHistory from '../../screens/customer/order-history';

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.ORDERS} component={OrderHistory} />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
