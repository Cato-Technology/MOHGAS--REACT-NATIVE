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
import {mainServics} from '../../../../services';
import {showMessage} from 'react-native-flash-message';

export default function ConnectVendorSwap({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemVendor, setItemVendor] = useState();

  console.log('route', route?.params?.data);
  let data = route?.params?.data;
  console.log('itemVendor', itemVendor);

  const handleOrder = async () => {
    // navigation.navigate(SCREENS.CONFIRM_PAYMENT)}
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
      fdata.append('address', item.faddress);
      fdata.append('city', item.city);
      fdata.append('postal_code', item.postal);
      fdata.append('state', item.state);
      // fdata.append('size_of_cylinder', val);
      fdata.append('order_type', 'swapGas');
      fdata.append('agency_id', itemVendor?.id);
      fdata.append('product_id', itemVendor?.product_id);
      fdata.append('price', itemVendor?.price);

      console.log('ffff=>', fdata);

      const resData = await mainServics.gasOrder(fdata);
      console.log('resData', resData);
      if (resData?.message === 'Cart ID Recieved') {
        setIsLoading(false);
        navigation.navigate(SCREENS.ORDER_SUMMARY_SWAP, {
          id: resData?.responsedata?.cart_id,
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
              subTitle={'Request for Swap Cylinder'}
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
          <Text style={{width: '90%', color: '#000', fontSize: 16}}>
            Select a Vendor
          </Text>

          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={{paddingHorizontal: 20}}>
                <VendorCard
                  onPress={() => setItemVendor(item)}
                  backgroundColor={itemVendor == item ? '#dee8d2' : '#f5f5f5'}
                  image={item.image}
                  title={item?.user_name}
                  orders={item?.orders}
                  rating={item?.rating}
                  price={item?.price}
                  distance={parseFloat(item?.distance).toFixed(2) + 'KM'}
                  time={item?.distance_time + 'mins'}
                  pricePerKg={'Price Per Kg - ' + item?.price}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            paddingHorizontal: widthPercentageToDP(10),
            paddingVertical: heightPercentageToDP(2),
            zIndex: -1,
            marginTop: 50,
          }}>
          <GradientButton
            onPress={() => handleOrder()}
            disabled={!itemVendor}
            title="Countinue to Checkout"
          />
        </View>
      </ScrollView>
    </View>
  );
}
