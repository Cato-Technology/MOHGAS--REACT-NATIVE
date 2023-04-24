/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Platform, StatusBar, useColorScheme, SafeAreaView} from 'react-native';
import {ErrorBoundary} from './components';
import FlashMessage from 'react-native-flash-message';
import Router from './router';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  return (
    <ErrorBoundary>
      <StatusBar
        backgroundColor={'#272828'}
        barStyle={
          Platform.OS === 'android' && isDarkMode
            ? 'dark-content'
            : 'light-content'
        }
      />
      <SafeAreaView style={{flex: 0, backgroundColor: '#272828'}} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#272828'}}>
        <Router />
      </SafeAreaView>
      {/* </MenuProvider> */}

      <FlashMessage floating position="top" />
    </ErrorBoundary>
  );
};

export default App;
