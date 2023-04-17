import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import SCREENS from '../utils/constants';
import BottomTabNavigator from './bottom-tab-navigator';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen
        name={SCREENS.MAIN_NAVIGATOR}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
