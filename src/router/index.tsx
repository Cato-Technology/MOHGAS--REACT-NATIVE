import React, {useEffect, useState} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import {useColorScheme} from 'react-native';
import darkColors from '../utils/themes/dark-colors';
import lightColors from '../utils/themes/light-colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../utils/auth-context';
import { setSignOutFunction } from '../services/client';
import SCREENS from '../utils/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {configureNotificationService} from '../utils/NotificationService';
const Router = () => {
  const Stack = createNativeStackNavigator();
  const scheme = useColorScheme();
  const MyThemes = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...lightColors,
    },
  };
  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...darkColors,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  AsyncStorage.getItem('token').then(data => {
    if (data != null) setIsLoading(true);
    else setIsLoading(false);
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('token');
        console.log('userToken', userToken);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);



  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
        AsyncStorage.clear();
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );
  React.useEffect(() => {
    // Load the user data from storage when the app starts
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log('dataStack', data);

        setUserData(data);
      } catch (e) {
        console.error('Failed to load user data from storage');
      }
    };
    loadUserData();
  }, []);

  React.useEffect(() => {
    setSignOutFunction(authContext.signOut);
  }, [authContext.signOut]);

  return (
    <AuthContext.Provider value={{authContext, userData, setUserData}}>
      <NavigationContainer theme={scheme === 'dark' ? MyDarkTheme : MyThemes}>
        {state.userToken == null ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Router;
