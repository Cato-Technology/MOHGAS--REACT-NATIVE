import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './bottom-tab-navigator';

import SCREENS from '../utils/constants';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.MAIN_NAVIGATOR}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
