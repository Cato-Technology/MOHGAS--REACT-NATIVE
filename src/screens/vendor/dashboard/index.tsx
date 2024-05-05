/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
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
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Avatar } from 'react-native-paper';
import { capitalizeFirstLetter } from '../../../utils/functions/general-functions';


import {
  ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
  DetailCard,
} from '../../../components';

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
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVendorAccountDetials,
  getVendorBusinessProfileR,
} from '../../../redux/global/actions';
import { GlobalState } from '../../../redux/global/GlobalState';
import messaging from '@react-native-firebase/messaging';
import { navigate } from '../../../utils/functions/RootNavigator';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import moment from 'moment';
import { orderServices, mainServics } from '../../../services';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';



export default function VendorDashBoard({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const businessData = useSelector(
    (state: GlobalState) => state?.global?.businessProfileData,
  );
  const [orderHistory, setOrderHistory] = useState();
  const [balance, setBalance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [businessProfileCheck, setbusinessProfileCheck] = useState(false);
  const [loginError, setLoginError] = useState();
  const [totalOrders, setTotalOrders] = useState();


  useEffect(() => {
    // Load the user data from storage when the app starts
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log('data', data);
      } catch (e) {
        console.error('Failed to load user data from storage');
      }
    };
    loadUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkBusinessProfile(authContext?.userData?.user_id);

      return () => {
        // Clean up function (optional)
      };
    }, [])
  );

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
          alert('Error ' + err.message + ', Code : ' + err.code);
        });
    }
  };

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onMessage(async remoteMessage => {
      console.log('Notification caused app to openDash==>', remoteMessage);
      navigation.navigate(remoteMessage.data.click_action);
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:a',
            remoteMessage.notification,
          );
          navigation.navigate(remoteMessage.data.click_action);
        }
      });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:===>',
            remoteMessage,
          );
          navigation.navigate(remoteMessage.data.click_action);
          //  navigate(remoteMessage.data.click_action);
        }
      });
  }, []);

  useEffect(() => {
    dispatch(getVendorBusinessProfileR());
    dispatch(getVendorAccountDetials());
  }, [dispatch]);

  useEffect(() => {
    let data = { vendor_id: authContext?.userData?.user_id }
    getWallet(data.vendor_id);
    checkBusinessProfile(data.vendor_id);
    setOnline(true, data.vendor_id);
    getData(data);
    getTotalOrders(data.vendor_id);
  }, []);

  // Subscribe to app state changes when the component mounts
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      AppState.removeEventListener('change', handleAppStateChange as any);
    };
  }, []);

  // Function to handle app state changes
  const handleAppStateChange = async (nextAppState) => {
    console.log("appstate", nextAppState)
    if (nextAppState === 'background') {

      try {
        const response = await setOnline(false, authContext?.userData?.user_id);
        // console.log(response, "this is it")
      } catch (e) {
        console.log(e);
      }

    } else if (nextAppState === 'active') {

      try {

        const response = await setOnline(true, authContext?.userData?.user_id);
        // console.log(response, "this is it")
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getData = async (data: any) => {
    try {
      // const res = mainServics.getVendorOrderHistory(data);
      const res = await orderServices.orderHistory(data);
      console.log("-------------------", res);

      setOrderHistory(res?.order_history);

    } catch (e) {
      // showMessage({
      //   message: JSON.stringify(e),
      //   type: 'danger',
      //   icon: 'danger',
      // });
      console.log('e--', e);
    }
    //  navigation.navigate(SCREENS.CONNECT_VENDOR);
  };

  const getWallet = async (id: string) => {
    try {
      const getWallet = await mainServics.getWalletBalance(id);
      setBalance(getWallet?.data?.wallet);
    } catch (e) {
      console.log('error', e);
    }
  }

  const getTotalOrders = async (id) => {
    try {
      const getTotal = await mainServics.myTotalOrders(id, "vendor");
      setTotalOrders(getTotal?.total_orders);
      // console.log(getTotal, "////////////////////");
    } catch (e) {
      console.log('error', e);
    }
  }

  const setOnline = async (online, id) => {
    try {

      const response = await mainServics.changeOnlineStatus(online, id);
      return response;
      // console.log("[[[[[[[[[[[[[[[[", response);
    } catch (e) {
      console.log(e);
    }


  }

  const checkBusinessProfile = async (id) => {
    try {

      const res = await mainServics.checkBusinessProfile(id);

      // console.log(res, "@$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      setLoginError(undefined);
    } catch (e) {
      // console.log(e, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      setLoginError(e?.errMsg?.message)

    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      let data = { vendor_id: authContext?.userData?.user_id }
      getData(data);
      getWallet(data.vendor_id);
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
      <ErrorModal
        header={"Business Profile Incomplete"}
        onPress={() => {
          navigation.navigate(SCREENS.PROFILE_NAVIGATOR_VENDOR, {
            item: 'Verify your phone number',
          });

          setLoginError(loginError);
        }}
        message={loginError || " "}
        visible={loginError}
        buttonTxt={"go to business profile"}
      />

      <ScrollView keyboardShouldPersistTaps={'handled'}
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
                color="#000000"
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
              colors={['#526ba3', '#657aa5']}
              style={styles.gradientView}
            />
            <View>
              <Text style={{ color: '#fff', fontFamily: 'Rubik-Bold' }}>
                Mohgas Wallet
              </Text>
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ color: '#fff' }}>Balance</Text>
                <Text style={{ color: '#fff' }}>
                  ₦ {balance}
                </Text>
              </View>
              <Text style={{ color: '#fff' }}>
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
                justifyContent: 'space-evenly',
                paddingTop: 30,
                paddingHorizontal: 20,
              }}>
              {/* <View style={{ alignItems: 'center' }}>
                <View style={styles.circleView}>
                  <Icon3
                    name="plus"
                    size={25}
                    color="#fff"
                    onPress={() => navigation.navigate(SCREENS.PRODUCTS)}
                  />
                </View>
                <Text style={styles.centerViewText}>Product</Text>
              </View> */}
              <View style={{ alignItems: 'center' }}>
                <View style={styles.circleView}>
                  <Icon name="money" size={25} color="#fff"
                    onPress={() =>
                      navigation.navigate(SCREENS.UPDATE_PRICE)
                    } />
                </View>
                <Text style={styles.centerViewText}>Prices</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.circleView}>
                  <FontAwesome5
                    name="map-marker-alt"
                    size={25}
                    color="#fff"
                    onPress={() => navigation.navigate(SCREENS.BRANCHES)}
                  />
                </View>
                <Text style={styles.centerViewText}>Branches</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.circleView}>
                  <AntDesign
                    name="copy1"
                    size={25}
                    color="#fff"
                    onPress={() =>
                      navigation.navigate(SCREENS.ORDER_HISTORY_VENDOR)
                    }
                  />
                </View>
                <Text style={styles.centerViewText}>Order History</Text>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              width: '90%',
              backgroundColor: '#131a28',
              height: 60,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Rubik-Bold',
                position: 'absolute',
                right: 10,
                top: 5,
              }}>
              X
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View style={{ width: '40%', marginLeft: 10 }}>
                <Text style={styles.lightText}>Sales Today</Text>
                <Text style={styles.hardText}>N123.456.78</Text>
              </View>
              <View style={{ backgroundColor: '#fff', height: 40, width: 0.5 }} />
              <View style={{ width: '40%' }}>
                <Text style={styles.lightText}>Orders Completed</Text>
                <Text style={styles.hardText}>88/249</Text>
              </View>
            </View>
          </View> */}
        </View>
        <View
          style={{
            backgroundColor: '#131a28',
            height: 60,
            borderRadius: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'space-between',
            marginTop: 10,
            alignSelf: 'center'
          }}>
          <MaterialIcons name="support-agent" size={25} color={'#fff'} />
          <View style={{ width: '40%' }}>
            <Text style={styles.lightText}>Support</Text>
            <Text style={styles.hardText}>080 123 456 789</Text>
          </View>

          <Fontisto name="email" size={25} color={'#fff'} />
          <View style={{ width: '40%' }}>
            <Text style={styles.lightText}>Send a message</Text>
            <Text style={styles.hardText}>info@mohgas.com</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.ORDER_HISTORY_VENDOR)}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Recent Orders</Text>
            <Text style={{ color: 'gray' }}>
              View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={orderHistory?.slice(0, 3)}
            renderItem={({ item, index }) => (
              <DetailCard
                title={`${capitalizeFirstLetter(item?.order_type)} - ${item?.invoice
                  }`}
                subTitle={
                  item?.created_date
                    ? moment(item?.created_date).format('MMMM,DD,YYYY')
                    : '--'
                }
                style={{ backgroundColor: '#eaf5fc' }}
                price={`N${item?.grand_total}`}
                srNo={capitalizeFirstLetter(item?.status)}
                icon={<Icon3 name="arrow-up" size={25} color="#455F9B" />}
                data={item}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No Data</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.PROFILE_NAVIGATOR_VENDOR, {
                screen: SCREENS.EDIT_PROFILE,
              });
            }}
            style={{
              width: '100%',
              backgroundColor: '#eb473d',
              height: 60,

              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              padding: 10,
            }}>
            <Text
              style={[
                styles.hardText,
                {
                  fontSize: 12,
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: 20,
                },
              ]}>
              Your account is pending. Upload CAC, License Permit and a Valid
              ID...{'  '}
              <Text
                style={[
                  styles.hardText,
                  { fontSize: 12, color: '#000', fontWeight: '700' },
                ]}>
                Update Now?
              </Text>
            </Text>
          </TouchableOpacity> */}


        </View>
      </ScrollView>
    </View>
  );
}
