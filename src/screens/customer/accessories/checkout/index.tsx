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
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
  CheckOutCard,
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
import messaging from '@react-native-firebase/messaging';
// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../../components/buttons/gradient-button';
import HeaderBottom from '../../../../components/header-bottom';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {ORDER_SUMMARY} from '../../../../redux/global/constants';
import {showMessage} from 'react-native-flash-message';
import ConnectingVendor from '../../../../components/connecting-vendor/connecting-vendor';
import {mainServics} from '../../../../services';
export default function CheckOut({navigation, route}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [isLoading, setIsLoading] = React.useState(false);
  const [vendorRender, setVendorRender] = useState(false);
  const [count, setCount] = useState(180); // seconds 180
  let orderData = route?.params?.orderData;
  let details = route?.params?.details;
  console.log('details', details);

  console.log('route', route?.params?.orderData);
  const handleOrder = async () => {
    navigation.navigate(SCREENS.CONFIRM_PAYMENT, {
      render: 'acc',
    });
  };
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onMessage(async remoteMessage => {
      console.log('Notification caused app to openDash==>', remoteMessage);
      if (remoteMessage?.data?.status === 'Confirmed') {
        navigation.navigate(SCREENS.CONFIRM_PAYMENT, {
          render: 'acc',
        });

        setVendorRender(false);
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.status === 'Confirmed') {
          navigation.navigate(SCREENS.CONFIRM_PAYMENT, {
            render: 'acc',
          });
          setVendorRender(false);
        }
      });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.status === 'Confirmed') {
          navigation.navigate(SCREENS.CONFIRM_PAYMENT, {
            render: 'acc',
          });
          setVendorRender(false);
          //  navigate(remoteMessage.data.click_action);
        }
      });
  }, []);
  useEffect(() => {
    TimerFunction();
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
    navigation.pop(2);

    // navigation.navigate(SCREENS.ORDER_SUMMARY)
  };
  const orderExpired = async () => {
    try {
      let data = new FormData();
      // data.append('user_id', item?.vendor_details?.branch_store_manager_id);
      data.append('branch_id', orderData?.vendor_details?.branch_id);
      data.append('order_id', orderData?.order_details?.order_id);

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

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
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

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Market Place'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View style={{height: 40}} />

            <Text style={{color: 'gray', fontSize: 12, paddingVertical: 10}}>
              <Icon name="location-sharp" size={20} color="#357bc3" /> Deliver
              to{' '}
              <Text style={{color: '#000000', fontSize: 12}}>
                {orderData?.customer_details?.address}
              </Text>
            </Text>
            <View style={{height: 8}} />
            {/* <FlatList
              data={[1, 2, 3, 4]}
              renderItem={({item, index}) => (
                <CheckOutCard
                  title={'Top Up - LPG 25kg'}
                  subTitle={'Today - 02.15 PM'}
                  price={'N12.34'}
                  image={aImage}
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
            /> */}

            <CheckOutCard
              title={`${details?.products_name}`}
              subTitle={
                orderData?.order_details?.order_date
                  ? moment(orderData?.order_details?.order_date).format(
                      'MMMM-DD-YYYY',
                    )
                  : '--'
              }
              price={orderData?.product_details?.price}
              image={aImage}

              // onPressEdit={() =>
              //   navigation.navigate(SCREENS.ADDPAYMENTMETHOD, {
              //     edit: true,
              //     item: item,
              //   })
              // }
            />
            <View
              style={{
                backgroundColor: 'gray',
                width: '100%',
                height: 0.3,
                marginVertical: 15,
              }}
            />
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Sub Total</Text>
              <Text style={{color: '#000000'}}>
                {orderData?.summary?.total}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Delivery Cost</Text>
              <Text style={{color: '#000000'}}>
                {orderData?.summary?.delivery_cost}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Service Charge</Text>
              <Text style={{color: '#000000'}}>
                {orderData?.summary?.service_charge}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                width: '100%',
                height: 0.3,
                marginVertical: 15,
              }}
            />
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Total</Text>
              <Text style={{color: '#000000'}}>
                {orderData?.summary?.total}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
              }}>
              <GradientButton
                onPress={() => {
                  dispatch({
                    type: ORDER_SUMMARY,
                    payload: orderData,
                  });
                  handleOrder();

                  // navigation.navigate(SCREENS.TRACK_ORDER);
                }}
                // disabled={!isValid || loader || !checked}
                title="Checkout"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
