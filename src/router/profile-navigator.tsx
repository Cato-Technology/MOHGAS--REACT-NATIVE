import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../utils/constants';

import Profile from '../screens/customer/profile';
import EditProfile from '../screens/customer/home/edit-profile';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PROFILE} component={Profile} />
      <Stack.Screen name={SCREENS.EDIT_PROFILE} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
