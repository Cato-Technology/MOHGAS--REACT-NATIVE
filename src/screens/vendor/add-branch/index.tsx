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
  PermissionsAndroid,
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
import Geolocation from '@react-native-community/geolocation';
import {getAddress} from '../../../utils/functions/get-address';
import {Dropdown} from 'react-native-element-dropdown';
export default function AddBranch({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [state, setState] = useState();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
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
        city_id: Yup.string().required('City is Required'),
        state_id: Yup.string().required('State is Required'),
        branch_store_manager_name: Yup.string().required(
          'Branch Manger Name is Required',
        ),
        branch_phone: Yup.string().required('Branch Phone is Required'),
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
  const [isLoading, setIsLoading] = useState(true);

  const [myDirection, setMyDirection] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            console.log('permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    setTimeout(() => {
      requestLocationPermission();
    }, 1000);
  }, [navigation]);
  console.log('myDir', myDirection);

  const getOneTimeLocation = () => {
    console.log('Getting Location ... ');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async position => {
        console.log('currentLongitude', position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setIsLoading(false);
        setMyDirection({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        const addressString = await getAddress(
          position.coords.latitude,
          position.coords.longitude,
        );
        console.log('addressString', addressString);

        setUserAddress(addressString?.address);
        setCity(addressString?.city);
        setPostal(addressString?.zipCode);
        setState(addressString?.state);
      },
      error => {
        setIsLoading(false);
        console.log('error ', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const handleSubmitted = async values => {
    console.log('values', values);

    setIsLoading(true);
    try {
      let data = new FormData();
      data.append('branch_name', values?.branch_name);
      data.append('branch_email', values?.branch_email);
      data.append('branch_user_id', auth?.userData?.user_id);
      data.append('address', values?.address);
      data.append('latitude', myDirection.latitude);
      data.append('longitude', myDirection.longitude);
      data.append('state_id', values?.state_id);
      data.append('city_id', values?.city_id);
      data.append('branch_phone', values?.branch_phone);
      data.append(
        'branch_store_manager_name',
        values?.branch_store_manager_name,
      );

      data.append('password', values?.password);
      console.log('data', data);

      const result = await mainServics.addBranch(data);
      console.log('result', result);
      if (result.status) {
        showMessage({
          message: 'Branch Added!',
          type: 'success',
          icon: 'success',
        });
        navigation.goBack();
        setIsLoading(false);
      } else {
        showMessage({
          message: result.message,
          type: 'warning',
          icon: 'warning',
        });
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log('error', e);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'warning',
      });
    }
  };
  useEffect(() => {
    getStateData();
  }, [setStateData]);
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
          setStateData(arr);
        });
        getCitiesData(arr[0].value);
        console.log('arr', arr);
      }
    } catch (e) {
      console.log('eer', e);
    }
  };
  const getCitiesData = async id => {
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
          setCityData(arr);
        });
        console.log('arr', arr);
      }
    } catch (e) {
      console.log('eer', e);
    }
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
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
                    branch_store_manager_name: '',
                    branch_phone: '',
                    state_id: '',
                    city_id: '',
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
                      {console.log('stateData[0]?.value', stateData[0]?.value)}
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
                        <InputWithLabel
                          label="Store Manger"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 15,
                          }}
                          placeholder={'Eg. Ali Khan'}
                          containerStyles={{paddingHorizontal: 20}}
                          onChange={handleChange('branch_store_manager_name')}
                          value={values.branch_store_manager_name}
                          error={
                            touched.branch_store_manager_name
                              ? errors.branch_store_manager_name
                              : ''
                          }
                          onBlur={() =>
                            setFieldTouched('branch_store_manager_name')
                          }
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
                          onChange={handleChange('branch_phone')}
                          value={values.branch_phone}
                          error={
                            touched.branch_phone ? errors.branch_phone : ''
                          }
                          onBlur={() => setFieldTouched('branch_phone')}
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
                        <View style={{paddingHorizontal: 20}}>
                          <Text
                            style={{
                              fontFamily: 'Rubik-Regular',
                              color: '#000000',
                              fontSize: 15,
                              marginTop: 5,
                            }}>
                            Select State
                          </Text>
                          {console.log('state_id', values)}
                          <Dropdown
                            style={styles.dropdown}
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
                            value={values.state_id}
                            onChange={item => {
                              setFieldValue('state_id', item.value);
                              getCitiesData(item.value);
                            }}
                            // renderLeftIcon={() => (
                            //   <AntDesign
                            //     style={styles.icon2}
                            //       color="black"
                            //     name="Safety"
                            //     size={20}
                            //   />
                            // )}
                          />
                        </View>

                        <View style={{paddingHorizontal: 20}}>
                          <Text
                            style={{
                              fontFamily: 'Rubik-Regular',
                              color: '#000000',
                              fontSize: 15,
                              marginTop: 5,
                            }}>
                            Select City
                          </Text>
                          <Dropdown
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
                            value={values.city_id}
                            onChange={item => {
                              setFieldValue('city_id', item.value);
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
