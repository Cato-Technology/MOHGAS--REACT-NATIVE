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
  CheckBox,
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
import {mainServics} from '../../../../services';
let sucessData = {
  title: 'Account Created',
  desc: 'Details submitted success your account number is 123 456 789 and has been updated on your dashboard redirecting in 9 sec',
};
export default function CreateBvn({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [showText, setShowText] = useState(false);
  const authContext = React.useContext(AuthContext);
  const [bvn, setBvn] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleBvn = async () => {
    // navigation.navigate(SCREENS.CONFIRM_PAYMENT)}
    setIsLoading(true);
    try {
      let fdata = new FormData();
      fdata.append('bvn', bvn);
      // fdata.append('latitude', myDirection.latitude);

      const resData = await mainServics.createBvn(fdata);
      console.log('resData', resData);
      setIsLoading(false);
      // navigation.navigate(SCREENS.SUCCESS_SCREEN, {
      //   item: sucessData,
      //   render: 'MohgasWallet',
      // })
    } catch (e) {
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
            title={'Mohgas Account'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Mohgas Account"
              subTitle={'Lets Create your account'}
              contentStyle={{marginTop: 40}}
            />
            <InputWithLabel
              label="BVN"
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,

                color: colors.yellowHeading,
                fontSize: 15,
              }}
              onChange={txt => setBvn(txt)}
              placeholder={'eg. 2948398'}
              // keyboardType={'number-pad'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            {showText ? (
              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(9),
                    fontWeight: '200',
                    color: '#000',
                    textAlign: 'right',
                    width: '90%',
                  }}
                  onPress={() => setShowText(true)}>
                  A Mohgas Account will be created for you... and as part of
                  CBN's policy, all accounts must have a matching BVN.
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(9),
                    color: '#4ca735',
                    textAlign: 'right',
                    width: '90%',
                    borderBottomWidth: 10,
                    borderBottomColor: '#4ca735',
                    marginTop: 7,
                  }}
                  onPress={() => undefined}>
                  Read More
                </Text>
                <View
                  style={{
                    width: '15.5%',
                    marginTop: -8,
                    height: 1,
                    backgroundColor: '#4ca735',
                  }}
                />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: RFValue(9),
                  fontWeight: '200',
                  color: 'red',
                  textAlign: 'right',
                }}
                onPress={() => setShowText(true)}>
                Why do i need to provide my BVN?
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 25,
            marginTop: 200,
          }}>
          <View style={styles.tcText}>
            <CheckBox
              checked={checked}
              setChecked={setChecked}
              borderColor={'#4ca735'}
              checkColor={'#4ca735'}
            />
            <Text style={styles.tcTextStyle}>
              <Text>I have read and agree to the </Text>

              <Pressable onPress={() => undefined}>
                {({pressed}) => (
                  <Text
                    style={[
                      {
                        textDecorationLine: pressed ? 'underline' : 'none',
                        color: '#4ca735',
                        fontSize: RFValue(9),
                        // fontFamily: fonts.mulishRegular,
                        top: heightPercentageToDP(0.26),
                      },
                    ]}>
                    terms
                  </Text>
                )}
              </Pressable>

              <Text> and </Text>

              <Pressable onPress={() => undefined}>
                {({pressed}) => (
                  <Text
                    style={[
                      {
                        textDecorationLine: pressed ? 'underline' : 'none',
                        color: '#4ca735',
                        fontSize: RFValue(9),
                        // fontFamily: fonts.mulishRegular,
                        top: heightPercentageToDP(0.26),
                      },
                    ]}>
                    conditions
                  </Text>
                )}
              </Pressable>
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: widthPercentageToDP(2),
              paddingVertical: heightPercentageToDP(2),
            }}>
            <GradientButton
              onPress={() => handleBvn()}
              disabled={!bvn || !checked}
              title="Countinue"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
