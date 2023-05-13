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

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {PERMISSIONS, check, request} from 'react-native-permissions';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  PaymentCheckBox,
  ProductView,
  SupportCard,
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
import {Checkbox} from 'react-native-paper';
let cameraIs = false;
let sucessData = {
  title: 'Thanks for your order',
  secondTitle:
    'Your order has been received. Our delivery patnner will get in  touch with you soon. thanks again for choosing us.',
};
let cbData = [
  {
    id: 1,
    title: 'Wallet',
    subTitle: 'Pay from your mohgas wallet balance',
    checked: false,
  },
  {
    id: 2,
    title: 'Master/Visa Card',
    subTitle: 'Pay directly from you debit card',
    checked: false,
  },
  {
    id: 3,
    title: 'Cash on Delivery',
    subTitle: 'Pay on Product Delivery',
    checked: false,
  },
  {
    id: 4,
    title: 'Transfer',
    subTitle: 'Make Transfer to an account number',
    checked: false,
  },
];
export default function ConfirmPayment({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const authContext = React.useContext(AuthContext);
  const [isFlipped, setIsFlipped] = useState(false);

  const hanldeCb = txt => {
    setIsFlipped(!isFlipped);

    cbData.map((ele, index) => {
      if (ele.id == txt) {
        cbData[index].checked = true;
      }
      if (ele.id != txt) {
        cbData[index].checked = false;
      }
    });
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
            title={'Payment'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <HeaderBottom
              title="Confirm you payment"
              // subTitle={'How can we help?'}
              contentStyle={{marginTop: 50}}
              // rightIcon={
              //   <View
              //     style={{
              //       backgroundColor: '#2f65a2',
              //       height: 30,
              //       borderRadius: 5,
              //     }}>
              //     <MaterialCommunityIcons name="sort" size={30} color="#fff" />
              //   </View>
              // }
            />
            <Text
              style={{
                color: '#cd9745',
                marginTop: -10,
                fontSize: 13,
              }}>
              We encourage our customers to opt in for contactless delivery with
              the other payment options.
            </Text>
            <Text
              style={{
                color: '#000000',
                width: '100%',
                textAlign: 'right',
                fontSize: 16,
                marginTop: 10,
              }}>
              Ammount Due N5600.00
            </Text>
            <Text
              style={{
                color: '#000000',
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
              }}>
              Choose Payment Method
            </Text>
            <FlatList
              data={cbData}
              extraData={isFlipped}
              renderItem={({item, index}) => (
                <View
                  style={{
                    width: '90%',
                    marginTop: 20,
                  }}>
                  <PaymentCheckBox
                    onPress={txt => hanldeCb(txt)}
                    title={item.title}
                    subTitle={item.subTitle}
                    check={item.checked}
                    id={item.id}
                  />
                </View>
              )}
              ListEmptyComponent={() => (
                <Text style={styles.noDataText}>No Data</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View
            style={{
              paddingHorizontal: widthPercentageToDP(3),
              paddingVertical: heightPercentageToDP(2),
              zIndex: -1,
            }}>
            <GradientButton
              onPress={() =>
                navigation.navigate(SCREENS.SUCCESS_SCREEN, {
                  item: sucessData,
                  render: 'topup',
                })
              }
              // disabled={!isValid || loader || !checked}
              title="Pay Now"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
