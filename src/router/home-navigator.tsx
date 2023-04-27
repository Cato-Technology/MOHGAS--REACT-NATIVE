import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../utils/constants';
import DashBoard from '../screens/dashboard';
import Chat from '../screens/chat';

import Profile from '../screens/profile';
import Mail from '../screens/mail';
import OrderHistory from '../screens/order-history';
import DrawerNavigator from './drawer-navigator';
import Accessories from '../screens/accessories';
import AddDeliveryAddress from '../screens/accessories/add-delivery-address';
import ViewProduct from '../screens/accessories/view-product';
import CheckOut from '../screens/accessories/checkout';
import TrackOrder from '../screens/accessories/track-order';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={DashBoard} />
      <Stack.Screen name={SCREENS.ORDER_HISTORY} component={OrderHistory} />
      <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      <Stack.Screen name={SCREENS.ACCESSORIES} component={Accessories} />
      <Stack.Screen
        name={SCREENS.ADD_DELIVERY_ADDRESS}
        component={AddDeliveryAddress}
      />
      <Stack.Screen name={SCREENS.VIEW_PRODUCTS} component={ViewProduct} />
      <Stack.Screen name={SCREENS.CHECKOUT} component={CheckOut} />
      <Stack.Screen name={SCREENS.TRACK_ORDER} component={TrackOrder} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
