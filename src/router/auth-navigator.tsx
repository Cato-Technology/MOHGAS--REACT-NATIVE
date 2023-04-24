import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import SCREENS from '../utils/constants';
import BottomTabNavigator from './bottom-tab-navigator';
import OnBoard from '../screens/on-board';
import SignUpCustomer from '../screens/auth/login/customer/signup';
import ForgetPassword from '../screens/auth/forget-password';
import OtpVerification from '../screens/auth/otp-verification';
import PasswordResetSuccess from '../screens/auth/pwd-reset-success';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.ONBOARD} component={OnBoard} />
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.SIGNUP_CUSTOMER} component={SignUpCustomer} />
      <Stack.Screen
        name={SCREENS.FORGET_PASSWORLD}
        component={ForgetPassword}
      />
      <Stack.Screen
        name={SCREENS.OTP_VERIFICATION}
        component={OtpVerification}
      />
      <Stack.Screen
        name={SCREENS.PASSWORD_RESET_SUCCESS}
        component={PasswordResetSuccess}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
