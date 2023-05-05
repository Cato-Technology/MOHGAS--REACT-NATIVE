import React, {Component, useMemo, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

import {
  ActivityIndicator,
  EditProfileModal,
  Header,
  InputWithLabel,
  PhoneNumber,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
//import TopTabButton from '../../../../../components/top-tab-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
import {AccountMenu} from '../../../components/ui';
import makeStyles from './styles';
import SCREENS from '../../../utils/constants';
import AuthContext from '../../../utils/auth-context';
import Images from '../../../assets/images';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {NAME} from '../../../utils/regix';
import GradientButton from '../../../components/buttons/gradient-button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {profileService} from '../../../services';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
let cameraIs = false;
const VendorEditProfile = () => {
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
  const [image, setImage] = useState('');

  console.log('uuser', authContext);

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
      .then(image => {
        let img = `data:${image.mime};base64,${image.data}`;
        setImage(img);
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
            let img = `data:${image[0].mime};base64,${image[0].base64}`;
            setImage(img);
            setShowModal(false);
            cameraIs = false;
          }
        });
      }
    }
  };
  const handleUpdateUser = async values => {
    try {
      setLoader(true);
      let data = new FormData();
      data.append('user_id', authContext?.userData?.user_id);
      if (image) {
        data.append('image', image);
      }

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

      if (result?.status == '0') {
        setLoader(false);
        showMessage({
          message: result?.message,
          type: 'danger',
          icon: 'warning',
        });
      }
      if (result?.message == 'Profile Updated Successfully') {
        try {
          let dataUpdate = new FormData();
          dataUpdate.append('user_id', authContext?.userData?.user_id);
          const resultUpdate = await profileService.getProfile(dataUpdate);
          console.log('resultUpdate', resultUpdate);
          if (resultUpdate?.message == 'User Details Received') {
            const updatedUserData = {
              ...authContext?.userData,
              image: resultUpdate?.responsedata.image,
              type: resultUpdate?.responsedata.type,
              full_name: resultUpdate?.responsedata.full_name,
              email: resultUpdate?.responsedata.email,
              phone_no: resultUpdate?.responsedata.phone_no,
              street_name: resultUpdate?.responsedata.street_name,
              province: resultUpdate?.responsedata.province,
              city: resultUpdate?.responsedata.city,
              lga: resultUpdate?.responsedata.lga,
              referal_code: resultUpdate?.responsedata.referal_code,
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
      }
    } catch (e) {
      setLoader(false);
      console.log('error', e);
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
        title={'Edit Profile'}
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
                        uri: image,
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
            <View style={{marginTop: 40}}>
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
                    <View style={{alignItems: 'center'}}>
                      <InputWithLabel
                        label="Business Name"
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        styleInput={{fontSize: 11}}
                        placeholder={'Eg. Holi Gas and Accessories'}
                        //  containerStyles={{paddingHorizontal: 20}}
                        onChange={handleChange('fullname')}
                        value={values.fullname}
                        error={touched.fullname ? errors.fullname : ''}
                        onBlur={() => setFieldTouched('fullname')}
                      />
                      <View style={{height: 7}} />
                      <View
                        style={{
                          flexDirection: 'row',
                          //justifyContent: 'space-between',
                          width: Dimensions.get('window').width * 0.94,
                          alignItems: 'center',
                        }}>
                        <InputWithLabel
                          label="Store Manger"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{fontSize: 11}}
                          placeholder={'Eg. Ahmed Peter Hassan'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 8,
                          }}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                        <InputWithLabel
                          label="RC/BN Number"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{fontSize: 11}}
                          placeholder={'Eg. 1700056'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 10,
                          }}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          //justifyContent: 'space-between',
                          width: Dimensions.get('window').width * 0.94,
                          alignItems: 'center',
                        }}>
                        <InputWithLabel
                          label="MiN"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{fontSize: 11}}
                          placeholder={'Eg. 43535434634'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 8,
                          }}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                        <InputWithLabel
                          label="Primary Contact"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{fontSize: 11}}
                          placeholder={'Eg. 036434634'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 10,
                          }}
                          onChange={handleChange('fullname')}
                          value={values.fullname}
                          error={touched.fullname ? errors.fullname : ''}
                          onBlur={() => setFieldTouched('fullname')}
                        />
                      </View>

                      <View style={{height: 7}} />
                      <InputWithLabel
                        label={'Email'}
                        placeholder={'Eg. abc@abc.com'}
                        //  containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          //   fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        styleInput={{fontSize: 11}}
                        onChange={handleChange('email')}
                        value={values.email}
                        error={touched.email ? errors.email : ''}
                        onBlur={() => setFieldTouched('email')}
                      />
                      <View style={{height: 7}} />

                      <InputWithLabel
                        label="Main Branch Address"
                        placeholder={'Eg. 600 Main Street, garki'}
                        styleInput={{fontSize: 11}}
                        //  containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        onChange={handleChange('street_name')}
                        value={values.street_name}
                        error={touched.street_name ? errors.street_name : ''}
                        onBlur={() => setFieldTouched('street_name')}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          width: '85%',
                        }}>
                        <Pressable onPress={() => setShowModal(true)}>
                          <View style={styles.imageView}>
                            <Feather color={'#fff'} name="plus" size={35} />
                          </View>

                          <Text style={styles.imageViewText}>CAC</Text>
                          <Text style={styles.imageViewText}>Document</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowModal(true)}>
                          <View style={styles.imageView}>
                            <Feather color={'#fff'} name="plus" size={35} />
                          </View>

                          <Text style={styles.imageViewText}>Licence</Text>
                          <Text style={styles.imageViewText}>Permit</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowModal(true)}>
                          <View style={styles.imageView}>
                            <Feather color={'#fff'} name="plus" size={35} />
                          </View>

                          <Text style={styles.imageViewText}>Proof of</Text>
                          <Text style={styles.imageViewText}>Address</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowModal(true)}>
                          <View style={styles.imageView}>
                            <Feather color={'#fff'} name="plus" size={35} />
                          </View>

                          <Text style={styles.imageViewText}>Regulatory</Text>
                          <Text style={styles.imageViewText}>Address</Text>
                        </Pressable>
                      </View>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: widthPercentageToDP(8),
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
export default VendorEditProfile;
