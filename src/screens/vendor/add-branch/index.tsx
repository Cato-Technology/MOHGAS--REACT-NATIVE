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
  FlatList,
  SafeAreaView,
} from 'react-native';

import Icon5 from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
} from '../../../components';

import SCREENS from '../../../utils/constants';
import * as Yup from 'yup';
import {Formik} from 'formik';
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
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import HeaderBottom from '../../../components/header-bottom';
import {NAME} from '../../../utils/regix';
export default function AddBranch({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const render = route?.params?.render;
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
      <ActivityIndicator visible={false} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <View style={styles.icon} />
            <Header
              title={'Add Branch'}
              back={true}
              rightIcon={
                <AntDesign name="setting" size={25} color={colors.text} />
              }
            />
            <View style={{width: '100%', paddingHorizontal: 20}}>
              <HeaderBottom
                title={'New Branch'}
                subTitle={'Create and mange store branches'}
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
              <View style={{marginTop: 40}}>
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
                          label="Name of Branch"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          placeholder={'Eg. Pol Gas'}
                          containerStyles={{paddingHorizontal: 20}}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                        <InputWithLabel
                          label="Store Manger"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          placeholder={'Eg. Ali Khan'}
                          containerStyles={{paddingHorizontal: 20}}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                        <InputWithLabel
                          label="Branch Phone"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          placeholder={'0343534534'}
                          containerStyles={{paddingHorizontal: 20}}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                        <InputWithLabel
                          label={'Email Branch'}
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

                        <InputWithLabel
                          label="Branch Address"
                          placeholder={'Eg. Street 2, Abc'}
                          containerStyles={{paddingHorizontal: 20}}
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          onChange={handleChange('referal_code')}
                          value={values.referal_code}
                          error={
                            touched.referal_code ? errors.referal_code : ''
                          }
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
                            touched.confirmPassword
                              ? errors.confirmPassword
                              : ''
                          }
                          onBlur={() => setFieldTouched('confirmPassword')}
                          onChange={handleChange('confirmPassword')}
                          value={values.confirmPassword}
                        />
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
                          title="Create Branch"
                        />
                      </View>
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
