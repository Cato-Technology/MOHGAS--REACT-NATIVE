/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
  PermissionsAndroid,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  // ErrorModal,
  ActivityIndicator,
  PhoneNumber,
  CheckBox,
  InputWithLabel,
  EditProfileModal,
} from '../../../components';

import SCREENS from '../../../utils/constants';

import makeStyles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
import { useTheme } from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import { authService, mainServics } from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
import { NAME } from '../../../utils/regix';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Images from '../../../assets/images';
import { Dropdown } from 'react-native-element-dropdown';
export default function SignUpCustomer({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [showModal, setShowModal] = React.useState(false);
  const [image, setImage] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cam, setCam] = useState(false);
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectCountryCode, setSelectCountryCode] = useState('');
  const [numberCondition, setNumberCondition] = useState({ min: 8, max: 11 });
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [lgaData, setLgaData] = useState([]);
  const [stateValue, setStateValue] = useState(stateData[0]);
  const [cityValue, setCityValue] = useState(cityData[0]);
  const [lgaValue, setLgaValue] = useState(lgaData[0]);
  let cameraIs = false;
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
        // referal_code: Yup.string().required('Refferal Code is Required'),
        email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),
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
  console.log('stateValue', stateValue);

  const handleLogin = async values => {
    setLoader(true);
    try {
      console.log('values', values);
      console.log('selectCountryCode', selectCountryCode);

      console.log('Phno', phoneNumber);

      let data = new FormData();
      data.append('fullname', values.fullname);
      data.append('phone_num', phoneNumber);
      data.append('email', values.email);
      data.append('state_id', stateValue?.value);
      data.append('country_id', stateValue?.country_id);
      data.append('city_id', cityValue?.value);
      data.append('lga_id', lgaValue?.value);
      data.append('street', 'street');
      data.append('password', values.password);
      data.append(
        'referal_code',
        values.referal_code ? values.referal_code : '',
      );
      data.append('image', 'test');
      // if (Platform.OS == 'ios') {
      //   data.append('image', {
      //     uri: 'file:///' + image?.path,
      //     type: image?.mime,
      //     name: 'image.jpg',
      //   });
      // } else {
      //   data.append('image', {
      //     uri: image?.uri,
      //     type: image?.type,
      //     name: 'image.jpg',
      //   });
      // }
      console.log('data==>', data);

      const result = await authService.signUp(data);
      console.log('result', result);

      if (result.status) {
        navigation.navigate(SCREENS.OTP_VERIFICATION, {
          userId: result?.data?.user_id,
          phNumber: result?.data?.email,
        });
        setLoader(false);
      } else {
        showMessage({
          message: JSON.stringify(result.message),
          type: 'warning',
          icon: 'warning',
        });
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log('error', e);
      showMessage({
        message: JSON.stringify(e?.errMsg?.message),
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  const imagePickerFromGallery = () => {
    // setImageModal(false);

    ImagePicker.openPicker({
      // width: 113,
      // height: 113,
      cropping: true,
      includeBase64: true,
      avoidEmptySpaceAroundImage: true,
      // cropperCircleOverlay: true,
      // compressImageMaxWidth: 113,
      // compressImageMaxHeight: 113,
    })
      .then(image => {
        if (Platform.OS == 'ios') {
          setImage(image);
          setShowModal(false);
        } else {
          setImage(image);
          setShowModal(false);
        }

        //   setProfile({...profile, dp: image.path});
        //   updateProfilePicture(image?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const imagePickerFromCamera = async () => {
    // setImageModal(false);

    const granted =
      Platform.OS == 'ios' ||
      (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }));
    if (granted) {
      if (!cameraIs) {
        cameraIs = true;

        let options = {
          mediaType: 'photo',
          includeBase64: true,
          quality: 0.5,
        };
        launchCamera(options, res => {
          if (res.didCancel) {
            cameraIs = false;
          } else if (res.errorMessage) {
            cameraIs = false;
          } else {
            console.log('resCam', res);

            //setImage(res.assets[0].base64);
            if (Platform.OS == 'ios') {
              setImage(res);
              setShowModal(false);
            } else {
              setImage(res?.assets[0]);
              setShowModal(false);
            }
            cameraIs = false;
          }
        });
      }
    }
  };
  console.log('image', image);
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />
      <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      />
      <EditProfileModal
        iconPress={() => setShowModal(false)}
        visible={showModal}
        onPressGallery={() => {
          setCam(false);
          imagePickerFromGallery();
        }}
        onPressPhoto={() => {
          setCam(true);
          imagePickerFromCamera();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View
            style={{
              width: '100%',

              alignItems: 'center',
            }}>
            <View style={styles.icon}>
              <Image style={styles.logo} source={Logo} />
            </View>
            <View style={{ marginTop: 80, paddingHorizontal: 25 }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: RFValue(14),
                  fontFamily: 'Rubik-Bold',
                }}>
                Create a new account
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <View style={[styles.image]}>
              <Image
                // onLoadStart={() => setProfileLoader(true)}
                // onLoadEnd={() => setProfileLoader(false)}
                source={
                  image
                    ? {
                      uri:
                        Platform.OS == 'ios' || !cam
                          ? `data:${image?.mime};base64,${image?.data}`
                          : `data:${image?.type};base64,${image?.base64}`,
                    }
                    : Images.avatar
                }
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
                  onPress={() => setShowModal(true)}
                />
              </View>
            </View>

            <View style={{ marginTop: 40, paddingHorizontal: 25 }}>
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
                        containerStyles={{ paddingHorizontal: 20 }}
                        onChange={handleChange('fullname')}
                        value={values.fullname}
                        error={touched.fullname ? errors.fullname : ''}
                        onBlur={() => setFieldTouched('fullname')}
                      />

                      <InputWithLabel
                        label={'Email'}
                        placeholder={'Eg. abc@abc.com'}
                        containerStyles={{ paddingHorizontal: 20 }}
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
                      <View style={{ height: 20 }} />
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
                                characters
                              </Text>
                            )
                          )
                        ) : (
                          phoneNumber.length < numberCondition.min && (
                            <Text style={styles.errorMessage}>
                              Must have {numberCondition.min}
                              {numberCondition.max !== numberCondition.min &&
                                -numberCondition.max}{' '}
                              characters
                            </Text>
                          )
                        ))}

                      <View style={{ height: 20 }} />

                      <InputWithLabel
                        label="Referral Code"
                        placeholder={'Eg. gzQ304MwqS '}
                        containerStyles={{ paddingHorizontal: 20 }}
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
                      <View style={{ paddingHorizontal: 20 }}>
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
                          itemTextStyle={{ color: '#000000' }}
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
                        <View style={{ paddingHorizontal: 20 }}>
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
                            itemTextStyle={{ color: '#000000' }}
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
                        <View style={{ paddingHorizontal: 20 }}>
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
                            itemTextStyle={{ color: '#000000' }}
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
                        label={'Password'}
                        placeholder={'Enter your password here'}
                        containerStyles={{ paddingHorizontal: 20 }}
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
                        containerStyles={{ paddingHorizontal: 20 }}
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
                          {({ pressed }) => (
                            <Text
                              style={[
                                {
                                  textDecorationLine: pressed
                                    ? 'underline'
                                    : 'none',
                                  color: '#4ca757',
                                  fontSize: 15,
                                  top: hp(0.32),
                                  fontFamily: 'Rubik-Bold',
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
                          { textAlign: 'center', marginTop: 10 },
                        ]}>
                        <Text>Already have an account? </Text>

                        <Pressable
                          onPress={() =>
                            navigation.navigate(SCREENS.LOGIN, {
                              privacyPolicy: false,
                              disableData: true,
                            })
                          }>
                          {({ pressed }) => (
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
