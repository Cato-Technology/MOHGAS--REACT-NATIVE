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
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PERMISSIONS, check, request} from 'react-native-permissions';
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
import LabResultModal from '../../../../components/lab-results-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
let cameraIs = false;
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
];
let sucessData = {
  title: 'Transcation Sucessfull',
  desc: 'Your transcation was sucessful and wallet balance updated accordingly',
};
export default function FundWallet({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [isFlipped, setIsFlipped] = useState(false);
  const authContext = React.useContext(AuthContext);
  const [ammount, setAmmount] = React.useState(0);
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
            title={'Fund Wallet'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Support"
              subTitle={'Funding your Mohgas wallet to Enable Quick Purchase'}
              contentStyle={{marginTop: 40}}
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
            <Text style={{fontSize: RFValue(9), fontWeight: '200'}}>
              Maximum deposit through Mohgas account is N200.000
            </Text>
            {ammount > 200 && (
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
                <Text style={{fontSize: RFValue(9), fontWeight: '200'}}>
                  Choose how you want to fund you wallet.
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
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() => navigation.navigate(SCREENS.CREATE_BVN)}
                // disabled={!isValid || loader || !checked}
                title="Countinue"
              />
              <GradientButton
                onPress={() =>
                  navigation.navigate(SCREENS.SUCCESS_SCREEN, {
                    item: sucessData,
                    render: 'MohgasWalletTranSucess',
                  })
                }
                // disabled={!isValid || loader || !checked}
                title="Transcation unsucess removed after integrate api"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
