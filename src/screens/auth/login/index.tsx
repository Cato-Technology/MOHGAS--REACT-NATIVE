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

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Zocial';
import Icon3 from 'react-native-vector-icons/Entypo';

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
import {authService} from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
export default function Login({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleLogin = async () => {
    try {
      setLoader(true);
      const fcm = await AsyncStorage.getItem('fcm');
      console.log('fcmAsync', fcm);

      let data = new FormData();
      data.append('email', userName);
      data.append('password', password);
      data.append('firebase_token', fcm);
      data.append('device_name', 'gfbdf');
      console.log('data', data);

      const result = await authService.login(data);
      console.log('result', result);

      if (!result?.status) {
        setLoader(false);
        setLoginError(true);
      }
      if (result?.status) {
        await AsyncStorage.setItem('token', result?.response?.token);
        try {
          const jsonValue = JSON.stringify(result?.response);
          await AsyncStorage.setItem('userData', jsonValue);
        } catch (e) {
          console.error('Failed to save user data to storage');
        }

        if (result?.response?.token) {
          auth.setUserData(result?.response);
          auth.authContext.signIn(result?.response?.token);
          setLoader(false);
        }
      }
    } catch (e) {
      setLoader(false);
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
          </View>
          <View style={{marginTop: 230, paddingHorizontal: 25}}>
            <InputWithLabel
              label="Email or Number"
              labelStyle={{
                // fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              // leftIcon={<Icon name="person" size={20} color="#fff" />}
              placeholder={'Enter your username here'}
              onChange={text => setUserName(text)}
              // value={ammount + ''}
            />

            <View style={{height: 5}} />

            <InputWithLabel
              label="Password"
              labelStyle={{
                // fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              // leftIcon={<Icon2 name="locked" size={20} color="#fff" />}
              showEye={true}
              placeholder={'Enter your password here'}
              onChange={text => setPassword(text)}
              // value={ammount + ''}
            />
            <View style={{height: 30}} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View style={styles.tcText}>
                <View style={{flexDirection: 'row'}}>
                  <CheckBox checked={checked} setChecked={setChecked} />
                  <Text style={styles.tcTextStyle}>Remember me</Text>
                </View>
              </View>
              <Text
                onPress={() => navigation.navigate(SCREENS.FORGET_PASSWORLD)}
                style={[styles.tcTextStyle, {color: '#4ca757'}]}>
                Forgot Password?
              </Text>
            </View>
            <View style={{height: 30}} />
            <GradientButton
              onPress={() => handleLogin()}
              disabled={false}
              title={'Login'}
            />
            <Text
              onPress={() => navigation.navigate(SCREENS.SIGNUP_CUSTOMER)}
              style={[styles.centerText, {fontSize: RFValue(12)}]}>
              Register as Customer
            </Text>

            <Text style={styles.centerText}>Or</Text>
            <Text
              style={[styles.centerText, {fontSize: RFValue(12)}]}
              onPress={() => navigation.navigate(SCREENS.SIGNUP_VENDOR)}>
              Register as Vendor
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
