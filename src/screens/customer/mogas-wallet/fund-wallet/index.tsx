/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
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
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  PaymentCheckBox,
  ProductView,
} from '../../../../components';

import SCREENS from '../../../../utils/constants';

import makeStyles from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
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
import { useTheme } from '@react-navigation/native';
import GradientButton from '../../../../components/buttons/gradient-button';
import HeaderBottom from '../../../../components/header-bottom';
import RNMonnify from '@monnify/react-native-sdk';
import { mainServics } from '../../../../services';
import { showMessage } from 'react-native-flash-message';
let cameraIs = false;
let cbData = [
  {
    id: 1,
    title: 'Transfer',
    subTitle: 'Make Transfer to an account number',
    checked: false,
  },
  {
    id: 2,
    title: 'Master/Visa Card',
    subTitle: 'Pay directly from you debit card',
    checked: false,
  },
];
let sucessData = {
  title: 'Transcation Sucessfull',
  desc: 'Your transcation was sucessful and wallet balance updated accordingly',
};
export default function FundWallet({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [isFlipped, setIsFlipped] = useState(false);
  const authContext = React.useContext(AuthContext);
  const [ammount, setAmmount] = React.useState(0);
  const [checkValue, setCheckValue] = React.useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState(``);


  const hanldeCb = txt => {
    console.log('txt', txt);
    setCheckValue(txt);
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
  const getWalletDetails = async () => {
    console.log('fullname=======================', authContext?.userData);
    try {
      setIsLoading(true);
      let fdata = new FormData();
      fdata.append(
        'payment_type',
        checkValue == 1 ? 'ACCOUNT_TRANSFER' : 'CARD',
      );
      fdata.append('amount', ammount);

      const resData = await mainServics.getWalletTopupDetails(fdata);
      console.log('resWallet', resData);
      setIsLoading(false);
      if (
        resData?.status &&
        resData?.message == 'Success create topup wallet order'
      ) {
        handlePayment(resData?.data);
      }
    } catch (e) {
      showMessage({
        message: e?.errMsg?.message,
        type: 'danger',
        icon: 'danger',
      });
      setIsLoading(false);
    }
  };
  const handlePayment = async params => {
    RNMonnify.initializePayment({
      amount: params?.payment_params?.amount,
      customerName: params?.payment_params?.customerName,
      customerEmail: params?.payment_params?.customerEmail,
      paymentReference: params?.payment_params?.paymentReference,
      paymentDescription: params?.payment_params?.paymentDescription,
      currencyCode: params?.payment_params?.currencyCode,
      incomeSplitConfig: [],
    })
      .then(response => {
        console.log(response); // card charged successfully, get reference here
        if (response.transactionStatus == 'PAID') {
          navigation.navigate(SCREENS.SUCCESS_SCREEN, {
            item: sucessData,
            render: 'MohgasWalletTranSucess',
          });
        } else {
          navigation.navigate(SCREENS.UN_SUCCESS_SCREEN);
        }
      })
      .catch(error => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      });
  };

  const handleFlutterWavePayment = async () => {
    setIsLoading(true);

    const { user_id, email, full_name, phone_no }: any = authContext?.userData;

    let fwData = {
      "id": user_id,
      "email": email,
      "phone_no": phone_no,
      "full_name": full_name,
      "amount": ammount
    }

    const res = await mainServics.fundWallet(fwData);

    console.log(fwData);
    console.log('response============', res);
    setHtmlContent(res);
    setIsLoading(false);
    setModalVisible(true);

  }

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
            title={'Fund Wallet'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <HeaderBottom
              title="Wallet"
              subTitle={'Funding your Mohgas wallet to Enable Quick Purchase'}
              contentStyle={{ marginTop: 40 }}
            />
            <InputWithLabel
              label="Ammount"
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,

                color: colors.yellowHeading,
                fontSize: 15,
              }}
              onChange={txt => setAmmount(txt)}
              placeholder={'eg. 0.0'}
              keyboardType={'number-pad'}
            // error={touched.email ? errors.email : ''}
            // onBlur={() => setFieldTouched('email')}
            />
            <Text
              style={{
                fontSize: RFValue(9),

                color: '#000000',
              }}>
              Minimum deposit through Mohgas account is N200.000
            </Text>
            {ammount > 199 && (
              <>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Rubik-Bold',
                    fontSize: 16,
                    marginTop: 15,
                  }}>
                  Select Payment Method
                </Text>
                <Text style={{ fontSize: RFValue(9), fontWeight: '200' }}>
                  Choose how you want to fund you wallet.
                </Text>
                <FlatList
                  data={cbData}
                  extraData={isFlipped}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        width: '90%',
                        marginTop: 20,
                      }}>
                      <PaymentCheckBox
                        onPress={txt => hanldeCb(txt)}
                        title={item?.title}
                        subTitle={item?.subTitle}
                        check={item?.checked}
                        id={item?.id}
                      />
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={styles.noDataText}>No Data</Text>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </>
            )}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={
                  () => handleFlutterWavePayment()

                  // navigation.navigate(SCREENS.CONFIRM_PAYMENT, {
                  //   ammount: ammount,
                  //   render: 'wallet_topup',
                  // })
                }
                disabled={!ammount || !checkValue}
                title="Countinue"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoider}>
          <ScrollView
            contentContainerStyle={styles.scrollView}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingHorizontal: 20,
              }}>
              <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={styles.webviewStyle}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
