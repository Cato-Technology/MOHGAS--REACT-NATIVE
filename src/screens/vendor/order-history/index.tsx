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
import {getReduxOrderHistory} from '../../../redux/orders/orders-actions';
import {capitalizeFirstLetter} from '../../../utils/functions/general-functions';
import {getVendorOrderHistory} from '../../../redux/global/actions';
import {GlobalState} from '../../../redux/global/GlobalState';
export default function OrderHistoryVendor({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();

  const orderHistory = useSelector(
    (state: GlobalState) => state?.global?.vendorOrderHistory,
  );
  console.log('orderHistory', orderHistory);
  console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    let data = new FormData();
    data.append('user_id', authContext?.userData?.user_id);
    dispatch(getVendorOrderHistory());
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
                  title={`${capitalizeFirstLetter(
                    item?.order_type,
                  )} - LPG 25kg`}
                  subTitle={item?.order_date}
                  style={{backgroundColor: '#eaf5fc'}}
                  price={'N12.34'}
                  srNo={capitalizeFirstLetter(item?.status)}
                  icon={<Icon3 name="arrow-up" size={25} color="#455F9B" />}
                  onPressDelete={() => {
                    console.log('item?', item?._id);
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
