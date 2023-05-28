/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  DetailCard,
} from '../../../../components';

import SCREENS from '../../../../utils/constants';

import makeStyles from './styles';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

import {useTheme} from '@react-navigation/native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import GradientButton from '../../../../components/buttons/gradient-button';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import {mainServics} from '../../../../services';
import {showMessage} from 'react-native-flash-message';
import {getAddress} from '../../../../utils/functions/get-address';
const INITIAL_REGION = {
  latitude: 33.6844,
  longitude: 73.0479,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
export default function PinLocation({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [userAddress, setUserAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [state, setState] = useState();
  const [myLatitude, setMyLatitude] = useState(INITIAL_REGION.latitude);
  const [myLongitude, setMyLongitude] = useState(INITIAL_REGION.longitude);
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

  const getOneTimeLocation = () => {
    console.log('Getting Location ... ');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      async position => {
        console.log('currentLongitude', position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setMyLatitude(Number(position.coords.latitude));
        setMyLongitude(Number(position.coords.longitude));
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
        console.log('error ', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  console.log('myDir', myDirection);
  const handleSubmitted = async () => {
    try {
      let data = new FormData();
      data.append('user_id', 33);
      // data.append('latitude', myDirection.latitude);
      // data.append('longitude', myDirection.longitude);
      data.append('latitude', 24.817556456461972);
      data.append('longitude', 67.0560846850276);
      data.append('faddress', userAddress);
      data.append('city', city);
      data.append('postal', postal ? postal : '000000');
      data.append('state', state);
      data.append('size_of_cylinder', 25.0);
      console.log('data=>', data);

      const resData = await mainServics.nearByGasAgencyRefill(data);
      console.log('resData', resData);
      if (resData?.message === 'Near By Gas Agencies Found') {
        navigation.navigate(SCREENS.CONNECT_VENDOR, {
          data: resData?.responsedata,
        });
      } else if (resData?.message === 'No Agencies Available Near By You') {
        showMessage({
          message: resData?.message,
          type: 'warning',
          icon: 'warning',
        });
      } else {
        showMessage({
          message: JSON.stringify(resData),
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (e) {
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('e', e);
    }
    //  navigation.navigate(SCREENS.CONNECT_VENDOR);
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          position: 'absolute',
        }}>
        <Marker
          draggable
          title={'My Postion'}
          coordinate={myDirection}
          onDragEnd={e => {
            console.log('dragEnd', e.nativeEvent.coordinate);
            setMyDirection({
              latitude: Number(e.nativeEvent.coordinate.latitude),
              longitude: Number(e.nativeEvent.coordinate.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          pinColor={'red'}
        />
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingHorizontal: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <MaterialCommunityIcons
                  name={'close'}
                  size={28}
                  color={'#000'}
                  style={{position: 'absolute', right: 20, top: 20}}
                  onPress={() => setModalVisible(false)}
                />
                <InputWithLabel
                  label="Address"
                  labelStyle={{
                    //   fontFamily: fonts.mulishSemiBold,
                    color: colors.yellowHeading,
                    fontSize: 15,
                  }}
                  onChange={txt => setUserAddress(txt)}
                  placeholder={'Street 2, 9887'}
                  // error={touched.email ? errors.email : ''}
                  // onBlur={() => setFieldTouched('email')}
                />
                <InputWithLabel
                  label="City"
                  labelStyle={{
                    //   fontFamily: fonts.mulishSemiBold,
                    color: colors.yellowHeading,
                    fontSize: 15,
                  }}
                  onChange={txt => setCity(txt)}
                  placeholder={'Islambad'}
                  // error={touched.email ? errors.email : ''}
                  // onBlur={() => setFieldTouched('email')}
                />
                <InputWithLabel
                  label="State"
                  labelStyle={{
                    //   fontFamily: fonts.mulishSemiBold,
                    color: colors.yellowHeading,
                    fontSize: 15,
                  }}
                  onChange={txt => setState(txt)}
                  placeholder={'Nigria'}
                  // error={touched.email ? errors.email : ''}
                  // onBlur={() => setFieldTouched('email')}
                />
                <InputWithLabel
                  label="Postal Code"
                  labelStyle={{
                    //   fontFamily: fonts.mulishSemiBold,
                    color: colors.yellowHeading,
                    fontSize: 15,
                  }}
                  onChange={txt => setPostal(txt)}
                  placeholder={'00000'}
                  // error={touched.email ? errors.email : ''}
                  // onBlur={() => setFieldTouched('email')}
                />

                <View style={{paddingVertical: 20}}>
                  <GradientButton
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    // disabled={!isValid || loader || !checked}
                    title="Confirm"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <View
        style={{
          paddingHorizontal: 10,
          height: 130,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            backgroundColor: '#4ca735',
            padding: 10,
            borderRadius: 30,
          }}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            width: '85%',
            padding: 6,
            height: 90,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: 3,
            borderColor: '#4ca735',
            borderRadius: 12,
          }}>
          <Text style={{fontSize: 17, width: '85%'}}>{userAddress}</Text>
          <View
            style={{
              backgroundColor: '#eef1f6',
              width: 30,
              height: 30,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons
              name="plus"
              size={20}
              color={'#6c6e69'}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          paddingVertical: heightPercentageToDP(2),
          paddingHorizontal: 30,
          position: 'absolute',
          bottom: 10,
        }}>
        <GradientButton
          onPress={() => {
            // getOneTimeLocation();
            handleSubmitted();
          }}
          title="Countinue"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
