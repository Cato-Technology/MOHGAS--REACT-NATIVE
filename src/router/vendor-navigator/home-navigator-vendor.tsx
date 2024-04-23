import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SCREENS from '../../utils/constants';
// import Chat from '../screens/cutomer/screens/chat';

// import Profile from '../screens/cutomer/profile';
// import Mail from '../screens/cutomer/mail';
import OrderHistory from '../../screens/customer/order-history';
import DrawerNavigator from '../customer-navigator/drawer-navigator';
import Accessories from '../../screens/customer/accessories';
import AddDeliveryAddress from '../../screens/customer/topup/add-delivery-address';
import ViewProduct from '../../screens/customer/accessories/view-product';
import CheckOut from '../../screens/customer/accessories/checkout';
import TrackOrder from '../../screens/customer/accessories/track-order';
import PinLocation from '../../screens/customer/topup/pinlocation';
import ConnectVendor from '../../screens/customer/topup/connect-vendor';
import OrderSummary from '../../screens/customer/topup/order-summary';
import SwapCylinder from '../../screens/customer/accessories/swap-cylinder';
import VendorDashBoard from '../../screens/vendor/dashboard';
import OrderHistoryVendor from '../../screens/vendor/order-history';
import AddBranch from '../../screens/vendor/add-branch';
import Branches from '../../screens/vendor/branches';
import AddProduct from '../../screens/vendor/add-product';
import Products from '../../screens/vendor/products';
import UpdatePrice from '../../screens/vendor/update-price';
import UpdateVendorAccount from '../../screens/vendor/update-account';
import VendorRequest from '../../screens/vendor/request';
import OrderSummarySwap from '../../screens/customer/accessories/swap-cylinder/order-summary';
import ViewProductVendor from '../../screens/vendor/view-product';
import NewOrder from '../../screens/vendor/new-order';
import OrderDetails from '../../screens/vendor/order-details';
import messaging from '@react-native-firebase/messaging';
import { ActivityIndicator } from '../../components';
const Stack = createNativeStackNavigator();

const HomeNavigatorVendor = () => {
  const [initialRoute, setInitialRoute] = useState('');
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage,
  //     );
  //     //  navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage,
  //         );
  //         setInitialRoute(remoteMessage.data.click_action); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <ActivityIndicator visible={true} />;
  // }

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
      <Stack.Screen name={SCREENS.BRANCHES} component={Branches} />
      <Stack.Screen name={SCREENS.ADD_PRODUCT} component={AddProduct} />
      <Stack.Screen name={SCREENS.PRODUCTS} component={Products} />
      <Stack.Screen name={SCREENS.UPDATE_PRICE} component={UpdatePrice} />

      <Stack.Screen
        name={SCREENS.UPDATE_ACCOUNT_VENDOR}
        component={UpdateVendorAccount}
      />
      <Stack.Screen name={SCREENS.VENDOR_REQUEST} component={VendorRequest} />
      <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      <Stack.Screen name={SCREENS.ACCESSORIES} component={Accessories} />
      <Stack.Screen
        name={SCREENS.ADD_DELIVERY_ADDRESS}
        component={AddDeliveryAddress}
      />
      <Stack.Screen
        name={SCREENS.VIEW_PRODUCTS_VENDOR}
        component={ViewProductVendor}
      />
      <Stack.Screen name={SCREENS.CHECKOUT} component={CheckOut} />
      <Stack.Screen name={SCREENS.TRACK_ORDER} component={TrackOrder} />
      <Stack.Screen name={SCREENS.PIN_LOCATION} component={PinLocation} />
      <Stack.Screen name={SCREENS.ORDER_SUMMARY} component={OrderSummary} />
      <Stack.Screen name={SCREENS.ORDER_DETAILS} component={OrderDetails} />

      <Stack.Screen name={SCREENS.CONNECT_VENDOR} component={ConnectVendor} />
      <Stack.Screen name={SCREENS.SWAP_CYLINDER} component={SwapCylinder} />
      <Stack.Screen name={SCREENS.VENDOR_NEW_ORDER} component={NewOrder} />
    </Stack.Navigator>
  );
};

export default HomeNavigatorVendor;
