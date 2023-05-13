import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../../utils/constants';
import DashBoard from '../../screens/customer/dashboard';

import DrawerNavigator from './drawer-navigator';
import Accessories from '../../screens/customer/accessories';
import AddDeliveryAddress from '../../screens/customer/topup/add-delivery-address';
import ViewProduct from '../../screens/customer/accessories/view-product';
import CheckOut from '../../screens/customer/accessories/checkout';
import TrackOrder from '../../screens/customer/accessories/track-order';
import PinLocation from '../../screens/customer/topup/pinlocation';
import ConnectVendor from '../../screens/customer/topup/connect-vendor';
import OrderSummary from '../../screens/customer/topup/order-summary';
import SwapCylinder from '../../screens/customer/accessories/swap-cylinder';
import ConfirmPayment from '../../screens/customer/confirm-payment';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.DASHBOARD} component={DashBoard} />

      <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      <Stack.Screen name={SCREENS.ACCESSORIES} component={Accessories} />
      <Stack.Screen
        name={SCREENS.ADD_DELIVERY_ADDRESS}
        component={AddDeliveryAddress}
      />
      <Stack.Screen name={SCREENS.VIEW_PRODUCTS} component={ViewProduct} />
      <Stack.Screen name={SCREENS.CHECKOUT} component={CheckOut} />
      <Stack.Screen name={SCREENS.TRACK_ORDER} component={TrackOrder} />
      <Stack.Screen name={SCREENS.PIN_LOCATION} component={PinLocation} />
      <Stack.Screen name={SCREENS.ORDER_SUMMARY} component={OrderSummary} />
      <Stack.Screen name={SCREENS.CONNECT_VENDOR} component={ConnectVendor} />
      <Stack.Screen name={SCREENS.SWAP_CYLINDER} component={SwapCylinder} />
      <Stack.Screen name={SCREENS.CONFIRM_PAYMENT} component={ConfirmPayment} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
