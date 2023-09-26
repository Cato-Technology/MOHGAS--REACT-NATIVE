/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
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
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
} from '../../../../components';

import SCREENS from '../../../../utils/constants';

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../../components/buttons/gradient-button';
import HeaderBottom from '../../../../components/header-bottom';
import VendorCard from '../../../../components/vendor-card';
import moment from 'moment';
import ConnectingVendor from '../../../../components/connecting-vendor/connecting-vendor';
import {showMessage} from 'react-native-flash-message';
import {mainServics} from '../../../../services';
import {useSelector} from 'react-redux';
import {GlobalState} from '../../../../redux/global/GlobalState';
import messaging from '@react-native-firebase/messaging';
export default function OrderSummary({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [vendorRender, setVendorRender] = useState(false);
  const [count, setCount] = useState(180); // seconds 180
  const orderSummary = useSelector(
    (state: GlobalState) => state?.global?.orderSummary,
  );
  console.log('orderSummary', orderSummary);
  console.log('route', route?.params?.itemVendor);
  let vandorData = route?.params?.itemVendor;
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onMessage(async remoteMessage => {
      console.log('Notification caused app to openDash==>', remoteMessage);
      if (remoteMessage?.data?.status === 'Confirmed') {
        navigation.navigate(SCREENS.CONFIRM_PAYMENT);
        setVendorRender(false);
      }
      if (remoteMessage?.data?.status === 'Rejected') {
        navigation.goBack();
        //  navigate(remoteMessage.data.click_action);
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.status === 'Confirmed') {
          navigation.navigate(SCREENS.CONFIRM_PAYMENT);
          setVendorRender(false);
        }
        if (remoteMessage?.data?.status === 'Rejected') {
          navigation.goBack();
          //  navigate(remoteMessage.data.click_action);
        }
      });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.status === 'Confirmed') {
          navigation.navigate(SCREENS.CONFIRM_PAYMENT);
          setVendorRender(false);
          //  navigate(remoteMessage.data.click_action);
        }
        if (remoteMessage?.data?.status === 'Rejected') {
          navigation.goBack();
          //  navigate(remoteMessage.data.click_action);
        }
      });
  }, []);
  const TimerFunction = () => {
    setCount(180);
    setVendorRender(true);
    console.log('start ho gaya');

    // navigation.navigate(SCREENS.ORDER_SUMMARY)
  };
  const onTimeEnd = () => {
    console.log('done ho gaya');
    setVendorRender(false);
    orderExpired();

    // navigation.navigate(SCREENS.ORDER_SUMMARY)
  };
  const orderExpired = async () => {
    try {
      let data = new FormData();
      // data.append('user_id', item?.vendor_details?.branch_store_manager_id);
      data.append('branch_id', orderSummary?.vendor_details?.branch_id);
      data.append('order_id', orderSummary?.order_details?.order_id);

      console.log('fdata', data);

      const resData = await mainServics.orderExpired(data);
      console.log('resData', resData);
      if (resData?.status) {
        setIsLoading(false);
        navigation.goBack();
      } else {
        console.log('gda');

        setIsLoading(false);
        showMessage({
          message: JSON.stringify(resData),
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (e) {
      console.log('e', e);

      setIsLoading(false);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('e', e);
    }
  };
  console.log('auth?.userData?.user_id', auth?.userData?.user_id);

  const sendNotification = async () => {
    try {
      setIsLoading(true);
      let data = new FormData();
      data.append(
        'user_id',
        orderSummary?.vendor_details?.branch_store_manager_id,
      );
      // data.append('user_id', 1);
      data.append('title', 'MohGas');
      data.append(
        'body',
        `New order received ! From : ${orderSummary?.customer_details?.full_name}`,
      );
      data.append('data[priority]', 'high');
      data.append('data[click_action]', 'VENDOR_NEW_ORDER');
      data.append('data[full_name]', orderSummary?.customer_details?.full_name);
      data.append(
        'data[product_type]',
        orderSummary?.product_details?.product_type,
      );
      data.append('data[customer_id]', auth?.userData?.user_id);

      data.append('data[size]', orderSummary?.product_details?.size);
      data.append('data[distance]', vandorData?.distance);
      data.append('data[order_id]', vandorData?.order_id);

      data.append(
        'data[distance_time]',
        vandorData?.distance_time ? vandorData?.distance_time : '-',
      );

      console.log('fdata', data);

      const resData = await mainServics.notifyVendor(data);
      console.log('resDataNot', resData);
      if (resData?.status && resData?.message == 'Success send notif') {
        setIsLoading(false);
        TimerFunction();
      } else {
        console.log('gda');

        setIsLoading(false);
        showMessage({
          message: JSON.stringify(resData),
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (e) {
      console.log('error', e);
      setIsLoading(false);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      {vendorRender && (
        <ConnectingVendor
          count={count}
          setCount={setCount}
          vendorRender={vendorRender}
          setVendorRender={setVendorRender}
          onTimeOut={onTimeEnd}
        />
      )}
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Summary'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Order Summary"
              subTitle={'Review what you have done Emekai'}
              contentStyle={{marginTop: 50}}
              rightIcon={
                <View
                  style={{
                    backgroundColor: '#2f65a2',
                    height: 30,
                    borderRadius: 5,
                  }}>
                  <Icon5 name="sort" size={30} color="#fff" />
                </View>
              }
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View
              style={{
                paddingVertical: heightPercentageToDP(2),
              }}>
              <Image
                style={{width: '100%', height: 260}}
                source={require('./gas_cylinder.png')}
                resizeMode="cover"
              />
              <View style={{flexDirection: 'row'}}>
                <View style={styles.twoView}>
                  <View style={{paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Order Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      Order ID - {orderSummary?.order_details?.invoice}
                    </Text>
                    <Text style={styles.descText}>
                      Order Status -{' '}
                      <Text style={[styles.descText, {color: '#eaa844'}]}>
                        Pending
                      </Text>
                    </Text>

                    <Text style={styles.descText}>
                      {'Order Date - ' +
                        moment(orderSummary?.order_details?.order_date).format(
                          'DD MMM YYYY HH:MM:A',
                        )}
                    </Text>
                  </View>
                  <View style={{paddingBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Customer Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      {orderSummary?.customer_details?.full_name}
                      {'\n'}
                      {orderSummary?.customer_details?.address}
                    </Text>
                  </View>
                </View>

                <View style={styles.twoView}>
                  <View style={{paddingBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignorderSummarys: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Vendor Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      {' '}
                      {orderSummary?.vendor_details?.vendor_branch_name}
                      {'\n'}
                      {orderSummary?.vendor_details?.address}
                    </Text>
                  </View>
                  <View style={{paddingBottom: 10}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignorderSummarys: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Products Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      Product Type -{' '}
                      {orderSummary?.product_details?.product_type}
                    </Text>
                    <Text style={styles.descText}>
                      Size - {orderSummary?.product_details?.size} kg
                    </Text>
                    <Text style={styles.descText}>
                      Due - N {orderSummary?.product_details?.price}
                    </Text>
                    <Text style={[styles.descText, {color: 'pink'}]}>
                      See Breakdown
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Rubik-Bold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                N {orderSummary?.summary?.total}
              </Text>
              <Text style={{width: '100%', fontSize: 11, textAlign: 'center'}}>
                Service Charge: N{orderSummary?.summary?.service_charge}
                {'   '}|{'   '}Delivery Cost: N
                {orderSummary?.summary?.delivery_cost}
              </Text>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    sendNotification();

                    // navigation.navigate(SCREENS.CONFIRM_PAYMENT);
                  }}
                  disabled={isLoading}
                  style={[
                    styles.btnStyle,
                    {
                      backgroundColor: isLoading ? 'gray' : '#469830',
                      width: '80%',
                    },
                  ]}>
                  <Text style={styles.btnTextStyle}>Continue</Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnTextStyle}>Cancel Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.ORDER_SUMMARY)}
                  style={[styles.btnStyle, {backgroundColor: '#469830'}]}>
                  <Text style={styles.btnTextStyle}>Continue to payment</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
