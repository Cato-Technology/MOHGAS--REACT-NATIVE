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
import Entypo from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
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
import VendorCard from '../../../components/vendor-card';

export default function OrderSummary({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);

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
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Summary'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Order Summary"
              subTitle={'Review what you have done Emekai'}
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
                paddingVertical: heightPercentageToDP(2),
              }}>
              <Image
                style={{width: '100%', height: 260}}
                source={require('./gas_cylinder.png')}
                resizeMode="cover"
              />
              <View style={{flexDirection: 'row'}}>
                <View style={styles.twoView}>
                  <View style={{paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Order Details</Text>
                    </View>
                    <Text style={styles.descText}>Order ID - #MGS78299</Text>
                    <Text style={styles.descText}>
                      Order Status -{' '}
                      <Text style={[styles.descText, {color: '#eaa844'}]}>
                        Pending
                      </Text>
                    </Text>
                    <Text style={styles.descText}>
                      Order Date - 12 Nov 2023 @ 4:13am
                    </Text>
                  </View>
                  <View style={{paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Customer Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      Emeka Mohammed{'\n'}123 main street abuja
                    </Text>
                  </View>
                </View>

                <View style={styles.twoView}>
                  <View style={{paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Vendor Details</Text>
                    </View>
                    <Text style={styles.descText}>Vendor Emeka Collins</Text>
                  </View>
                  <View style={{paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Products Details</Text>
                    </View>
                    <Text style={styles.descText}>Product Type - Refill</Text>
                    <Text style={styles.descText}>Size - 12 kg</Text>
                    <Text style={styles.descText}>Due - N 5,600.00</Text>
                    <Text style={[styles.descText, {color: 'pink'}]}>
                      See Breakdown
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                N 5,600.00
              </Text>
              <Text style={{width: '100%', fontSize: 11, textAlign: 'center'}}>
                Service Charge: N50{'   '}|{'   '}Delivery Cost: N100
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnTextStyle}>Cancel Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btnStyle, {backgroundColor: '#469830'}]}>
                  <Text style={styles.btnTextStyle}>Continue to payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
