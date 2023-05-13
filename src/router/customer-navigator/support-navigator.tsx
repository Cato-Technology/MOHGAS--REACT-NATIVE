import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SCREENS from '../../utils/constants';
import DashBoard from '../../screens/customer/dashboard';
// import Chat from '../screens/cutomer/screens/chat';

// import Profile from '../screens/cutomer/profile';
// import Mail from '../screens/cutomer/mail';

import CustomerSupport from '../../screens/customer/support';
import AccountIssues from '../../screens/customer/support/account-issues';
import SendSupport from '../../screens/customer/support/send-support';

const Stack = createNativeStackNavigator();

const SupportNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={SCREENS.CUSTOMER_SUPPORT}
        component={CustomerSupport}
      />

      <Stack.Screen name={SCREENS.ACCOUNT_ISSUES} component={AccountIssues} />
      <Stack.Screen name={SCREENS.SEND_SUPPORT_ISSUE} component={SendSupport} />
    </Stack.Navigator>
  );
};

export default SupportNavigator;
