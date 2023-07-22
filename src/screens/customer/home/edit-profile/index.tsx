import React, {Component, useEffect, useMemo, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {
  ActivityIndicator,
  DatePickerModal,
  EditProfileModal,
  Header,
  InputWithLabel,
  PhoneNumber,
} from '../../../../components';
//import TopTabButton from '../../../../../../components/top-tab-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AccountMenu} from '../../../../components/ui';
import makeStyles from './styles';
import SCREENS from '../../../../utils/constants';
import AuthContext from '../../../../utils/auth-context';
import Images from '../../../../assets/images';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {NAME} from '../../../../utils/regix';
import GradientButton from '../../../../components/buttons/gradient-button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {profileService} from '../../../../services';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
let cameraIs = false;
const EditProfile = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const styles = makeStyles(colors);
  const [EditprofileLoader, setProfileLoader] = React.useState(false);
  const [autoLogoutCheck, setAutoLogoutCheck] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [image, setImage] = useState({});
  const [date, setDate] = useState(new Date('1990-01-01'));
  const [isPickerShow, setIsPickerShow] = useState(false);
  console.log('uuser', authContext?.userData?.dateOfBirth);
  console.log('date', date);

  useEffect(() => {
    if (authContext?.userData?.dateOfBirth) {
      setDate(new Date(authContext?.userData?.dateOfBirth));
    }
  }, []);

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        fullname: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Name should only contain latin letters')
          .required('Full name is Required'),

        phone_no: Yup.number().required('Phone number is Required'),
        street_name: Yup.string().required('Street Address Required'),
        state: Yup.string().required('State is Required'),
        city: Yup.string().required('City is Required'),
        email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),
        // .required('Email is required'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
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
      .then(res => {
        console.log('resresG', res);
        setImage({
          name: res?.modificationDate,
          uri: res?.path,
          type: res?.mime,
          base64: res?.data,
        });
        setShowModal(false);
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
            //setImage(res.assets[0].base64);
            console.log('resImage', res);
            // setImage(res?.assets[0]);
            //  setImage(...image.name)

            setImage({
              name: res?.assets[0]?.fileName,
              uri: res?.assets[0]?.uri,
              type: res?.assets[0]?.type,
              base64: res?.assets[0]?.base64,
            });

            setShowModal(false);
            cameraIs = false;
          }
        });
      }
    }
  };
  console.log('image', image);

  const handleUpdateUser = async values => {
    try {
      // setLoader(true);
      let data = new FormData();
      if (Platform.OS == 'android') {
        data.append('image', {
          uri: image?.uri,
          type: image?.type,
          name: 'image.jpg',
        });
      } else {
        data.append('image', {
          uri: 'file:///' + image?.uri,
          type: image?.type,
          name: 'image.jpg',
        });
      }

      data.append('dateOfBirth', moment(date).format('YYYY-MM-DD'));
      data.append('fullname', values.fullname);
      data.append('phone_no', values.phone_no);
      data.append('email', values.email);
      data.append('street_name', values.street_name);
      data.append('lga', 'abc');
      data.append('state', values.state);
      data.append('city', values.city);

      console.log('data==>', data);

      const result = await profileService.updateProfile(data);
      console.log('result', result);

      if (result?.status) {
        try {
          let dataUpdate = new FormData();
          dataUpdate.append('user_id', authContext?.userData?.user_id);
          const resultUpdate = await profileService.getProfile(dataUpdate);
          console.log('resultUpdate', resultUpdate);
          if (resultUpdate) {
            const updatedUserData = {
              ...authContext?.userData,
              ...resultUpdate?.response,
            };
            console.log('updatedUserData', updatedUserData);

            try {
              const jsonValue = JSON.stringify(updatedUserData);
              await AsyncStorage.setItem('userData', jsonValue);
            } catch (e) {
              console.error('Failed to save user data to storage');
            }

            authContext.setUserData(updatedUserData);
            setLoader(false);
            navigation.goBack();
          }
        } catch (e) {
          setLoader(false);
          console.log('error', e);
        }
      } else {
        setLoader(false);
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
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ActivityIndicator visible={loader} />
      <Header
        title={'Profile'}
        back={true}
        rightIcon={<AntDesign name="setting" size={25} color={colors.text} />}
      />
      <EditProfileModal
        iconPress={() => setShowModal(false)}
        visible={showModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
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
                source={
                  image
                    ? {
                        uri: image?.uri,
                      }
                    : !authContext?.userData?.image
                    ? authContext?.userData?.gender == 'Female'
                      ? Images.femaleAvatar
                      : Images.avatar
                    : {uri: authContext?.userData?.image}
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
            <View style={{marginTop: 40, paddingHorizontal: 25}}>
              <Formik
                initialValues={{
                  fullname: authContext?.userData?.full_name,
                  email: authContext?.userData?.email,
                  phone_no: authContext?.userData?.phone_no,
                  street_name: authContext?.userData?.street_name,
                  state: authContext?.userData?.state,
                  city: authContext?.userData?.city,
                }}
                onSubmit={values => handleUpdateUser(values)}
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
                    <View style={{width: '90%'}}>
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
                      <Text style={styles.inputLablel}>Date of Birth</Text>
                      <View style={{paddingHorizontal: 20}}>
                        <DatePickerModal
                          isPickerShow={isPickerShow}
                          setIsPickerShow={setIsPickerShow}
                          date={date}
                          setDate={setDate}
                          maximumDate={new Date()}
                          minimumDate={new Date('jan-01-1922')}
                        />
                      </View>
                      <View style={{height: 20}} />
                      <InputWithLabel
                        label={'Phone number'}
                        placeholder={'Eg. 564564565'}
                        containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          //   fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 15,
                        }}
                        onChange={handleChange('phone_no')}
                        value={values.phone_no}
                        error={touched.phone_no ? errors.phone_no : ''}
                        onBlur={() => setFieldTouched('phone_no')}
                      />
                      <View style={{height: 20}} />
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
                        label="Street Address"
                        placeholder={'Eg. Street 1'}
                        containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 15,
                        }}
                        onChange={handleChange('street_name')}
                        value={values.street_name}
                        error={touched.street_name ? errors.street_name : ''}
                        onBlur={() => setFieldTouched('street_name')}
                      />
                      <InputWithLabel
                        label="State"
                        placeholder={'Eg.Nigeria'}
                        containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 15,
                        }}
                        onChange={handleChange('state')}
                        value={values.state}
                        error={touched.state ? errors.state : ''}
                        onBlur={() => setFieldTouched('state')}
                      />
                      <InputWithLabel
                        label="City"
                        placeholder={'Eg.Islamabad'}
                        containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 15,
                        }}
                        onChange={handleChange('city')}
                        value={values.city}
                        error={touched.city ? errors.city : ''}
                        onBlur={() => setFieldTouched('city')}
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
                        disabled={!isValid}
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
