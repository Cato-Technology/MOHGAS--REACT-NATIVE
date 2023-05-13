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

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
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
import {
  getReduxOrderHistory,
  getReduxRecentOrderHistory,
} from '../../../redux/orders/orders-actions';
import {capitalizeFirstLetter} from '../../../utils/functions/general-functions';
export default function OrderHistory({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const orderHistory = useSelector(
    (state: OrderState) => state.order.recentOrderHistory,
  );
  console.log('orderHistory', orderHistory);
  console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    //authContext?.userData?.user_id
    let data = new FormData();
    data.append('user_id', 33);
    dispatch(getReduxRecentOrderHistory(data));
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
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <Header
              title="Order History"
              subTitle={'Review Past and Present Orders'}
              contentStyle={{marginTop: 100}}
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
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Recent Transcations</Text>
              <Text style={{color: 'gray'}}>
                View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
              </Text>
            </View>
            <FlatList
              data={orderHistory}
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
