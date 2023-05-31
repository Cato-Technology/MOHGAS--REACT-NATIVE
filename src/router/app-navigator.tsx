import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './customer-navigator/bottom-tab-navigator';

import SCREENS from '../utils/constants';
import DrawerNavigator from './customer-navigator/drawer-navigator';
import DrawerNavigatorVendor from './vendor-navigator/drawer-navigator-vendor';
import SuccessScreen from '../screens/success-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnSuccessScreen from '../screens/un-success-screen';
import MohgasWallet from '../screens/customer/mogas-wallet';
import FundWallet from '../screens/customer/mogas-wallet/fund-wallet';
import CreateBvn from '../screens/customer/mogas-wallet/create-bvn';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        setIsLoading(true);
        const userData = await AsyncStorage.getItem('userData');
        let dat = JSON.parse(userData);
        setData(dat);
        setIsLoading(false);
      } catch (e) {
        // Restoring token failed
        setIsLoading(false);
        console.log('e', e);
      }
    };

    bootstrapAsync();
  }, []);
  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator
      // initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}>
      {data?.type == 'user1s' ? (
        <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      ) : (
        <Stack.Screen
          name="AppDrawerStackVendor"
          component={DrawerNavigatorVendor}
        />
      )}
      <Stack.Screen name={SCREENS.SUCCESS_SCREEN} component={SuccessScreen} />

      <Stack.Screen
        name={SCREENS.UN_SUCCESS_SCREEN}
        component={UnSuccessScreen}
      />
      <Stack.Screen name={SCREENS.MOHGAS_WALLET} component={MohgasWallet} />
      <Stack.Screen name={SCREENS.FUND_WALLET} component={FundWallet} />
      <Stack.Screen name={SCREENS.CREATE_BVN} component={CreateBvn} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
