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
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
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
import Geolocation from '@react-native-community/geolocation';
import {mainServics} from '../../../services';
import {showMessage} from 'react-native-flash-message';
import {getAddress} from '../../../utils/functions/get-address';
export default function Accessories({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);

  const [userAddress, setUserAddress] = useState();
  const [accessories, setAccessories] = useState();
  const [myDirection, setMyDirection] = useState({
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
  useEffect(() => {
    getAcceories();
  }, []);
  const getAcceories = async () => {
    try {
      console.log('auth==>', auth?.userData?.user_id);

      // let lat = myDirection.latitude;
      // let lon = myDirection.longitude;
      let lat = 9.138435493506822;
      let lon = 7.367293098773452;

      const resData = await mainServics.getAccessoriesAsPerNearestAgencies(
        lat,
        lon,
      );
      console.log('resData', resData);
      if (resData?.message === 'Success get nearest products') {
        setAccessories(resData.data);
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
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Market Place'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Accessories"
              subTitle={'Find and Buy gas accessories'}
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
            <InputWithLabel
              placeholder={'Search'}
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              // onChange={handleChange('email')}
              // value={values.email}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <View style={{height: 8}} />
            <Text style={{color: 'gray', fontSize: 12, paddingVertical: 10}}>
              <Icon name="location-sharp" size={20} color="#357bc3" /> Deliver
              to{' '}
              <Text style={{color: '#000000', fontSize: 12}}>
                {userAddress}
              </Text>
            </Text>

            <FlatList
              data={accessories}
              numColumns={4}
              scrollEnabled={true}
              contentContainerStyle={{marginTop: 10}}
              columnWrapperStyle={
                {
                  // justifyContent: 'space-evenly',
                }
              }
              renderItem={({item, index}) => (
                <ProductView
                  title={item?.accessories_name}
                  price={`N${item?.price}`}
                  image={{uri: item?.business_image}}
                  onPress={() =>
                    navigation.navigate(SCREENS.VIEW_PRODUCTS, {item: item})
                  }
                />
              )}
              ListEmptyComponent={() => (
                <Text style={styles.noDataText}>No Data</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
