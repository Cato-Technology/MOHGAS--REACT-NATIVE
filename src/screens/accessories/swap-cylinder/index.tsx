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
import ImagePicker from 'react-native-image-crop-picker';
let cameraIs = false;
export default function SwapCylinder({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const authContext = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [list, setList] = useState([]);
  const [showPicModal, setShowPicModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const [splices, setSplices] = useState();
  const [refresh, setRefreh] = useState(false);
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

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
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
              // onChange={handleChange('email')}
              placeholder={'Set pickup address'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <Text style={{width: '100%', textAlign: 'right', color: '#ecb241'}}>
              use current location
            </Text>
            <View style={{marginTop: 20}}>
              <Text
                style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
                Swap Type
              </Text>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout={'row'}
              />
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
            <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
              Size of cylinder
            </Text>
            <Text style={{color: '#000000', fontSize: 16, paddingVertical: 5}}>
              Select size of your cylinder
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.tagText}>6KG</Text>
              <Text style={styles.tagText}>12KG</Text>
              <Text
                style={[
                  styles.tagText,
                  {backgroundColor: '#4ca757', color: '#fff'},
                ]}>
                25KG
              </Text>
              <Text style={styles.tagText}>50KG</Text>
            </View>
            <View style={{marginTop: 25}}>
              <Text
                style={{color: '#000000', fontWeight: 'bold', fontSize: 16}}>
                Upload
              </Text>
              <Text
                style={{color: '#000000', fontSize: 16, paddingVertical: 5}}>
                Upload a snapshow of your cylinder
              </Text>

              <View>
                {console.log('lis', list)}
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
                // onPress={() => handleSubmit()}
                // disabled={!isValid || loader || !checked}
                title="Countinue"
              />
            </View>
          </View>
          <LabResultModal
            visible={showModal}
            title={'fsadfsdfds'}
            closeModal={() => setShowModal(!showModal)}
            onTakePhoto={() => imagePickerFromCamera()}
            onUploadFromGallery={() => imagePickerFromGallery()}
          />
        </View>
      </ScrollView>
    </View>
  );
}
