import React, { Component, useEffect, useMemo, useState } from 'react';
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
import { useNavigation, useTheme } from '@react-navigation/native';
import { AccountMenu } from '../../../components/ui';
import makeStyles from './styles';
import SCREENS from '../../../utils/constants';
import AuthContext from '../../../utils/auth-context';
import Images from '../../../assets/images';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NAME } from '../../../utils/regix';
import GradientButton from '../../../components/buttons/gradient-button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { mainServics, profileService } from '../../../services';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../../../redux/global/GlobalState';
import { getVendorBusinessProfileR } from '../../../redux/global/actions';
let cameraIs = false;
const VendorEditProfile = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const businessData = useSelector(
    (state: GlobalState) => state?.global?.businessProfileData,
  );
  const styles = makeStyles(colors);
  const [EditprofileLoader, setProfileLoader] = useState(false);
  const [autoLogoutCheck, setAutoLogoutCheck] = useState(false);
  const authContext = React.useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('');
  const [image, setImage] = useState();
  const [cacImage, setCacImage] = useState();
  const [lpImage, setLpImage] = useState();
  const [poaImage, setPoaImage] = useState();
  const [raImage, setRaImage] = useState();

  console.log('authContext', authContext);

  const signUpSchema = useMemo(
    () =>
      Yup.object({
        business_name: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Business Name should only contain latin letters')
          .required('Business Name is Required'),
        main_branch_store_manager_name: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Store Manger Name should only contain latin letters')
          .required('Store Manger Name is Required'),
        rc_bn_number: Yup.number().required('RC/BN is Required'),
        nin: Yup.number().required('Min Required'),
        business_phone: Yup.number().required('Phone number is Required'),
        business_email: Yup.string()
          .email('Please provide correct email')
          .required('Email is required'),

        main_branch_address: Yup.string().required('Main Address is Required'),

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
        if (type == 'cac') {
          setCacImage(image);
          setShowModal(false);
        } else if (type == 'lp') {
          setLpImage(image);
          setShowModal(false);
        } else if (type == 'poa') {
          setPoaImage(image);
          setShowModal(false);
        } else if (type == 'ra') {
          setRaImage(image);
          setShowModal(false);
        } else if (type == 'pi') {
          setImage(image);
          setShowModal(false);
        } else {
          setImage(image);
          setShowModal(false);
        }
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
      data.append('business_email', values.business_email);
      data.append('business_name', values.business_name);
      data.append('business_phone', values.business_phone);
      data.append('main_branch_address', values.main_branch_address);
      data.append('business_city', values.business_city);
      data.append(
        'main_branch_store_manager_name',
        values.main_branch_store_manager_name,
      );
      data.append('nin', values.nin);
      data.append('rc_bn_number', values.rc_bn_number);
      if (Platform.OS == 'ios') {
        image &&
          data.append('business_image', {
            uri: 'file:///' + image?.path,
            type: image?.mime,
            name: 'image.jpg',
          });
        raImage &&
          data.append('regulatory_id', {
            uri: 'file:///' + raImage?.path,
            type: raImage?.mime,
            name: 'image.jpg',
          });
        poaImage &&
          data.append('address_proof', {
            uri: 'file:///' + poaImage?.path,
            type: poaImage?.mime,
            name: 'image.jpg',
          });
        cacImage &&
          data.append('cac_certificate', {
            uri: 'file:///' + cacImage?.path,
            type: cacImage?.mime,
            name: 'image.jpg',
          });
        lpImage &&
          data.append('license_permit', {
            uri: 'file:///' + lpImage?.path,
            type: lpImage?.mime,
            name: 'image.jpg',
          });
      } else {
        image &&
          data.append('business_image', {
            uri: image?.path,
            type: image?.mime,
            name: 'image.jpg',
          });
        raImage &&
          data.append('regulatory_id', {
            uri: raImage?.path,
            type: raImage?.mime,
            name: 'image.jpg',
          });
        poaImage &&
          data.append('address_proof', {
            uri: poaImage?.path,
            type: poaImage?.mime,
            name: 'image.jpg',
          });
        cacImage &&
          data.append('cac_certificate', {
            uri: cacImage?.path,
            type: cacImage?.mime,
            name: 'image.jpg',
          });
        lpImage &&
          data.append('license_permit', {
            uri: lpImage?.path,
            type: lpImage?.mime,
            name: 'image.jpg',
          });
      }
      console.log('formData', data);

      const result = await mainServics.updateVendorBusinessProfile(data);
      console.log('result', result);
      if (result?.status) {
        dispatch(getVendorBusinessProfileR());
        showMessage({
          message: result?.message,
          type: 'success',
          icon: 'success',
        });
        setLoader(false);
        navigation.goBack();
      } else {
        setLoader(false);
        showMessage({
          message: 'Some Thing Happing Wrong',
          type: 'warning',
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

  const handleDeleteUser = async () => {

    try {

      const response = await mainServics.deleteuser({ user_id: authContext?.userData?.user_id });

      if (response) {
        authContext.signOut();
      }

    } catch (e) {
      console.log('error', e);
    }

  }

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
        iconPress={() => {
          setType('pi');
          setShowModal(false);
        }}
        visible={showModal}
        onPressGallery={() => imagePickerFromGallery()}
        onPressPhoto={() => imagePickerFromCamera()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.contentView}>
            <View style={[styles.image]}>
              <Image
                onLoadStart={() => setProfileLoader(true)}
                onLoadEnd={() => setProfileLoader(false)}
                source={{
                  uri: image
                    ? `data:${image?.mime};base64,${image?.data}`
                    : businessData?.business_image_url,
                }}
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
            <View style={{ marginTop: 40 }}>
              <Formik
                initialValues={{
                  business_name: businessData?.business_name
                    ? businessData?.business_name
                    : '',
                  business_phone: businessData?.business_phone
                    ? businessData?.business_phone
                    : '',
                  business_email: businessData?.business_email
                    ? businessData?.business_email
                    : '',
                  main_branch_store_manager_name:
                    businessData?.main_branch_store_manager_name
                      ? businessData?.main_branch_store_manager_name
                      : '',
                  main_branch_address: businessData?.main_branch_address
                    ? businessData?.main_branch_address
                    : '',
                  business_city: businessData?.business_city
                    ? businessData?.business_city
                    : '',
                  nin: businessData?.nin ? businessData?.nin : '',
                  rc_bn_number: businessData?.rc_bn_number
                    ? businessData?.rc_bn_number
                    : '',
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
                    <View style={{ alignItems: 'center' }}>
                      <InputWithLabel
                        label="Business Name"
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        styleInput={{ fontSize: 11 }}
                        placeholder={'Eg. Holi Gas and Accessories'}
                        //  containerStyles={{paddingHorizontal: 20}}
                        onChange={handleChange('business_name')}
                        value={values.business_name}
                        error={
                          touched.business_name ? errors.business_name : ''
                        }
                        onBlur={() => setFieldTouched('business_name')}
                      />
                      <View style={{ height: 7 }} />
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
                          styleInput={{ fontSize: 11 }}
                          placeholder={'Eg. Ahmed Peter Hassan'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 8,
                          }}
                          onChange={handleChange(
                            'main_branch_store_manager_name',
                          )}
                          value={values.main_branch_store_manager_name}
                          error={
                            touched.main_branch_store_manager_name
                              ? errors.main_branch_store_manager_name
                              : ''
                          }
                          onBlur={() =>
                            setFieldTouched('main_branch_store_manager_name')
                          }
                        />
                        <InputWithLabel
                          label="RC/BN Number"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{ fontSize: 11 }}
                          placeholder={'Eg. 1700056'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 10,
                          }}
                          onChange={handleChange('rc_bn_number')}
                          value={values.rc_bn_number}
                          error={
                            touched.rc_bn_number ? errors.rc_bn_number : ''
                          }
                          onBlur={() => setFieldTouched('rc_bn_number')}
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
                          label="NIN"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{ fontSize: 11 }}
                          placeholder={'Eg. 43535434634'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 8,
                          }}
                          onChange={handleChange('nin')}
                          value={values.nin}
                          error={touched.nin ? errors.nin : ''}
                          onBlur={() => setFieldTouched('nin')}
                        />
                        <InputWithLabel
                          label="Business Phone"
                          labelStyle={{
                            // fontFamily: fonts.mulishSemiBold,
                            color: colors.yellowHeading,
                            fontSize: 12,
                          }}
                          styleInput={{ fontSize: 11 }}
                          placeholder={'Eg. 036434634'}
                          containerStyles={{
                            width: Dimensions.get('window').width * 0.44,
                            marginLeft: 10,
                          }}
                          onChange={handleChange('business_phone')}
                          value={values.business_phone}
                          error={
                            touched.business_phone ? errors.business_phone : ''
                          }
                          onBlur={() => setFieldTouched('business_phone')}
                        />
                      </View>

                      <View style={{ height: 7 }} />
                      <InputWithLabel
                        label={'Email'}
                        placeholder={'Eg. abc@abc.com'}
                        //  containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          //   fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        styleInput={{ fontSize: 11 }}
                        onChange={handleChange('business_email')}
                        value={values.business_email}
                        error={
                          touched.business_email ? errors.business_email : ''
                        }
                        onBlur={() => setFieldTouched('business_email')}
                      />
                      <View style={{ height: 7 }} />

                      <InputWithLabel
                        label="Main Branch Address"
                        placeholder={'Eg. 600 Main Street, garki'}
                        styleInput={{ fontSize: 11 }}
                        //  containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        onChange={handleChange('main_branch_address')}
                        value={values.main_branch_address}
                        error={
                          touched.main_branch_address
                            ? errors.main_branch_address
                            : ''
                        }
                        onBlur={() => setFieldTouched('main_branch_address')}
                      />
                      <InputWithLabel
                        label="Business City"
                        placeholder={'Lagos'}
                        styleInput={{ fontSize: 11 }}
                        //  containerStyles={{paddingHorizontal: 20}}
                        labelStyle={{
                          // fontFamily: fonts.mulishSemiBold,
                          color: colors.yellowHeading,
                          fontSize: 12,
                        }}
                        onChange={handleChange('business_city')}
                        value={values.business_city}
                        error={
                          touched.business_city
                            ? errors.business_city
                            : ''
                        }
                        onBlur={() => setFieldTouched('business_city')}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',

                          width: '85%',
                        }}>
                        <Pressable
                          onPress={() => {
                            setType('cac');
                            setShowModal(true);
                          }}>
                          {cacImage || businessData?.cac_certificate_url ? (
                            <Image
                              style={styles.imageView}
                              source={{
                                uri: cacImage
                                  ? `data:${cacImage?.mime};base64,${cacImage?.data}`
                                  : businessData?.cac_certificate_url,
                              }}
                            />
                          ) : (
                            <View style={styles.imageView}>
                              <Feather color={'#fff'} name="plus" size={35} />
                            </View>
                          )}

                          <Text style={styles.imageViewText}>CAC</Text>
                          <Text style={styles.imageViewText}>Document</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setType('lp');
                            setShowModal(true);
                          }}>
                          {lpImage || businessData?.license_permit_url ? (
                            <Image
                              style={styles.imageView}
                              source={{
                                uri: lpImage
                                  ? `data:${lpImage?.mime};base64,${lpImage?.data}`
                                  : businessData?.license_permit_url,
                              }}
                            />
                          ) : (
                            <View style={styles.imageView}>
                              <Feather color={'#fff'} name="plus" size={35} />
                            </View>
                          )}
                          <Text style={styles.imageViewText}>Licence</Text>
                          <Text style={styles.imageViewText}>Permit</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setType('poa');
                            setShowModal(true);
                          }}>
                          {poaImage || businessData?.address_proof_url ? (
                            <Image
                              style={styles.imageView}
                              source={{
                                uri: poaImage
                                  ? `data:${poaImage?.mime};base64,${poaImage?.data}`
                                  : businessData?.address_proof_url,
                              }}
                            />
                          ) : (
                            <View style={styles.imageView}>
                              <Feather color={'#fff'} name="plus" size={35} />
                            </View>
                          )}
                          <Text style={styles.imageViewText}>Proof of</Text>
                          <Text style={styles.imageViewText}>Address</Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setType('ra');
                            setShowModal(true);
                          }}>
                          {raImage || businessData?.regulatory_id_url ? (
                            <Image
                              style={styles.imageView}
                              source={{
                                uri: raImage
                                  ? `data:${raImage?.mime};base64,${raImage?.data}`
                                  : businessData?.regulatory_id_url,
                              }}
                            />
                          ) : (
                            <View style={styles.imageView}>
                              <Feather color={'#fff'} name="plus" size={35} />
                            </View>
                          )}
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
                      <GradientButton
                        onPress={() => handleDeleteUser()}
                        disabled={!isValid}
                        title="Delete"
                        btnColor={"red"}
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
