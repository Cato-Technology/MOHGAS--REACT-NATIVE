/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
  Button,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import { Avatar } from 'react-native-paper';
import RNMonnify from '@monnify/react-native-sdk';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
  DetailCard,
} from '../../../components';
import { mainServics, profileService } from '../../../services';
import SCREENS from '../../../utils/constants';

import makeStyles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/auth-context';
import { useTheme } from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import { useDispatch, useSelector } from 'react-redux';
import { OrderState } from '../../../redux/orders/OrderState';
import { getReduxRecentOrderHistory } from '../../../redux/orders/orders-actions';
import { capitalizeFirstLetter } from '../../../utils/functions/general-functions';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { getAddress } from '../../../utils/functions/get-address';
import { GEO_LOCATION } from '../../../redux/global/constants';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FeedbackItem from '../feedback/feebackItem';


export default function DashBoard({ navigation, props }) {
  RNMonnify.initialize({
    apiKey: 'MK_TEST_3X874HXYN3',
    contractCode: '6871168621',
    applicationMode: 'TEST',
  });
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const recentHistory = useSelector(
    (state: OrderState) => state.order.recentOrderHistory,
  );

  const [myDirection, setMyDirection] = useState({
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [balance, setBalance] = useState();
  const [totalOrders, setTotalOrders] = useState();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getProfile();
      getWallet();
      getTotalOrders();
      setRefreshing(false);
    }, 2000);
  }, []);
  useEffect(() => {
    onLocationEnablePressed();
  }, []);
  const onLocationEnablePressed = () => {
    if (Platform.OS === 'android') {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          console.log('data', data);
        })
        .catch(err => {
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          alert('Error1 ' + err.message + ', Code : ' + err.code);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {

      getProfile();
      // console.log('second run')

      return () => {
        // Clean up function (optional)
      };
    }, [])
  );

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            console.log('permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    setTimeout(() => {
      requestLocationPermission();
    }, 1000);
  }, [navigation]);

  const getOneTimeLocation = () => {
    console.log('Getting Location ... ');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async position => {
        console.log('currentLongitude', position);

        setMyDirection({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
        });
        dispatch({
          type: GEO_LOCATION,
          payload: {
            latitude: Number(position.coords.latitude),
            longitude: Number(position.coords.longitude),
          },
        });
        const addressString = await getAddress(
          position.coords.latitude,
          position.coords.longitude,
        );
        console.log('addressString', addressString);

        // console.log('currentLatitude ', currentLatitude)
        // console.log('currentLongitude ', currentLongitude)
        // let tempCoords = {
        //     latitude: Number(position.coords.latitude),
        //     longitude: Number(position.coords.longitude)
        // }
        // if (MapRef.current && MapRef.current.animateCamera) {
        //     MapRef.current.animateCamera({ center: tempCoords, pitch: 2, heading: 20, altitude: 200, zoom: 5 }, 1000)
        // }
      },
      error => {
        console.log('error1 ', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  console.log('myDir', myDirection);
  console.log('recentHistory', recentHistory);

  console.log('authContext==>', authContext);

  const getWallet = async () => {
    try {
      const getWallet = await mainServics.getWalletBalance(authContext?.userData?.user_id);
      setBalance(getWallet?.data?.wallet);
    } catch (e) {
      console.log('error', e);
    }
  }

  const getTotalOrders = async () => {
    try {
      const getTotal = await mainServics.myTotalOrders(authContext?.userData?.user_id, "user");
      setTotalOrders(getTotal?.total_orders);
    } catch (e) {
      console.log('error', e);
    }
  }

  const getProfile = async () => {
    try {
      const getProfile = await profileService.getProfile({ user_id: authContext?.userData?.user_id });
      console.log('getProfile', getProfile?.response);
      if (getProfile?.status) {
        const updatedUserData = {
          ...authContext?.userData,
          ...getProfile?.response,
        };
        console.log('updatedUserData', updatedUserData);

        try {
          const jsonValue = JSON.stringify(updatedUserData);
          await AsyncStorage.setItem('userData', jsonValue);
        } catch (e) {
          console.error('Failed to save user data to storage');
        }

        authContext.setUserData(updatedUserData);
      }
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    dispatch(getReduxRecentOrderHistory());
  }, [dispatch]);

  useEffect(() => {
    getProfile();
    getWallet();
    getTotalOrders();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      /> */}

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ marginTop: 20 }}>
              <Icon3
                name="menu"
                onPress={() => navigation.openDrawer()}
                size={25}
                color={'#000000'}
              />
              <Text
                style={{
                  fontFamily: 'Rubik-Bold',
                  fontSize: 15,
                  color: '#000000',
                }}>
                Welcome
              </Text>

              <Text
                style={{
                  fontFamily: 'Rubik-Bold',
                  fontSize: 25,
                  color: '#000000',
                }}>
                {authContext?.userData?.full_name}
              </Text>

              <Text
                style={{ fontFamily: 'Rubik-Bold', color: 'gray', fontSize: 10 }}>
                <Icon4 name="crown" size={10} color="gray" /> Premium Member
              </Text>
            </View>
            <Avatar.Image
              size={45}
              source={{ uri: authContext?.userData?.image }}
            />
          </View>
          <View style={styles.cardContainer}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#50a93c', '#407226']}
              style={styles.gradientView}
            />
            <View>
              <Text style={{ color: '#fff', fontFamily: 'Rubik-Bold' }}>
                Mohgas Wallet
              </Text>
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ color: '#fff', fontFamily: 'Rubik-Regular' }}>
                  Balance
                </Text>
                <Text style={{ color: '#fff', fontFamily: 'Rubik-Regular' }}>
                  ₦ {balance}
                </Text>
              </View>
              <Text style={{ color: '#fff', fontFamily: 'Rubik-Regular', fontWeight: '900' }}>
                My total orders: {totalOrders}
              </Text>
              <Text style={{ color: '#fff', marginTop: 10 }}>
                {' '}
                {authContext?.userData?.full_name}
              </Text>
            </View>
          </View>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 30,
                paddingHorizontal: 30,
              }}>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                  // RNMonnify.initializePayment({
                  //   amount: 1200.5,
                  //   customerName: 'Tobi Adeyemivfd',
                  //   customerEmail: 'tobiadeyemidfd@gmail.com',
                  //   paymentReference: '222',
                  //   paymentDescription: 'Foodies',
                  //   currencyCode: 'NGN',
                  //   incomeSplitConfig: [],
                  // })
                  //   .then(response => {
                  //     console.log(response); // card charged successfully, get reference here
                  //   })
                  //   .catch(error => {
                  //     console.log(error); // error is a javascript Error object
                  //     console.log(error.message);
                  //     console.log(error.code);
                  //   });
                  navigation.navigate(SCREENS.PIN_LOCATION, {
                    render: 'refill',
                  });
                }}>
                <View style={styles.circleView}>
                  <Icon3 name="arrow-up" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Refill</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.FEEDBACK)}
                style={{ alignItems: 'center' }}>
                <View style={styles.circleView}>
                  <Icon3
                    name="swap"
                    size={25}
                    color="#fff"
                    style={{
                      transform: [{ rotate: '0deg' }],
                    }}
                  />
                </View>
                <Text style={styles.centerViewText}>Feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => navigation.navigate(SCREENS.ACCESSORIES)}>
                <View style={styles.circleView}>
                  <Icon2 name="line-scan" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Accessories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => navigation.navigate(SCREENS.FUND_WALLET)}>
                <View style={styles.circleView}>
                  <Icon5 name="credit-card" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Fund Wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.ORDERS_NAVIGATOR_CUSTOMER, {
                screen: SCREENS.ORDER_HISTORY,
              })
            }
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontFamily: 'Rubik-Regular' }}>
              Recent Orders
            </Text>
            <Text style={{ color: 'gray', fontFamily: 'Rubik-Regular' }}>
              View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={recentHistory?.slice(0, 3)}
            renderItem={({ item, index }) => (
              <DetailCard
                title={`${capitalizeFirstLetter(item.order_type)} - ${item.delivery_cost
                  }`}
                subTitle={item.created_date}
                price={item.grand_total}
                srNo={item.status}
                icon={
                  item.order_type == 'refill' ? (
                    <Icon3 name="arrow-up" size={25} color="#4ca757" />
                  ) : (
                    <Icon3
                      name="swap"
                      size={22}
                      color="#4ca757"
                      style={{
                        transform: [{ rotate: '0deg' }],
                      }}
                    />
                  )
                }
                data={item}
                onPressDelete={() => {
                  console.log('item', item._id);
                }}
              // onPressEdit={() =>
              //   navigation.navigate(SCREENS.ADDPAYMENTMETHOD, {
              //     edit: true,
              //     item: item,
              //   })
              // }
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No Data</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />


          {/* {!authContext?.userData?.bvn_verification_date && (
            <View
              style={{
                backgroundColor: '#131a28',
                height: 90,
                borderRadius: 10,
                paddingHorizontal: 20,

                width: '100%',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 7,
                  fontFamily: 'Rubik-Bold',
                  color: '#fff',
                }}>
                X
              </Text>
              <Text style={styles.hardText}>Open Mohgas Account</Text>
              <Text style={styles.lightText}>
                Open a virtual bank instantly with few clicks
              </Text>
              <Text
                style={[
                  styles.lightText,
                  {
                    fontSize: 9,
                    textAlign: 'center',
                    backgroundColor: '#393d48',
                    width: 70,
                    padding: 3,
                    marginTop: 10,
                  },
                ]}
                onPress={() => navigation.navigate(SCREENS.MOHGAS_WALLET)}>
                Get Started
              </Text>
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
}
