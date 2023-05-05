import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './bottom-tab-navigator';

import SCREENS from '../utils/constants';
import DrawerNavigator from './drawer-navigator';
import DrawerNavigatorVendor from './drawer-navigator-vendor';
import SuccessScreen from '../screens/success-screen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AppDrawerStackVendor"
        component={DrawerNavigatorVendor}
      />
      <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      <Stack.Screen name={SCREENS.SUCCESS_SCREEN} component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
