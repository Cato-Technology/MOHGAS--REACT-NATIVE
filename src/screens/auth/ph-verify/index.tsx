/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useMemo, useState} from 'react';
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
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Zocial';
import Icon3 from 'react-native-vector-icons/Entypo';

import {
  // ErrorModal,
  ActivityIndicator,
  PhoneNumber,
  CheckBox,
  InputWithLabel,
} from '../../../components';

import SCREENS from '../../../utils/constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import {Formik} from 'formik';
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
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import {authService} from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
import {NAME} from '../../../utils/regix';
import {showMessage} from 'react-native-flash-message';

export default function PhoneVerify({navigation, route}) {
  console.log('route', route?.params?.item?.business_id);
  let item = route.params.item;
  console.log('ii', item);

  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const [loginError, setLoginError] = useState(false);

  const [loader, setLoader] = useState(false);

  const [otpManual, setOtpManual] = useState('');

  console.log('item', item);

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string().required('Password is Required'),
        confirmPassword: Yup.string().test(
          'passwords-match',
          'Passwords must match',
          function (value) {
            return this.parent.password === value;
          },
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  console.log('route?.params', route?.params);

  const verifyOtp = async code => {
    try {
      setLoader(true);
      let data = new FormData();
      data.append('user_id', route?.params?.userId);
      data.append('phone', route?.params?.phNumber);
      data.append('otp', otpManual || code);

      console.log('data->', data);

      const result = await authService.verifyOtp(data);
      console.log('result', result);
      // navigation.navigate(SCREENS.PASSWORD_RESET_SUCCESS)
      setLoader(false);

      if (result?.message == 'OTP Verification success ') {
        navigation.navigate(SCREENS.LOGIN);
      } else {
        showMessage({
          message: result?.message,
          type: 'danger',
          icon: 'warning',
        });
      }
    } catch (e) {
      setLoader(false);
      console.log('error', e);
      showMessage({
        message: e?.errMsg?.message,
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              width: '100%',

              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <Image style={styles.logo} source={Logo} />
            </View>
            <View style={{marginTop: 140, paddingHorizontal: 25}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: RFValue(14),
                  fontFamily: 'Rubik-Bold',
                }}>
                Verify Phonefd
              </Text>
            </View>
          </View>
          <View style={{marginTop: 80, paddingHorizontal: 25}}>
            <View style={{paddingHorizontal: 25}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.label]}>Verification Code</Text>
                <Text style={[styles.label, {color: '#4ca735', fontSize: 15}]}>
                  Confirmed!
                </Text>
              </View>
              <OTPInputView
                style={{width: '100%', height: 50}}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  verifyOtp(code);
                  setOtpManual(code);
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 20,
                paddingHorizontal: 20,
              }}>
              <Text style={[styles.tcTextStyle, {color: '#4ca757'}]}>
                Didn't receive code Resend?
              </Text>

              <Text
                onPress={() => navigation.navigate(SCREENS.FORGET_PASSWORLD)}
                style={[styles.tcTextStyle]}>
                04:38
              </Text>
            </View>
            <View style={{marginTop: 40, paddingHorizontal: 25}}>
              <GradientButton
                onPress={() => verifyOtp()}
                disabled={!otpManual}
                title={'Verify'}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
