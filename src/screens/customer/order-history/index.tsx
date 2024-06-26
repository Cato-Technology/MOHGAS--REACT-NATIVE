/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
} from 'react-native';

import Icon3 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import { RefreshControl } from 'react-native';
import { showMessage } from 'react-native-flash-message';


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
import { RFValue } from 'react-native-responsive-fontsize';
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
import { useTheme } from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import { useDispatch, useSelector } from 'react-redux';
import { OrderState } from '../../../redux/orders/OrderState';
import { orderServices } from '../../../services';
import {
  getReduxOrderHistory,
  getReduxRecentOrderHistory,
} from '../../../redux/orders/orders-actions';
import { capitalizeFirstLetter } from '../../../utils/functions/general-functions';
export default function OrderHistory({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [refreshing, setRefreshing] = React.useState(false);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const orderHistory = useSelector(
    (state: OrderState) => state.order.recentOrderHistory,
  );
  // console.log('orderHistory', orderHistory);
  // console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    //authContext?.userData?.user_id
    let data = new FormData();
    data.append('user_id', authContext?.userData?.user_id);
    dispatch(getReduxRecentOrderHistory(data));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      let data = { vendor_id: authContext?.userData?.user_id }

      setRefreshing(false);
    }, 2000);
  }, []);

  const orderActionSelect = async (action: number, orderId: string) => {
    const data = { order_id: orderId, id: authContext?.userData?.user_id };
    try {
      const res = await orderServices.orderAction(data, action);
      console.log(res);
      await showMessage({
        message: res?.message,
        type: 'success',
        icon: 'success',
      })

    } catch (e) {
      console.log("--------", e)
      await showMessage({
        message: e?.errMsg?.message,
        type: 'warning',
        icon: 'danger',
      })
    }

  }

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Header
              title="Order History"
              subTitle={'Review Past and Present Orders'}
              contentStyle={{ marginTop: 100 }}
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
              <Text style={{ color: 'gray' }}>
                View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
              </Text>
            </View>
            <FlatList
              data={orderHistory}
              renderItem={({ item, index }) => (
                <DetailCard
                  title={`${capitalizeFirstLetter(item.order_type)} - ${item.delivery_cost
                    }`}
                  subTitle={item.created_date}
                  showOptions={true}
                  price={item.grand_total}
                  srNo={item.status}
                  actionFour={() => { orderActionSelect(3, item?.id) }}
                  icon={
                    item.order_type == 'refill' ? (
                      <Icon3 name="arrow-up" size={25} color="#4ca757" />
                    ) : (
                      <Icon3
                        name="swap"
                        size={22}
                        color="#4ca757"
                        style={{
                          transform: [{ rotate: '0deg' }],
                        }}
                      />
                    )
                  }
                  data={item}
                // onPressDelete={() => {
                //   console.log('item', item._id);
                // }}
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
