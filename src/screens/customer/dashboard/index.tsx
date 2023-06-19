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

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
  DetailCard,
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
import {useDispatch, useSelector} from 'react-redux';
import {OrderState} from '../../../redux/orders/OrderState';
import {getReduxRecentOrderHistory} from '../../../redux/orders/orders-actions';
import {capitalizeFirstLetter} from '../../../utils/functions/general-functions';
import LinearGradient from 'react-native-linear-gradient';
export default function DashBoard({navigation, props}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const recentHistory = useSelector(
    (state: OrderState) => state.order.recentOrderHistory,
  );
  console.log('recentHistory', recentHistory);

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

  useEffect(() => {
    dispatch(getReduxRecentOrderHistory());
  }, [dispatch]);

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
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginTop: 20}}>
              <Text style={{fontFamily: 'Rubik-Bold', fontSize: 15}}>
                Wellcome
              </Text>
              <Text style={{fontFamily: 'Rubik-Bold', fontSize: 25}}>
                {authContext?.userData?.full_name}
              </Text>

              <Text
                style={{fontFamily: 'Rubik-Bold', color: 'gray', fontSize: 10}}>
                <Icon4 name="crown" size={10} color="gray" /> Premium Member
              </Text>
            </View>
            <Avatar.Image
              size={45}
              source={{uri: authContext?.userData?.image}}
            />
          </View>
          <View style={styles.cardContainer}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#50a93c', '#407226']}
              style={styles.gradientView}
            />
            <View>
              <Text style={{color: '#fff', fontFamily: 'Rubik-Bold'}}>
                Mohgas Wallet
              </Text>
              <View style={{paddingVertical: 20}}>
                <Text style={{color: '#fff', fontFamily: 'Rubik-Regular'}}>
                  Balance
                </Text>
                <Text style={{color: '#fff', fontFamily: 'Rubik-Regular'}}>
                  N123.456.78
                </Text>
              </View>
              <Text style={{color: '#fff', fontFamily: 'Rubik-Regular'}}>
                ■ ■ ■ ■{'   '}■ ■ ■ ■{'   '}■ ■ ■ ■{'   '}1 2 3 4
              </Text>
              <Text style={{color: '#fff', marginTop: 10}}>
                {' '}
                {authContext?.userData?.full_name}
              </Text>
            </View>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 30,
                paddingHorizontal: 30,
              }}>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate(SCREENS.ADD_DELIVERY_ADDRESS, {
                    render: 'refill',
                  })
                }>
                <View style={styles.circleView}>
                  <Icon3 name="arrow-up" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Top Up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.SWAP_CYLINDER)}
                style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon3
                    name="swap"
                    size={25}
                    color="#fff"
                    style={{
                      transform: [{rotate: '0deg'}],
                    }}
                  />
                </View>
                <Text style={styles.centerViewText}>Swap</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate(SCREENS.ACCESSORIES)}>
                <View style={styles.circleView}>
                  <Icon2 name="line-scan" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Accessories</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigation.navigate(SCREENS.CUSTOMER_SUPPORT)}>
                <View style={styles.circleView}>
                  <Icon5 name="support-agent" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SCREENS.ORDERS_NAVIGATOR_CUSTOMER, {
                screen: SCREENS.ORDER_HISTORY,
              })
            }
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: 'Rubik-Regular'}}>
              Recent Transcations
            </Text>
            <Text style={{color: 'gray', fontFamily: 'Rubik-Regular'}}>
              View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={recentHistory?.slice(0, 3)}
            renderItem={({item, index}) => (
              <DetailCard
                title={`${capitalizeFirstLetter(item.order_type)} - ${
                  item.weight
                }`}
                subTitle={item.order_date}
                price={item.price}
                srNo={item.status}
                icon={
                  item.order_type == 'refill' ? (
                    <Icon3 name="arrow-up" size={25} color="#4ca757" />
                  ) : (
                    <Icon3
                      name="swap"
                      size={22}
                      color="#4ca757"
                      style={{
                        transform: [{rotate: '0deg'}],
                      }}
                    />
                  )
                }
                onPressDelete={() => {
                  console.log('item', item._id);
                }}
                // onPressEdit={() =>
                //   navigation.navigate(SCREENS.ADDPAYMENTMETHOD, {
                //     edit: true,
                //     item: item,
                //   })
                // }
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No Data</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          <View
            style={{
              backgroundColor: '#131a28',
              height: 90,
              borderRadius: 10,
              paddingHorizontal: 20,

              width: '100%',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 7,
                fontFamily: 'Rubik-Bold',
                color: '#fff',
              }}>
              X
            </Text>
            <Text style={styles.hardText}>Open Mohgas Account</Text>
            <Text style={styles.lightText}>
              Open a virtual bank instantly with few clicks
            </Text>
            <Text
              style={[
                styles.lightText,
                {
                  fontSize: 9,
                  textAlign: 'center',
                  backgroundColor: '#393d48',
                  width: 70,
                  padding: 3,
                  marginTop: 10,
                },
              ]}
              onPress={() => navigation.navigate(SCREENS.MOHGAS_WALLET)}>
              Learn More
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
