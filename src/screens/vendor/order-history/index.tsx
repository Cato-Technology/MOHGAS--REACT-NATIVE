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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import { showMessage } from 'react-native-flash-message';
import { Avatar } from 'react-native-paper';

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
import { getReduxOrderHistory } from '../../../redux/orders/orders-actions';
import { capitalizeFirstLetter } from '../../../utils/functions/general-functions';
import { getVendorOrderHistory } from '../../../redux/global/actions';
import { GlobalState } from '../../../redux/global/GlobalState';
import moment from 'moment';
import { mainServics, orderServices } from '../../../services';
// import  from '../../../services'
export default function OrderHistoryVendor({ navigation }) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const [orderHistory, setOrderHistory] = useState();

  // const orderHistory = useSelector(
  //   (state: GlobalState) => state?.global?.vendorOrderHistory,
  // );
  // console.log('orderHistory', orderHistory);
  // console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    let data = { vendor_id: authContext?.userData?.user_id }
    getData(data);
    // dispatch(getVendorOrderHistory(data));
  }, [dispatch]);

  const getData = async (data: any) => {
    try {
      // const res = mainServics.getVendorOrderHistory(data);
      const res = await orderServices.orderHistory(data);
      console.log("-------------------", res);

      setOrderHistory(res?.order_history);

    } catch (e) {
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
      console.log('----e', e);
    }
    //  navigation.navigate(SCREENS.CONNECT_VENDOR);
  };

  const orderActionSelect = async (action: number, orderId: string) => {
    const data = { order_id: orderId };

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

      <ScrollView keyboardShouldPersistTaps={'handled'}>
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
                  title={`${capitalizeFirstLetter(item?.order_type)} - ${item?.invoice
                    }`}
                  subTitle={
                    item?.created_date
                      ? moment(item?.created_date).format('MMMM,DD,YYYY')
                      : '--'
                  }
                  style={{ backgroundColor: '#eaf5fc' }}
                  showOptions={true}
                  price={`N${item?.grand_total}`}
                  srNo={capitalizeFirstLetter(item?.status)}
                  icon={<Icon3 name="arrow-up" size={25} color="#455F9B" />}
                  onPressDelete={() => {
                    console.log('item?', item?._id);
                  }}
                  data={item}
                  actionOne={() => { orderActionSelect(1, item?.id) }}
                  actionTwo={() => { orderActionSelect(2, item?.id) }}
                  actionThree={() => { orderActionSelect(3, item?.id) }}

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
