/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
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

import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

import { useTheme } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import GradientButton from '../../../../components/buttons/gradient-button';
import { ScrollView } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import { mainServics } from '../../../../services';
import { showMessage } from 'react-native-flash-message';
import { getAddress } from '../../../../utils/functions/get-address';
import AuthContext from '../../../../utils/auth-context';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../../../redux/global/GlobalState';
import { duration } from 'moment';
const INITIAL_REGION = {
  latitude: 33.6844,
  longitude: 73.0479,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
export default function PinLocation({ navigation }) {
  const auth = React.useContext(AuthContext);
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const locData = useSelector(
    (state: GlobalState) => state?.global?.locationData,
  );

  const [myDirection, setMyDirection] = useState(locData);
  const mapRef = useRef<MapView>(null);

  console.log('locDataPin', locData);

  const handleSubmitted = async () => {
    let item = {
      user_id: auth?.userData?.user_id,
      latitude: locData.latitude,
      longitude: locData.longitude,
      // latitude: 24.817556456461972,
      // longitude: 67.0560846850276,
      faddress: userAddress,
      city: city,
      postal: postal ? postal : '000000',
      state: state,
    };

    navigation.navigate(SCREENS.CONNECT_VENDOR, {
      item: item,
    });

    //  navigation.navigate(SCREENS.CONNECT_VENDOR);
  };

  // const searchPlaces = async () => {

  //   let searchText = `${userAddress && userAddress}, ${city && city} ${state && state}`;
  //   if (!searchText.trim().length) return;

  //   const googleApisUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

  //   console.log(searchText);
  // }

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 })
    }
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          styles={{ textInput: styles.searchInput }}
          onPress={(data, details = null) => {
            setUserAddress(data.description);
            const addrComp = details?.vicinity.split(',');
            setCity(addrComp[addrComp?.length - 1].trim());
            console.log(details);
            // console.log(data);
            const position = {
              latitude: details?.geometry.location.lat || locData?.latitude,
              longitude: details?.geometry.location.lng || locData?.longitude
            }
            setMyDirection(position)
            moveTo(position)
          }}
          query={{
            key: 'AIzaSyD26sAjzThLmmzzLWJrHRxwtphkYmo90vw',
            language: 'address',
          }}
          fetchDetails
        />
      </View>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: locData?.latitude,
          longitude: locData?.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsUserLocation={true}
        showsMyLocationButton={false}

        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          position: 'absolute',
        }}>

        <Marker
          draggable={true}
          key={1}
          title={'My Postion'}
          coordinate={myDirection}
          // coordinate={{ "latitude": 37.421098333333335, "longitude": -122.08400000000002 }}
          onDragEnd={e => {
            console.log('dragEnd', e.nativeEvent.coordinate);
            setMyDirection({
              latitude: Number(e.nativeEvent.coordinate.latitude),
              longitude: Number(e.nativeEvent.coordinate.longitude),
              // latitude: locData?.latitude,
              // longitude: locData?.longitude,
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
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
                  style={{ position: 'absolute', right: 20, top: 20 }}
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
                  placeholder={'Nigeria'}
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

                <View style={{ paddingVertical: 20 }}>
                  <GradientButton
                    onPress={() => {
                      searchPlaces();
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
      {/* <View
        style={{
          paddingHorizontal: 10,
          height: 100,
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
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: 3,
            borderColor: '#4ca735',
            borderRadius: 12,
          }}>
          <Text style={{ fontSize: 17, width: '85%' }}>{userAddress}</Text>
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
      </View> */}
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
