import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../utils/constants';
// import Chat from '../screens/cutomer/screens/chat';

// import Profile from '../screens/cutomer/profile';
// import Mail from '../screens/cutomer/mail';
import OrderHistory from '../screens/customer/order-history';
import DrawerNavigator from './drawer-navigator';
import Accessories from '../screens/customer/accessories';
import AddDeliveryAddress from '../screens/customer/accessories/add-delivery-address';
import ViewProduct from '../screens/customer/accessories/view-product';
import CheckOut from '../screens/customer/accessories/checkout';
import TrackOrder from '../screens/customer/accessories/track-order';
import PinLocation from '../screens/customer/accessories/pinlocation';
import ConnectVendor from '../screens/customer/accessories/connect-vendor';
import OrderSummary from '../screens/customer/accessories/order-summary';
import SwapCylinder from '../screens/customer/accessories/swap-cylinder';
import VendorDashBoard from '../screens/vendor/dashboard';
import OrderHistoryVendor from '../screens/vendor/order-history';
import AddBranch from '../screens/vendor/add-branch';

const Stack = createNativeStackNavigator();

const HomeNavigatorVendor = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.VENDOR_DASHBOARD}
        component={VendorDashBoard}
      />
      <Stack.Screen
        name={SCREENS.ORDER_HISTORY_VENDOR}
        component={OrderHistoryVendor}
      />
      <Stack.Screen name={SCREENS.ADD_BRANCH} component={AddBranch} />
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
    </Stack.Navigator>
  );
};

export default HomeNavigatorVendor;
