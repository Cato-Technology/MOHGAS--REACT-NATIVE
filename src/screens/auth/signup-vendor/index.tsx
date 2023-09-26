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
} from '../../../components';

import SCREENS from '../../../utils/constants';

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
import {authService, mainServics} from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
import {NAME} from '../../../utils/regix';
import {showMessage} from 'react-native-flash-message';
import {Dropdown} from 'react-native-element-dropdown';

export default function SignUpVendor({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [lgaData, setLgaData] = useState([]);
  const [stateValue, setStateValue] = useState(stateData[0]);
  const [cityValue, setCityValue] = useState(cityData[0]);
  const [lgaValue, setLgaValue] = useState(lgaData[0]);

  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('+234');
  const [numberCondition, setNumberCondition] = useState({min: 8, max: 11});
  console.log('phoneNumber', phoneNumber);

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        business_name: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Name should only contain latin letters')
          .required('Full name is Required'),
        business_email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),

        business_address: Yup.string().required('Address is Required'),

        // .required('Email is required'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    getStateData();
  }, []);
  const getLgaData = async id => {
    try {
      const result = await mainServics.getLga(id);
      console.log('resultLga', result);
      if (result.status) {
        let arr = [];
        result?.data?.map(ele => {
          console.log('ele', ele);
          arr.push({
            label: ele.name,
            value: ele.id,
          });
        });
        setLgaData(arr);
        setLgaValue(arr[0]);
        console.log('arr', arr);
      }
    } catch (e) {
      console.log('eer', e);
    }
  };
  const getStateData = async () => {
    try {
      const result = await mainServics.getStates();
      console.log('resultStates', result);
      if (result.status) {
        let arr = [];
        result?.data?.map(ele => {
          console.log('ele', ele);
          arr.push({
            label: ele.name,
            value: ele.id,
            country_id: ele?.country_id,
            country_code: ele?.country_code,
            fips_code: ele?.fips_code,
            iso2: ele?.iso2,
            type: ele?.type,
            latitude: ele?.latitude,
            longitude: ele?.longitude,
            created_at: ele?.created_at,
            updated_at: ele?.updated_at,
            flag: ele?.flag,
            wikiDataId: ele?.wikiDataId,
            price_per_kg: ele?.price_per_kg,
            service_charge: ele?.service_charge,
            delivery_cost_per_km: ele?.delivery_cost_per_km,
          });
        });
        setStateData(arr);
        setStateValue(arr[0]);
        getLgaData(arr[0]?.value);
        console.log('arr', arr);
      }
    } catch (e) {
      console.log('eer', e);
    }
  };
  const getCitiesData = async id => {
    console.log('idCCC', id);

    try {
      const result = await mainServics.getCities(id);
      console.log('resultCities', result);
      if (result.status) {
        let arr = [];
        result?.data?.map(ele => {
          console.log('ele', ele);
          arr.push({
            label: ele.name,
            value: ele.id,

            state_id: ele?.state_id,
            state_code: ele?.state_code,
            country_id: ele?.country_id,
            country_code: ele?.country_code,
            latitude: ele?.latitude,
            longitude: ele?.longitude,
            created_at: ele?.created_at,
            updated_at: ele?.updated_at,
            flag: ele?.flag,
            wikiDataId: ele?.wikiDataId,
          });
        });
        setCityData(arr);
        setCityValue(arr[0]);
        console.log('arrcity', arr[0]);
      }
    } catch (e) {
      console.log('eer', e);
    }
  };
  const handleNext = async values => {
    console.log('values', values);
    console.log('pggg', selectCountryCode + phoneNumber);
    let tData = {
      ...values,
      ...{business_phone: phoneNumber},
      ...{state_id: stateValue?.value},
      ...{country_id: stateValue?.country_id},
      ...{city_id: cityValue?.value},
      ...{lga_id: lgaValue?.value},
    };
    console.log('tData', tData);

    navigation.navigate(SCREENS.SIGNUP_PERSONAL_VENDOR, {tData});

    // setLoader(true);
    // try {
    //   console.log('values', values);
    //   console.log('selectCountryCode', selectCountryCode);
    //   console.log('Phno', phoneNumber);
    //   let data = new FormData();
    //   data.append('fullname', values.fullname);
    //   data.append('email', values.email);
    //   data.append('userType', 'User');
    //   data.append('state', 'state');
    //   data.append('lga', 'lga');
    //   data.append('city', 'city');
    //   data.append('street', 'street');
    //   data.append('phone_num', selectCountryCode + phoneNumber);
    //   data.append('referal_code', values.referal_code);
    //   data.append('password', values.password);
    //   const result = await authService.signUp(data);
    //   if (result.message == 'Successfully Registered') {
    //     alert('Registered');
    //     navigation.navigate(SCREENS.LOGIN);
    //     setLoader(false);
    //   } else {
    //     showMessage({
    //       message: JSON.stringify(result.message),
    //       type: 'danger',
    //       icon: 'warning',
    //     });
    //     setLoader(false);
    //   }
    // } catch (e) {
    //   setLoader(false);
    //   console.log('error', e);
    // }
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
                Business Information
              </Text>
            </View>
          </View>
          <View style={{marginTop: 45, paddingHorizontal: 25}}>
            <Text
              style={{
                color: '#4ca735',
                fontSize: RFValue(14),
                fontFamily: 'Rubik-Bold',
                paddingHorizontal: 16,
              }}>
              Vendor Registration
            </Text>
            <Formik
              initialValues={{
                business_name: '',
                business_email: '',
                business_address: '',
              }}
              onSubmit={values => handleNext(values)}
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
                      label="Business Name"
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      placeholder={'Eg. Holy Gas'}
                      containerStyles={{paddingHorizontal: 20}}
                      onChange={handleChange('business_name')}
                      value={values.business_name}
                      error={touched.business_name ? errors.business_name : ''}
                      onBlur={() => setFieldTouched('business_name')}
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
                      onChange={handleChange('business_email')}
                      value={values.business_email}
                      error={
                        touched.business_email ? errors.business_email : ''
                      }
                      onBlur={() => setFieldTouched('business_email')}
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
                            Phone Number must not start with 0
                          </Text>
                        ) : (
                          phoneNumber.length < numberCondition.min && (
                            <Text style={styles.errorMessage}>
                              Must have {numberCondition.min}
                              {'  '}
                              {numberCondition.max !== numberCondition.min &&
                                -numberCondition.max}
                              {'  '} characters
                            </Text>
                          )
                        )
                      ) : (
                        phoneNumber.length < numberCondition.min && (
                          <Text style={styles.errorMessage}>
                            Must have{'  '}
                            {numberCondition.min}
                            {numberCondition.max !== numberCondition.min &&
                              -numberCondition.max}
                            {'  '} characters
                          </Text>
                        )
                      ))}

                    <View style={{height: 20}} />
                    <View style={{paddingHorizontal: 20}}>
                      <Text
                        style={{
                          fontFamily: 'Rubik-Regular',
                          color: '#000000',
                          fontSize: 15,
                          marginTop: 10,
                        }}>
                        Select State
                      </Text>
                      <Dropdown
                        style={styles.dropdown}
                        itemTextStyle={{color: '#000000'}}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={stateData}
                        //search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select State"
                        //searchPlaceholder="Search..."
                        value={stateValue}
                        onChange={item => {
                          setStateValue(item);
                          getCitiesData(item.value);
                          getLgaData(item.value);
                        }}
                        // renderLeftIcon={() => (
                        //   <AntDesign
                        //     style={styles.icon2}
                        //     color="black"
                        //     name="Safety"
                        //     size={20}
                        //   />
                        // )}
                      />
                    </View>

                    {cityData.length > 0 && (
                      <View style={{paddingHorizontal: 20}}>
                        <Text
                          style={{
                            fontFamily: 'Rubik-Regular',
                            color: '#000000',
                            fontSize: 15,
                            marginTop: 10,
                          }}>
                          Select City
                        </Text>
                        <Dropdown
                          itemTextStyle={{color: '#000000'}}
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={cityData}
                          //search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select City"
                          //searchPlaceholder="Search..."
                          value={cityValue}
                          onChange={item => {
                            setCityValue(item.value);
                          }}
                          // renderLeftIcon={() => (
                          //   <AntDesign
                          //     style={styles.icon2}
                          //     color="black"
                          //     name="Safety"
                          //     size={20}
                          //   />
                          // )}
                        />
                      </View>
                    )}
                    {lgaData.length > 0 && (
                      <View style={{paddingHorizontal: 20}}>
                        <Text
                          style={{
                            fontFamily: 'Rubik-Regular',
                            color: '#000000',
                            fontSize: 15,
                            marginTop: 10,
                          }}>
                          Select LGA
                        </Text>
                        <Dropdown
                          style={styles.dropdown}
                          itemTextStyle={{color: '#000000'}}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={lgaData}
                          //search
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder="Select LGA"
                          //searchPlaceholder="Search..."
                          value={lgaValue}
                          onChange={item => {
                            setLgaValue(item.value);
                          }}
                          // renderLeftIcon={() => (
                          //   <AntDesign
                          //     style={styles.icon2}
                          //     color="black"
                          //     name="Safety"
                          //     size={20}
                          //   />
                          // )}
                        />
                      </View>
                    )}

                    <InputWithLabel
                      label="Business Address"
                      placeholder={'Eg. Abc, street 12'}
                      containerStyles={{paddingHorizontal: 20}}
                      labelStyle={{
                        // fontFamily: fonts.mulishSemiBold,
                        color: colors.yellowHeading,
                        fontSize: 15,
                      }}
                      onChange={handleChange('business_address')}
                      value={values.business_address}
                      error={
                        touched.business_address ? errors.business_address : ''
                      }
                      onBlur={() => setFieldTouched('business_address')}
                    />
                  </View>

                  <View
                    style={{
                      paddingHorizontal: widthPercentageToDP(3),
                      paddingVertical: heightPercentageToDP(2),
                      zIndex: -1,
                    }}>
                    <GradientButton
                      onPress={() => {
                        handleSubmit();
                      }}
                      disabled={
                        phoneNumber.length < numberCondition.min ||
                        loader ||
                        !isValid
                      }
                      title="Continue"
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
