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
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
import {useDispatch} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {mainServics} from '../../../../services';
import {getAddress} from '../../../../utils/functions/get-address';
import Geolocation from '@react-native-community/geolocation';
export default function ViewProduct({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [weight, setWeight] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userAddress, setUserAddress] = useState();
  const [city, setCity] = useState();
  const [postal, setPostal] = useState();
  const [state, setState] = useState();
  const [myDirection, setMyDirection] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const dispatch = useDispatch();
  let item = route?.params?.item;
  let size = item.size_of_product;
  const arr = size?.split(',');

  console.log('item', item);

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
        setIsLoading(false);
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

  const handleOrder = async () => {
    // navigation.navigate(SCREENS.CONFIRM_PAYMENT)}
    try {
      setIsLoading(true);
      let item = route?.params?.item;

      console.log('data=>', item);

      let fdata = new FormData();
      fdata.append('order_type', 'ACCESSORIES');
      fdata.append('product_id', item?.product_id);
      fdata.append('qty', 1);
      fdata.append('price', parseInt(item?.price));
      fdata.append('branch_id', parseInt(item?.branch_id));
      fdata.append('latitude', myDirection.latitude);
      fdata.append('longitude', myDirection.longitude);
      fdata.append('address', userAddress ? userAddress : 'No Address');
      fdata.append('city', city ? city : 'No City');
      fdata.append('postal', postal);
      fdata.append('state', state ? state : 'No State');
      console.log('ffff=>', fdata);

      console.log('ffff=>', fdata);

      const resData = await mainServics.gasOrder(fdata);
      console.log('resData', resData);
      if (resData?.status) {
        setIsLoading(false);

        navigation.navigate(SCREENS.CHECKOUT, {
          orderData: resData?.data,
          details: item,
        });
      } else {
        showMessage({
          message: JSON.stringify(resData),
          type: 'danger',
          icon: 'danger',
        });
        setIsLoading(false);
      }
    } catch (e) {
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('e', e);
      setIsLoading(false);
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
            <View style={{height: 8}} />

            <Image
              style={{height: 200, width: '100%'}}
              source={{uri: item?.business_image}}
              resizeMode={'center'}
            />
            <View style={{height: 8}} />
            <Text style={{color: 'gray', fontSize: 16}}>{item?.name}</Text>
            <Text style={{color: '#000000', fontSize: 16}}>N{item?.price}</Text>
            <View style={{height: 8}} />
            <Text style={{color: '#000000', fontSize: 12}}>
              <AntDesign name="star" size={12} color={'#debf5a'} />
              {item?.rating ? item?.rating : '-'}
              {'   '}|{'   '}
              {item?.no_of_solds ? item?.no_of_solds : '-'} Solid{'   '}|{'   '}
              {item?.reviews ? item?.reviews : '-'}
            </Text>
            <View style={{height: 8}} />
            <Text style={{color: 'gray', fontSize: 13}}>
              {item?.description}
            </Text>
            <View style={{height: 8}} />
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Rubik-Bold',
                fontSize: 16,
              }}>
              Size
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {arr?.map(ele => (
                <Text
                  onPress={() => setWeight(ele)}
                  style={[
                    styles.tagText,
                    {
                      backgroundColor: ele == weight ? '#4ca757' : '#efefef',
                      color: ele == weight ? '#fff' : '#000000',
                    },
                  ]}>
                  {ele}KG
                </Text>
              ))}
              {/* <Text style={styles.tagText}>6KG</Text>
              <Text style={styles.tagText}>12KG</Text>
              <Text
                style={[
                  styles.tagText,
                  {backgroundColor: '#4ca757', color: '#fff'},
                ]}>
                25KG
              </Text>
              <Text style={styles.tagText}>50KG</Text> */}
            </View>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() => handleOrder()}
                // disabled={!isValid || loader || !checked}
                title="Countinue to Checkout"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
