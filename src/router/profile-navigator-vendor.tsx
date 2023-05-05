import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../utils/constants';

import Profile from '../screens/customer/profile';
import VendorEditProfile from '../screens/vendor/edit-profile';

const Stack = createNativeStackNavigator();

const ProfileNavigatorVendor = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
      <Stack.Screen
        name={SCREENS.VENDOR_EDIT_PROFILE}
        component={VendorEditProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigatorVendor;
