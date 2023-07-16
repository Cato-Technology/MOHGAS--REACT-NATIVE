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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
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
import VendorCard from '../../../../components/vendor-card';
import {showMessage} from 'react-native-flash-message';
import {mainServics} from '../../../../services';
import {useDispatch} from 'react-redux';
import {ORDER_SUMMARY} from '../../../../redux/global/constants';

export default function ConnectVendor({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const [isLoading, setIsLoading] = useState(false);
  const [weightData, setWeightData] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [data, setData] = useState();
  const [itemVendor, setItemVendor] = useState();
  console.log('route', route.params);

  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();
  const getData = async val => {
    try {
      setIsLoading(true);
      let item = route?.params?.item;

      console.log('data=>', item);
      let fdata = new FormData();
      fdata.append('user_id', item.user_id);
      // fdata.append('latitude', myDirection.latitude);
      // fdata.append('longitude', myDirection.longitude);
      fdata.append('latitude', item.latitude);
      fdata.append('longitude', item.longitude);
      fdata.append('faddress', item.faddress);
      fdata.append('city', item.city);
      fdata.append('postal', item.postal);
      fdata.append('state', item.state);
      fdata.append('size_of_cylinder', val);
      console.log('ffff=>', fdata);

      const resData = await mainServics.nearByGasAgencyRefill(
        '24.817556456461972',
        '67.0560846850276',
        // item.latitude,
        // item.longitude,
      );
      console.log('resData', resData);
      if (resData?.status) {
        setData(resData?.data);
        setIsLoading(false);
      } else if (!resData?.status) {
        showMessage({
          message: resData?.message,
          type: 'warning',
          icon: 'warning',
        });
        setIsLoading(false);
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
    //  navigation.navigate(SCREENS.CONNECT_VENDOR);
  };
  console.log('vvv', itemVendor);
  console.log('weightData', weightData);
  console.log('pData', route?.params?.item);

  const handleOrder = async () => {
    // navigation.navigate(SCREENS.CONFIRM_PAYMENT)}
    try {
      setIsLoading(true);
      let item = route?.params?.item;

      console.log('data=>', item);
      let fdata = new FormData();
      fdata.append('order_type', 'REFILL');
      fdata.append('product_id', parseInt(weightData?.product_id));
      fdata.append('qty', 1);
      fdata.append('price', parseInt(weightData?.price));
      fdata.append('branch_id', parseInt(itemVendor?.branch_id));
      fdata.append('latitude', item.latitude);
      fdata.append('longitude', item.longitude);
      fdata.append('address', item.faddress);
      fdata.append('city', item.city);
      fdata.append('postal', item.postal);
      fdata.append('state', item.state);
      console.log('ffff=>', fdata);

      const resData = await mainServics.gasOrder(fdata);
      console.log('resData', resData);
      dispatch({
        type: ORDER_SUMMARY,
        payload: resData.data,
      });
      if (resData?.status) {
        setIsLoading(false);
        navigation.navigate(SCREENS.ORDER_SUMMARY, {
          item: resData?.data,
          itemVendor: itemVendor,
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
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Refill'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="New Order"
              subTitle={'Request for Refill'}
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
              label="Delivery Address"
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              // onChange={handleChange('email')}
              value={'100 Main Street fake, City, Country'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <Text style={{width: '100%', textAlign: 'right', color: '#ecb241'}}>
              Change
            </Text>
          </View>
          {data && (
            <>
              <Text style={{width: '90%', color: '#000', fontSize: 16}}>
                Select a Vendor
              </Text>
              <FlatList
                data={data}
                renderItem={({item}) => (
                  <View style={{paddingHorizontal: 20}}>
                    <VendorCard
                      onPress={() => setItemVendor(item)}
                      backgroundColor={
                        itemVendor == item ? '#dee8d2' : '#f5f5f5'
                      }
                      image={item.vendor_image_url}
                      title={item?.vendor_name}
                      orders={item?.orders}
                      rating={item?.rating}
                      price={item?.price}
                      distance={parseFloat(item?.distance).toFixed(2) + 'KM'}
                      time={
                        item?.distance_time ? item?.distance_time : '-' + 'mins'
                      }
                      pricePerKg={'Price Per Kg - ' + item?.avg_price_per_kg}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View style={{height: 20}} />
            {itemVendor?.refill_size && (
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Rubik-Bold',
                  fontSize: 16,
                }}>
                Size of cylinder
              </Text>
            )}

            <View style={{flexDirection: 'row', marginTop: 10}}>
              {/* <Text style={styles.tagText}>6KG</Text>
              <Text style={styles.tagText}>12KG</Text>
              <Text
                style={[
                  styles.tagText,
                  {backgroundColor: '#4ca757', color: '#fff'},
                ]}>
                25KG
              </Text>
              <Text style={styles.tagText}>50KG</Text>
              <Text style={styles.tagText}>Set Quantity</Text> */}
              {itemVendor?.refill_size?.map(ele => (
                <Text
                  style={[
                    styles.tagText,
                    {
                      backgroundColor:
                        weightData?.size == ele.size ? '#4ca757' : '#efefef',
                      color: weightData?.size == ele.size ? '#fff' : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setWeightData(ele);
                  }}>
                  {ele.size}
                </Text>
              ))}
            </View>
            {weightData == 'other' && (
              <InputWithLabel
                labelStyle={{
                  //   fontFamily: fonts.mulishSemiBold,
                  color: colors.yellowHeading,
                  fontSize: 15,
                }}
                maxLength={3}
                keyboardType={'numeric'}
                onChange={txt => {
                  setWeightInput(txt);
                }}
                placeholder={'0'}
                // error={touched.email ? errors.email : ''}
                // onBlur={() => setFieldTouched('email')}
              />
            )}
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() => {
                  handleOrder();
                }}
                disabled={!weightData || !itemVendor}
                title="Countinue"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
