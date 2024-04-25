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

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {showMessage} from 'react-native-flash-message';
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

export default function ForgetPassword({navigation, route}) {
  let item = route?.params?.item;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('234');
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});

  const forgotPassowd = async () => {
    try {
      setLoader(true);
      let data = new FormData();
      data.append('phone', phoneNumber);

      const result = await authService.forgotPassword(data);
      console.log('result', result);
      setLoader(false);
      if (result?.status == '0') {
       setLoader(false);
         showMessage({
          message: result?.message,
          type: 'danger',
          icon: 'warning',
        });
      }
      if (result?.message == 'OTP Send') {
        setLoader(false);
        if (item === 'Verify your phone number') {
          navigation.navigate(SCREENS.PHONE_VERIFY, {
            userId: result?.data?.user_id,
            phNumber: phoneNumber,
          });
        } else {
          navigation.navigate(SCREENS.OTP_VERIFICATION, {
            userId: result?.data?.user_id,
            phNumber: phoneNumber,
          });
        }
      }
    } catch (e) {
      setLoader(false);
      console.log('error', e);
    }
  };
  const sendVerifyOtp = async () => {
    try {
      // setLoader(true);
      let data = new FormData();
      data.append('phone', phoneNumber);

      const result = await authService.sendOtpVerification(data);
      console.log('resultvvv', result);
      if (result.status) {
        navigation.navigate(SCREENS.PHONE_VERIFY, {
          userId: result?.data?.user_id,
          phNumber: phoneNumber,
        });
      }
    } catch (e) {
      console.log('error', e);
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
                  color: 'red',
                  fontSize: RFValue(14),
                  fontFamily: 'Rubik-Bold',
                }}>
                {item ? item : 'Forgot Password'}
              </Text>
            </View>
          </View>
          <View style={{marginTop: 80, paddingHorizontal: 25}}>
            <View style={{paddingHorizontal: 25}}>
              <Text style={[styles.label]}>Enter Phone Number</Text>
            </View>
            <PhoneNumber
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              setSelectCountryCode={setSelectCountryCode}
              maxLength={numberCondition.max}
            />
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(5),
                paddingVertical: heightPercentageToDP(2),
                marginTop: 30,
              }}>
              <GradientButton
                onPress={() => {
                  if (item == 'Verify your phone number') {
                    sendVerifyOtp();
                  } else {
                    forgotPassowd();
                  }
                }}
                disabled={loader || !phoneNumber}
                title={item ? 'Get Otp Code' : 'Continue'}
              />
              {!item && (
                <Text style={styles.tcTextStyle}>
                  Suddenly remembered it?{' '}
                  <Pressable onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                    {({pressed}) => (
                      <Text
                        style={[
                          {
                            textDecorationLine: pressed ? 'underline' : 'none',
                            color: '#4ca757',
                            fontFamily: 'Rubik-Bold',
                            fontSize: 15,
                            top: hp(0.32),
                            // fontFamily: fonts.mulishRegular,
                          },
                        ]}>
                        Login
                      </Text>
                    )}
                  </Pressable>
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
