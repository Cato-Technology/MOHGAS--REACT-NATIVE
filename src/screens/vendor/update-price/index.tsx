/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  // Keyboard,
  // Platform,
  ScrollView,
  Text,
  // TouchableOpacity,
  View,
  // Image,
  // Pressable,
  // KeyboardAvoidingView,
  // FlatList,
  // SafeAreaView,
  // ImageBackground,
  // PermissionsAndroid,
} from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
// import card from '../../../assets/card.png';
// import aImage from '../../../assets/avatar.jpg';
// import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {PERMISSIONS, check, request} from 'react-native-permissions';
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
// import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import qs from 'qs';
// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import HeaderBottom from '../../../components/header-bottom';
// import VendorCard from '../../../components/vendor-card';
// import LabResultModal from '../../../components/lab-results-modal';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {showMessage} from 'react-native-flash-message';
import {mainServics} from '../../../services';
const data = [
  {label: 'Item 1', value: '1'},
 
];

export default function UpdatePrice({navigation, route}) {
  let item = route?.params?.item;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  console.log('item', item?.id);

  const authContext = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(false);
  const [value, setValue] = useState(null);
  const [price, setPrice] = useState('');
  const [confirmPrice, setConfirmPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState();

  useEffect(() => {

getVendorsPrice();
  }, [])

  const getVendorsPrice = async () => {
    setLoader(true);

    try{
      const response = await mainServics.getVendorGasPrice(authContext?.userData?.user_id);
      console.log(response, authContext?.userData?.user_id);
      setCurrentPrice(response?.price_per_kg);
    } catch (e) {
 console.log(e);
    }
    setLoader(false);
  }

  const handleSubmit = async () => {
   
    setLoader(true);
    if (price !== confirmPrice) {
      showMessage({
        message: 'Price should be matched!',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      try {
       
        let data = {
          vendor_id: authContext?.userData?.user_id,
          price: price
      }
        console.log('detail', data);
        const result = await mainServics.upDateProductPrice(data);
        console.log('result', result);
        if (result.status) {
          showMessage({
            message: result?.message,
            type: 'success',
            icon: 'success',
          });
          let sucessData = {
            title: 'Price Update Sucessful',
            secondTitle: 'Price has been update sucessfully',
            oldPrice: `Old Price - 1Kg -> N${currentPrice}`,
            newPrice: `New Price - 1Kg ->N${price}`,
          };
          navigation.navigate(SCREENS.SUCCESS_SCREEN, {
            item: sucessData,
            render: 'UpdatePrice',
          });
          setLoader(false);
        } else {
          showMessage({
            message: result?.message,
            type: 'warning',
            icon: 'warning',
          });
          setLoader(false);
        }
      } catch (e) {
        setLoader(false);
        console.log('error==>', e);
        showMessage({
          message: JSON.stringify(e),
          type: 'danger',
          icon: 'warning',
        });
      }
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
            title={
              route?.params?.render == 'product' ? 'Product Price' : 'Gas Price'
            }
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title={
                route?.params?.render == 'product'
                  ? 'Update Product Price'
                  : 'Update Gas Price'
              }
              subTitle={
                route?.params?.render == 'product'
                  ? 'Manage product cost'
                  : 'Manage gas cost'
              }
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
            {route?.params?.render != 'product' && (
              <>
                {/* <Dropdown
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
                  placeholder="Select Cylinder"
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
      <Text style={{marginTop: 20, paddingHorizontal: 10, fontSize: 16}}>
              Current Price
            </Text>
                <InputWithLabel
                  labelStyle={{
                    //   fontFamily: fonts.mulishSemiBold,
                    color: colors.yellowHeading,
                    fontSize: 15,
                  }}
                  // onChange={hnandleChange('email')}
                  value={currentPrice}
                  disabled={false}
                  placeholder={'N0.00'}
                  // error={touched.email ? errors.email : ''}
                  // onBlur={() => setFieldTouched('email')}
                />
              </>
            )}

            <Text style={{marginTop: 20, paddingHorizontal: 10, fontSize: 16}}>
              Set New Price
            </Text>
            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              onChange={txt => setPrice(txt.replace(/[^0-9]/g, ''))}
              placeholder={'Price *'}
              keyboardType={'numeric'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              keyboardType={'numeric'}
              onChange={txt => setConfirmPrice(txt.replace(/[^0-9]/g, ''))}
              placeholder={'Confirm New Price *'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
          </View>
        </View>

        <View style={{width: '100%', paddingHorizontal: 20}}>
          <View
            style={{
              paddingHorizontal: widthPercentageToDP(3),
              paddingVertical: heightPercentageToDP(2),
              zIndex: -1,
              marginTop: 50,
            }}>
            <GradientButton
              onPress={() => handleSubmit()}
              disabled={!price || loader || !confirmPrice}
              title="Update Price"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
