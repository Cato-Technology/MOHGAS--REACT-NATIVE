import React, {Component, useMemo, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import {
  ActivityIndicator,
  Header,
  InputWithLabel,
  PhoneNumber,
} from '../../../components';
//import TopTabButton from '../../../../../../components/top-tab-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AccountMenu} from '../../../components/ui';
import makeStyles from './styles';
import SCREENS from '../../../utils/constants';
import AuthContext from '../../../utils/auth-context';
import Images from '../../../assets/images';
import aImage from '../../../assets/avatar.jpg';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {NAME} from '../../../utils/regix';
import GradientButton from '../../../components/buttons/gradient-button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
const EditProfile = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const styles = makeStyles(colors);
  const [EditprofileLoader, setProfileLoader] = React.useState(false);
  const [autoLogoutCheck, setAutoLogoutCheck] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('989087897');
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

        referal_code: Yup.string().required('Refferal Code is Required'),
        email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),
        // .required('Email is required'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <Header
        title={'Profile'}
        back={true}
        rightIcon={<AntDesign name="setting" size={25} color={colors.text} />}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.contentView}>
            <View style={[styles.image]}>
              <Image
                onLoadStart={() => setProfileLoader(true)}
                onLoadEnd={() => setProfileLoader(false)}
                source={aImage}
                style={styles.image}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: -4,
                  padding: 9,
                  borderRadius: 25,
                  backgroundColor: '#94d669',
                }}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={25}
                  color={'#fff'}
                />
              </View>
            </View>
            <View style={{marginTop: 40, paddingHorizontal: 25}}>
              <Formik
                initialValues={{
                  fullname: 'Waqar Hussain',
                  email: 'test@gmaqil.com',
                  password: 'fafdsafas',
                  referal_code: 'Burjman Dubai',
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

                      <InputWithLabel
                        label="Address"
                        placeholder={'Eg. Burjman, Dubai'}
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
                        title="Update"
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
export default EditProfile;
