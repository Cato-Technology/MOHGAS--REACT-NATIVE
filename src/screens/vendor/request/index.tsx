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
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderBottom from '../../../components/header-bottom';
import aImage from '../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
  DetailCard,
  Header,
} from '../../../components';

import SCREENS from '../../../utils/constants';

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';

export default function VendorRequest({navigation, props}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  console.log('authContext==>', authContext);
  React.useEffect(() => {
    // Load the user data from storage when the app starts
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log('data', data);
      } catch (e) {
        console.error('Failed to load user data from storage');
      }
    };
    loadUserData();
  }, []);

  const goToNewCard = () => {
    navigation.navigate('card');
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
            title={'Payout'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <HeaderBottom
              title="Request Payout"
              subTitle={
                'Funds will be credited to the account information below'
              }
              contentStyle={{marginTop: 30}}
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
            <View
              style={{
                width: '100%',
                backgroundColor: '#131a28',
                height: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  position: 'absolute',
                  right: 10,
                  top: 5,
                }}>
                X
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={{width: '40%', marginLeft: 10}}>
                  <Text style={styles.lightText}>Wallet Balance</Text>
                  <Text style={styles.hardText}>N123.456.78</Text>
                </View>
                <View
                  style={{backgroundColor: '#fff', height: 40, width: 0.5}}
                />
                <View style={{width: '40%'}}>
                  <Text style={styles.lightText}>Withdraw Balance</Text>
                  <Text style={styles.hardText}>N34355.3435</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                color: '#efbf73',
                textAlign: 'center',
                width: '80%',

                marginTop: 15,
              }}>
              Card Payments takes 24-48 hours to reflect your mohgas wallet
            </Text>

            <InputWithLabel
              labelStyle={{
                //   fontFamily: fonts.mulishSemiBold,
                color: colors.yellowHeading,
                fontSize: 15,
              }}
              label={'Ammount to Withdraw'}
              // onChange={hnandleChange('email')}
              placeholder={'eg. 1000'}
              // error={touched.email ? errors.email : ''}
              // onBlur={() => setFieldTouched('email')}
            />
            <Text style={[styles.centerText, {fontWeight: 'bold'}]}>
              Account to credit
            </Text>
            <Text
              style={[styles.centerText, {fontWeight: '100', marginTop: 10}]}>
              Ahmed Peter Hassan
            </Text>
            <Text
              style={[styles.centerText, {fontWeight: '100', marginTop: 10}]}>
              0354533543 (Guaranty Trust Bank)
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#eb473d',
              height: 60,

              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
              padding: 10,
            }}>
            <Text
              style={[
                styles.hardText,
                {
                  fontSize: 9,
                  fontWeight: '700',
                  textAlign: 'center',
                  lineHeight: 20,
                  width: '90%',
                },
              ]}>
              Opps! Payout can not be processed because you haven't added any
              banking details to your profile yet.{'  '}
              <Text
                style={[
                  styles.hardText,
                  {fontSize: 9, color: '#000', fontWeight: '700'},
                ]}>
                Add One Now?
              </Text>
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 15,

              zIndex: -1,
              marginTop: 50,
            }}>
            <GradientButton
              // onPress={() =>
              //   navigation.navigate(SCREENS.SUCCESS_SCREEN, {
              //     item: sucessData,
              //     render: 'UpdatePrice',
              //   })
              // }
              // disabled={!isValid || loader || !checked}
              title="Submit Request"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
