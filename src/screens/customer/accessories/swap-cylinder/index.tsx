/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
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
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
} from '../../../../components';

import SCREENS from '../../../../utils/constants';

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
import AuthContext from '../../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../../components/buttons/gradient-button';
import HeaderBottom from '../../../../components/header-bottom';
import VendorCard from '../../../../components/vendor-card';
import LabResultModal from '../../../../components/lab-results-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';
import {mainServics} from '../../../../services';
import Geolocation from '@react-native-community/geolocation';
import {getAddress} from '../../../../utils/functions/get-address';
let cameraIs = false;
export default function SwapCylinder({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const auth = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [list, setList] = useState([]);
  const [showPicModal, setShowPicModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const [splices, setSplices] = useState();
  const [refresh, setRefreh] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [myDirection, setMyDirection] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'New Cylinder',
      value: 'new',
      borderColor: '#4ca757',
      selected: true,
    },
    {
      id: '2',
      label: 'Fairly Used',
      value: 'fairly',
      borderColor: '#4ca757',
    },
  ]);
  let sizeCylinders = [
    {id: 1, size: 6},
    {id: 2, size: 12},
    {id: 3, size: 25},
    {id: 4, size: 50},
  ];
  const [sizeSelected, setSizeSelected] = useState(sizeCylinders[0]);
  function onPressRadioButton(radioButtonsArray: RadioButtonProps[]) {
    setRadioButtons(radioButtonsArray);
  }
  const imagePickerFromGallery = async () => {
    try {
      setIsVisible(true);
      let options = {
        mediaType: 'photo',
        selectionLimit: 40,
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      };
      launchImageLibrary(options, res => {
        console.log('res==>', res);

        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let data = [...list];
          res?.assets?.forEach(asset => {
            console.log('asset', asset);
            data.push({
              filename: asset?.fileName,
              uri: asset?.uri,
              base64:
                'data:' + asset?.type + ';' + 'base64' + ',' + asset?.base64,
              filetype: asset?.type,
            });
          });

          // data.push(body);
          setList(data);
          setShowModal(!showModal);
        }
      });
    } catch (err) {
      setIsVisible(false);
      console.warn(err);
    }
  };

  const permissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'App Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let options = {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
      };
      launchCamera(options, res => {
        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let body = {
            filename: res?.assets[0]?.fileName,
            uri: res?.assets[0]?.uri,
            base64:
              'data:' +
              res?.assets[0]?.type +
              ';' +
              'base64' +
              ',' +
              res?.assets[0]?.base64,
            filetype: res?.assets[0]?.type,
          };
          let data = list;
          data.push(body);
          setList(data);
          setShowModal(false);
        }
      });
    } else {
      setIsVisible(false);
    }
  };

  const permissionIos = async () => {
    setIsVisible(false);
    const res = await check(PERMISSIONS.IOS.CAMERA);
    console.log('per', res);

    if (res === 'granted') {
      let options = {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
      };
      launchCamera(options, res => {
        if (res.didCancel) {
          setIsVisible(false);
        } else if (res.errorMessage) {
          setIsVisible(false);
        } else {
          setIsVisible(false);
          let body = {
            filename: res?.assets[0]?.fileName,
            uri: res?.assets[0]?.uri,
            base64:
              'data:' +
              res?.assets[0]?.type +
              ';' +
              'base64' +
              ',' +
              res?.assets[0]?.base64,
            filetype: res?.assets[0]?.type,
          };
          let data = list;
          data.push(body);
          setList(data);
          setShowModal(false);
        }
      });
    } else if (res === 'denied') {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      res2 === 'granted' ? permissionIos() : setIsVisible(false);
    }
  };

  const imagePickerFromCamera = async () => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    try {
      setIsVisible(true);

      if (Platform.OS === 'android') {
        permissionAndroid();
      } else {
        permissionIos();
      }
    } catch (err) {
      setIsVisible(false);
      console.warn(err);
    }
  };

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

  const getOneTimeLocation = () => {
    console.log('Getting Location ... ');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async position => {
        console.log('currentLongitude', position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setMyDirection({
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
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
        setIsLoading(false);
        // console.log('currentLatitude ', currentLatitude)
        // console.log('currentLongitude ', currentLongitude)
        // let tempCoords = {
        //     latitude: Number(position.coords.latitude),
        //     longitude: Number(position.coords.longitude)
        // }
        // if (MapRef.current && MapRef.current.animateCamera) {
        //     MapRef.current.animateCamera({ center: tempCoords, pitch: 2, heading: 20, altitude: 200, zoom: 5 }, 1000)
        // }
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
  console.log('list', list);
  console.log('direction', myDirection);

  const handleSubmitted = async () => {
    setIsLoading(true);
    console.log('myDir', myDirection);
    // console.log('list', list[0]?.base64);
    let rdId = '';
    radioButtons.map(ele => {
      console.log('ele', ele);
      if (ele?.selected) {
        rdId = ele.id;
      }
    });
    console.log('rdId', rdId);
    try {
      let data = new FormData();

      data.append('latitude', myDirection.latitude);
      data.append('longitude', myDirection.longitude);
      data.append('address', userAddress);

      // data.append('latitude', 24.817556456461972);
      // data.append('longitude', 67.0560846850276);
      data.append('size_of_cylinder', sizeSelected.size);
      data.append('swap_type', rdId);
      // data.append('cylinder_img_1', {
      //   uri: list[0]?.uri,
      //   type: list[0]?.filetype,
      //   name: list[0]?.filename,
      // });
      // data.append('cylinder_img_2', {
      //   uri: list[1]?.uri,
      //   type: list[1]?.filetype,
      //   name: list[1]?.filename,
      // });
      // data.append('cylinder_img_3', {
      //   uri: list[2]?.uri,
      //   type: list[2]?.filetype,
      //   name: list[2]?.filename,
      // });
      // data.append('cylinder_img_4', {
      //   uri: list[3]?.uri,
      //   type: list[3]?.filetype,
      //   name: list[3]?.filename,
      // });
      console.log('formData', data);

      // data.append('cylinder_img_1', list[0]?.base64 ? list[0]?.base64 : '');
      // data.append('cylinder_img_2', list[1]?.base64 ? list[1]?.base64 : '');
      // data.append('cylinder_img_3', list[2]?.base64 ? list[2]?.base64 : '');
      // data.append('cylinder_img_4', list[3]?.base64 ? list[3]?.base64 : '');

      const resData = await mainServics.swapCylinder(data);
      console.log('resData', resData);
      if (resData?.message === 'Swap Cylinder Added') {
        fetchData();
      } else {
        setIsLoading(false);
        showMessage({
          message: JSON.stringify(resData),
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (e) {
      setIsLoading(false);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('e', e);
    }
  };
  const fetchData = async () => {
    try {
      let data = new FormData();

      // data.append('latitude', myDirection.latitude);
      // data.append('longitude', myDirection.longitude);
      data.append('latitude', 24.817556456461972);
      data.append('longitude', 67.0560846850276);
      data.append('userid', 33);
      data.append('size_of_cylinder', sizeSelected.size);
      console.log('data', data);

      const resData = await mainServics.nearByGasAgencyAsPerRequiredSize(data);
      console.log('resDataFetch', resData);
      if (resData?.message === 'Near By Gas Agencies Found') {
        setIsLoading(false);
        let item = {
          user_id: auth?.userData?.user_id,
          // latitude: myDirection.latitude,
          // longitude: myDirection.longitude,
          latitude: 24.817556456461972,
          longitude: 67.0560846850276,
          faddress: userAddress,
          city: city,
          postal: postal ? postal : '000000',
          state: state,
        };
        navigation.navigate(SCREENS.CONNECT_VENDOR_SWAP, {
          data: resData?.responsedata,
          item: item,
        });
      } else if (resData?.message === 'No Agencies Available Near By You') {
        setIsLoading(false);
        showMessage({
          message: resData?.message,
          type: 'warning',
          icon: 'warning',
        });
      }
    } catch (e) {
      setIsLoading(false);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('e', e);
    }
  };
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Swap'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Swap Cylinder"
              subTitle={'New order to swap cylinder'}
              contentStyle={{marginTop: 50}}
              rightIcon={
                <View
                  style={{
                    backgroundColor: '#2f65a2',
                    height: 30,
                    borderRadius: 5,
                  }}>
                  <MaterialCommunityIcons name="sort" size={30} color="#fff" />
                </View>
              }
            />
            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              onChange={txt => setUserAddress(txt)}
              placeholder={'Set pickup address'}
              value={userAddress}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <Text
              style={{width: '100%', textAlign: 'right', color: '#ecb241'}}
              onPress={() => getOneTimeLocation()}>
              use current location
            </Text>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Rubik-Bold',
                  fontSize: 16,
                }}>
                Swap Type
              </Text>
              <RadioGroup radioButtons={radioButtons} layout={'row'} />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View style={{height: 20}} />
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Rubik-Bold',
                fontSize: 16,
              }}>
              Size of cylinder
            </Text>
            <Text style={{color: '#000000', fontSize: 16, paddingVertical: 5}}>
              Select size of your cylinder
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {sizeCylinders.map(ele => (
                <Text
                  style={[
                    styles.tagText,
                    ele.id == sizeSelected.id && {
                      backgroundColor: '#4ca757',
                      color: '#fff',
                    },
                  ]}
                  onPress={() => setSizeSelected(ele)}>
                  {ele.size}KG
                </Text>
              ))}
            </View>
            <View style={{marginTop: 25}}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Rubik-Bold',
                  fontSize: 16,
                }}>
                Upload
              </Text>
              <Text
                style={{color: '#000000', fontSize: 16, paddingVertical: 5}}>
                Upload a snapshow of your cylinder
              </Text>

              <View>
                <FlatList
                  data={[...list, {id: 'add-new'}]}
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  extraData={refresh}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => {
                    if (item.id == 'add-new') {
                      return (
                        <Pressable
                          style={styles.imageView}
                          onPress={() => setShowModal(true)}>
                          <Feather color={'#fff'} name="plus" size={35} />
                        </Pressable>
                      );
                    }
                    setSplices(index);

                    return (
                      <Pressable
                        onPress={() => {
                          setShowPicModal(true);
                          setModalData(item);
                        }}>
                        <ImageBackground
                          imageStyle={{
                            borderRadius: 8,
                            backgroundColor: 'yellow',
                          }}
                          source={{uri: item?.uri}}
                          style={styles.imageView2}>
                          {console.log('item?.uri', item?.uri)}
                          <MaterialCommunityIcons
                            name="delete"
                            color={colors.primary}
                            size={25}
                            style={styles.deleteIcon}
                            onPress={() => {
                              list.splice(splices, 1);
                              setRefreh(!refresh);
                            }}
                          />
                        </ImageBackground>
                      </Pressable>
                    );
                  }}
                />
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() => handleSubmitted()}
                // disabled={!isValid || loader || !checked}
                title="Countinue"
              />
            </View>
          </View>
          <LabResultModal
            visible={showModal}
            title={'Upload Photos'}
            closeModal={() => setShowModal(!showModal)}
            onTakePhoto={() => imagePickerFromCamera()}
            onUploadFromGallery={() => imagePickerFromGallery()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
