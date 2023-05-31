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
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
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
} from '../../../components';

import SCREENS from '../../../utils/constants';

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
import VendorCard from '../../../components/vendor-card';
import LabResultModal from '../../../components/lab-results-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {mainServics} from '../../../services';
import {showMessage} from 'react-native-flash-message';
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
let cameraIs = false;
export default function AddProduct({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const authContext = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [list, setList] = useState([]);
  const [showPicModal, setShowPicModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [value, setValue] = useState(null);
  const [isVisiable, setIsVisible] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [splices, setSplices] = useState();
  const [refresh, setRefreh] = useState(false);
  const [error, setError] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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

  const handleSubmit = async () => {
    try {
      setLoader(true);
      let data = new FormData();
      if (Platform.OS == 'android') {
        list?.map(ele => {
          console.log('ele', ele);
          data.append('accessories_image[]', {
            uri: ele?.uri,
            type: ele?.filetype,
            name: ele?.filename,
          });
        });
      }

      data.append('category_id', authContext?.userData?.user_id);
      data.append('accessories_name', name);
      data.append('price', price);
      data.append('description', description);
      console.log('data', data);
      const result = await mainServics.addVendorProducts(data);
      console.log('result', result);
      if (result.status) {
        showMessage({
          message: 'Product Added!',
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

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Add Product'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="New Product"
              subTitle={'Create and manage store Accessories'}
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
              onChange={txt => setName(txt)}
              placeholder={'Name of product'}
              error={error.name ? error.name : ''}
              onBlur={() => {
                !name
                  ? setError(prevState => ({
                      ...prevState,
                      name: 'Product Name is Required',
                    }))
                  : setError(prevState => ({
                      ...prevState,
                      name: '',
                    }));
              }}
            />
            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              onChange={txt => setPrice(txt)}
              placeholder={'Cost'}
              error={error.price ? error.price : ''}
              onBlur={() => {
                !price
                  ? setError(prevState => ({
                      ...prevState,
                      price: 'Product Price is Required',
                    }))
                  : setError(prevState => ({
                      ...prevState,
                      price: '',
                    }));
              }}
            />
            {/* 
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              //search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              //searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon2}
              //     color="black"
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            /> */}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View style={{marginTop: 25}}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Rubik-Bold',
                  fontSize: 16,
                }}>
                Product Photos
              </Text>
              <Text
                style={{color: '#000000', fontSize: 16, paddingVertical: 5}}>
                Upload a snapshow of your Product
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
            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              label="Description"
              onChange={txt => setDescription(txt)}
              placeholder={'eg. Contains abc '}
              error={error.description ? error.description : ''}
              onBlur={() => {
                !description
                  ? setError(prevState => ({
                      ...prevState,
                      description: 'Product Description is Required',
                    }))
                  : setError(prevState => ({
                      ...prevState,
                      description: '',
                    }));
              }}
            />
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() => handleSubmit()}
                disabled={!name || !price || !description || loader}
                title="Create Product"
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
