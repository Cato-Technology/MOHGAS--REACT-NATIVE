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
import {mainServics} from '../../../services';
import {showMessage} from 'react-native-flash-message';
export default function AddBranch({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const render = route?.params?.render;
  const signUpSchema = useMemo(
    () =>
      Yup.object({
        branch_name: Yup.string()
          .required('First Name is Required')
          .matches(NAME, 'Name should only contain latin letters')
          .required('Branch name is Required'),
        branch_email: Yup.string()
          .email('Please provide correct branch email')
          .required('Branch email is required'),
        address: Yup.string().required('Address is Required'),
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
  console.log('auth', auth?.userData?.user_id);

  const handleSubmitted = async values => {
    console.log('values', values);

    setLoader(true);
    try {
      let data = new FormData();
      data.append('branch_name', values?.branch_name);
      data.append('branch_email', values?.branch_email);
      data.append('branch_user_id', auth?.userData?.user_id);
      data.append('address', values?.address);
      data.append('password', values?.password);
      const result = await mainServics.addBranch(data);
      console.log('result', result);
      if (result.status) {
        showMessage({
          message: 'Branch Added!',
          type: 'success',
          icon: 'success',
        });
        navigation.goBack();
        setLoader(false);
      } else {
        showMessage({
          message: result.message,
          type: 'warning',
          icon: 'warning',
        });
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log('error', e);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'warning',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />
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
            <View style={{width: '100%', paddingHorizontal: 10}}>
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
              <View>
                <Formik
                  initialValues={{
                    branch_name: '',
                    branch_email: '',
                    address: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  onSubmit={values => handleSubmitted(values)}
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
                          onChange={handleChange('branch_name')}
                          value={values.branch_name}
                          error={touched.branch_name ? errors.branch_name : ''}
                          onBlur={() => setFieldTouched('branch_name')}
                        />
                        {/* <InputWithLabel
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
                        /> */}
                        {/* <InputWithLabel
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
                        /> */}
                        <InputWithLabel
                          label={'Email Branch'}
                          placeholder={'Eg. abc@abc.com'}
                          containerStyles={{paddingHorizontal: 20}}
                          labelStyle={{
                            //   fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          onChange={handleChange('branch_email')}
                          value={values.branch_email}
                          error={
                            touched.branch_email ? errors.branch_email : ''
                          }
                          onBlur={() => setFieldTouched('branch_email')}
                        />

                        <InputWithLabel
                          label="Branch Address"
                          placeholder={'Eg. Street 2, Abc'}
                          containerStyles={{paddingHorizontal: 20}}
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          onChange={handleChange('address')}
                          value={values.address}
                          error={touched.address ? errors.address : ''}
                          onBlur={() => setFieldTouched('address')}
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
                          disabled={!isValid || loader}
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
