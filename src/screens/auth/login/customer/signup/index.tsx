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
} from '../../../../../components';

import SCREENS from '../../../../../utils/constants';

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
import AuthContext from '../../../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../../../components/buttons/gradient-button';
import {authService} from '../../../../../services';
import ErrorModal from '../../../../../components/error-modal';
import Logo from '../../../../../assets/images/logo.png';
import {NAME} from '../../../../../utils/regix';
import {showMessage} from 'react-native-flash-message';

export default function SignUpCustomer({navigation}) {
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
  const [selectCountryCode, setSelectCountryCode] = useState('');
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        fullname: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Name should only contain latin letters')
          .required('Full name is Required'),

        password: Yup.string().required('Password is Required'),
        confirmPassword: Yup.string().test(
          'passwords-match',
          'Passwords must match',
          function (value) {
            return this.parent.password === value;
          },
        ),
        referal_code: Yup.string().required('Refferal Code is Required'),
        email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),
        // .required('Email is required'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleLogin = async values => {
    setLoader(true);
    try {
      console.log('values', values);
      console.log('selectCountryCode', selectCountryCode);

      console.log('Phno', phoneNumber);

      let data = new FormData();
      data.append('fullname', values.fullname);
      data.append('email', values.email);
      data.append('userType', 'User');
      data.append('state', 'state');
      data.append('lga', 'lga');
      data.append('city', 'city');
      data.append('street', 'street');
      data.append('phone_num', selectCountryCode + phoneNumber);
      data.append('referal_code', values.referal_code);
      data.append('password', values.password);

      const result = await authService.signUp(data);
      if (result.message == 'Successfully Registered') {
        alert('Registered');
        navigation.navigate(SCREENS.LOGIN);
        setLoader(false);
      } else {
        showMessage({
          message: JSON.stringify(result.message),
          type: 'danger',
          icon: 'warning',
        });
        setLoader(false);
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
            <View style={{marginTop: 140, paddingHorizontal: 25}}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: RFValue(14),
                  fontWeight: 'bold',
                }}>
                Create a new account
              </Text>
            </View>
          </View>
          <View style={{marginTop: 40, paddingHorizontal: 25}}>
            <Formik
              initialValues={{
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
                referal_code: '',
              }}
              onSubmit={values => handleLogin(values)}
              validationSchema={signUpSchema}>
              {({
                handleSubmit,
                errors,
                handleChange,
                values,
                // isSubmitting,
                isValid,
                setFieldValue,
                touched,
                setFieldTouched,
              }) => (
                <>
                  {console.log('errors', errors)}
                  <View>
                    <InputWithLabel
                      label="Full Name"
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      placeholder={'Eg. Amit'}
                      containerStyles={{paddingHorizontal: 20}}
                      onChange={handleChange('fullname')}
                      value={values.fullname}
                      error={touched.fullname ? errors.fullname : ''}
                      onBlur={() => setFieldTouched('fullname')}
                    />

                    <InputWithLabel
                      label={'Email'}
                      placeholder={'Eg. abc@abc.com'}
                      containerStyles={{paddingHorizontal: 20}}
                      labelStyle={{
                        //   fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      onChange={handleChange('email')}
                      value={values.email}
                      error={touched.email ? errors.email : ''}
                      onBlur={() => setFieldTouched('email')}
                    />
                    <View style={{height: 20}} />
                    <Text style={styles.inputLablel}>Phone</Text>
                    <PhoneNumber
                      countryCode={countryCode}
                      setCountryCode={setCountryCode}
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      setSelectCountryCode={setSelectCountryCode}
                      maxLength={numberCondition.max}
                    />
                    {phoneNumber !== '' &&
                      (selectCountryCode == 63 ? (
                        phoneNumber.charAt(0) == 0 ? (
                          <Text style={styles.errorMessage}>
                            Phonenumber must not start with 0
                          </Text>
                        ) : (
                          phoneNumber.length < numberCondition.min && (
                            <Text style={styles.errorMessage}>
                              Must have
                              {numberCondition.min}
                              {numberCondition.max !== numberCondition.min &&
                                -numberCondition.max}
                              4-13 characters
                            </Text>
                          )
                        )
                      ) : (
                        phoneNumber.length < numberCondition.min && (
                          <Text style={styles.errorMessage}>
                            Must have
                            {numberCondition.min}
                            {numberCondition.max !== numberCondition.min &&
                              -numberCondition.max}
                            4-13 characters
                          </Text>
                        )
                      ))}

                    <View style={{height: 20}} />

                    <InputWithLabel
                      label="Referral Code"
                      placeholder={'Eg. gzQ304MwqS '}
                      containerStyles={{paddingHorizontal: 20}}
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      onChange={handleChange('referal_code')}
                      value={values.referal_code}
                      error={touched.referal_code ? errors.referal_code : ''}
                      onBlur={() => setFieldTouched('referal_code')}
                    />
                    <InputWithLabel
                      label={'Password'}
                      placeholder={'Enter your password here'}
                      containerStyles={{paddingHorizontal: 20}}
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      value={values.password}
                      error={touched.password ? errors.password : ''}
                      onChange={handleChange('password')}
                      // leftIcon={<Icon2 name="locked" size={20} color="#fff" />}
                      onBlur={() => setFieldTouched('password')}
                      showEye={true}
                    />
                    <InputWithLabel
                      label="Confirm Password"
                      containerStyles={{paddingHorizontal: 20}}
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      // leftIcon={<Icon2 name="locked" size={20} color="#fff" />}
                      showEye={true}
                      placeholder={'Enter your same password here'}
                      error={
                        touched.confirmPassword ? errors.confirmPassword : ''
                      }
                      onBlur={() => setFieldTouched('confirmPassword')}
                      onChange={handleChange('confirmPassword')}
                      value={values.confirmPassword}
                    />
                  </View>

                  <View style={styles.tcText}>
                    <CheckBox checked={checked} setChecked={setChecked} />

                    <Text style={styles.tcTextStyle}>
                      <Text>I agree to the </Text>

                      <Pressable
                        onPress={() =>
                          navigation.navigate(SCREENS.TERMS_AND_PRIVACY, {
                            privacyPolicy: false,
                            disableData: true,
                          })
                        }>
                        {({pressed}) => (
                          <Text
                            style={[
                              {
                                textDecorationLine: pressed
                                  ? 'underline'
                                  : 'none',
                                color: '#4ca757',
                                fontSize: 15,
                                top: hp(0.32),
                                fontWeight: 'bold',
                                // fontFamily: fonts.mulishRegular,
                              },
                            ]}>
                            terms and conditions
                          </Text>
                        )}
                      </Pressable>
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: widthPercentageToDP(3),
                      paddingVertical: heightPercentageToDP(2),
                      zIndex: -1,
                    }}>
                    <GradientButton
                      onPress={() => handleSubmit()}
                      disabled={!isValid || loader || !checked}
                      title="Save and continue"
                    />
                    <Text
                      style={[
                        styles.tcTextStyle,
                        {textAlign: 'center', marginTop: 10},
                      ]}>
                      <Text>Already have an account? </Text>

                      <Pressable
                        onPress={() =>
                          navigation.navigate(SCREENS.LOGIN, {
                            privacyPolicy: false,
                            disableData: true,
                          })
                        }>
                        {({pressed}) => (
                          <Text
                            style={[
                              {
                                textDecorationLine: pressed
                                  ? 'underline'
                                  : 'none',
                                color: '#4ca757',
                                fontWeight: 'bold',
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
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
