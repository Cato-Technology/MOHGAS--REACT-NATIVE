/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {Platform, StatusBar, useColorScheme, SafeAreaView} from 'react-native';
import {ErrorBoundary} from './components';
import FlashMessage from 'react-native-flash-message';
import Router from './router';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const fcmTokenn = await messaging().getToken();
      console.log('fcm', fcmTokenn);
      let details = {
        metaData: {
          txnType: 'ADD_TOKEN',
          dvceId: '1E231aAA18',
          clntTxnRefNo: '1E23118',
          clntId: 'EN',
        },
        data: {
          token: fcmTokenn,
        },
      };
      //  let registerFcm = await mainServices.registerFcm(details);
      // console.log('registerFcm', registerFcm);

      //  await AsyncStorage.setItem('fcm', fcmTokenn);
    }
  }
  messaging().setBackgroundMessageHandler(async remoteMessage => {});
  // PushNotification.configure({
  //   onRegister: function (token) {},

  //   onNotification: function (notification) {
  //     // Platform.OS === ‘android’ &&
  //     PushNotification.localNotification({
  //       channelId: 'channel-id',
  //       foreground: true,
  //       userInteraction: true,
  //       autoCancel: false,
  //       title: notification.data.title,
  //       message: notification.data.message,
  //     });

  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  //   onAction: function (notification) {},
  //   onRegistrationError: function (err) {
  //     console.error(err.message, err);
  //   },
  //   permissions: {
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //   },
  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', remoteMessage);

      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
        clickAction: remoteMessage.notification.android.click_action,
      });
    });
    return unsubscribe;
  }, []);
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
