import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './bottom-tab-navigator';

import SCREENS from '../utils/constants';
import DrawerNavigator from './drawer-navigator';
import DrawerNavigatorVendor from './drawer-navigator-vendor';
import SuccessScreen from '../screens/success-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      {data?.type == 'user' ? (
        <Stack.Screen name="AppDrawerStack" component={DrawerNavigator} />
      ) : (
        <Stack.Screen
          name="AppDrawerStackVendor"
          component={DrawerNavigatorVendor}
        />
      )}

      <Stack.Screen name={SCREENS.SUCCESS_SCREEN} component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
