import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './bottom-tab-navigator';

import SCREENS from '../utils/constants';
import DrawerNavigator from './drawer-navigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
