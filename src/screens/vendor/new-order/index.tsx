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
} from 'react-native';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
} from '../../../components';

import SCREENS from '../../../utils/constants';

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
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
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import {authService, mainServics} from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SuccessImage} from '../../../assets/images/svgs';
import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {GlobalState} from '../../../redux/global/GlobalState';
export default function NewOrder({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [loader, setLoader] = useState(false);
  const notificationData = useSelector(
    (state: GlobalState) => state?.global?.notificationData,
  );
  const item = route?.params?.item;
  const render = route?.params?.render;
  console.log('item', item);

  console.log('iiii', notificationData);
  const sendNotification = async status => {
    try {
      let data = new FormData();
      data.append('user_id', notificationData?.data?.customer_id);
      // data.append('user_id', 1);
      data.append('title', 'MohGas');
      data.append('body', `Order Accepted`);
      data.append('data[status]', status);

      data.append('data[priority]', 'high');

      console.log('fdata', data);

      const resData = await mainServics.notifyVendor(data);
      console.log('resDataNot', resData);
    } catch (e) {
      console.log('error', e);

      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  const AcceptOrder = async () => {
    try {
      let data = new FormData();

      data.append('order_id', notificationData?.data?.order_id);
      console.log('data', data);

      const resDataAccept = await mainServics.acceptOrder(data);
      console.log('resDataAccept', resDataAccept);
      if (resDataAccept.status) {
        sendNotification('Accepted');
        alert('accepted');
        navigation.goBack();
      }
    } catch (e) {
      console.log('error'), e;
      showMessage({
        message: 'Some Thing Happening Wrong',
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  const RejectOrder = async () => {
    try {
      let data = new FormData();

      data.append('order_id', notificationData?.data?.order_id);
      console.log('data', data);

      const resDataReject = await mainServics.rejectOrder(data);
      console.log('resDataReject', resDataReject);
      if (resDataReject.status) {
        sendNotification('Rejected');
        alert('Rejected');
      }
    } catch (e) {
      console.log('error'), e;
      showMessage({
        message: 'Some Thing Happening Wrong',
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />
      <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      />

      <View
        style={{
          width: '100%',
          flex: 1,

          alignItems: 'center',
        }}>
        <View style={styles.icon} />

        <View
          style={{
            marginTop: '90%',
            paddingHorizontal: 30,
            alignItems: 'center',
          }}>
          <Text style={[styles.heading]}>New Order</Text>

          {notificationData?.data?.product_type ? (
            <Text
              style={[
                styles.detailText,
                {fontFamily: 'Rubik-SemiBold', fontSize: RFValue(16)},
              ]}>
              {notificationData?.data?.full_name} (
              {notificationData?.data?.product_type})
            </Text>
          ) : (
            <Text
              style={[
                styles.detailText,
                {fontFamily: 'Rubik-SemiBold', fontSize: RFValue(16)},
              ]}>
              {notificationData?.data?.full_name}
            </Text>
          )}
          <Text style={styles.detailText}>
            {' '}
            {notificationData?.data?.size}Kg ({notificationData?.data?.distance}
            km - {notificationData?.data?.distance_time} mins away)
          </Text>

          <View style={{marginTop: '15%'}}>
            <GradientButton
              onPress={() => AcceptOrder()}
              disabled={false}
              title={'Accept'}
            />
            <GradientButton
              onPress={() => RejectOrder()}
              disabled={false}
              title={'Reject'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
