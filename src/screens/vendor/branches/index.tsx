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
  RefreshControl,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
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
  BranchCard,
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

import {capitalizeFirstLetter} from '../../../utils/functions/general-functions';
import HeaderBottom from '../../../components/header-bottom';
import {getBranchesR} from '../../../redux/global/actions';
import {GlobalState} from '../../../redux/global/GlobalState';
import moment from 'moment';
export default function Branches({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const branches = useSelector((state: GlobalState) => state?.global?.branches);
  console.log('branches', branches);
  console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    //authContext?.userData?.user_id
    let data = new FormData();
    data.append('user_id', 33);
    dispatch(getBranchesR(data));
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    let data = new FormData();
    data.append('user_id', 33);
    dispatch(getBranchesR(data));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={false} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            width: '100%',

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'All Branches'}
            back={true}
            rightIcon={
              <AntDesign
                name="pluscircle"
                size={30}
                color={colors.text}
                onPress={() => navigation.navigate(SCREENS.ADD_BRANCH)}
              />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title={'Branches'}
              subTitle={'See and manage your branches'}
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

            <FlatList
              data={branches}
              renderItem={({item, index}) => (
                <BranchCard
                  srNo={index + 1}
                  title={capitalizeFirstLetter(item?.branch_name)}
                  storeManager={`Store Manager - ${item?.branch_store_manager_name}`}
                  address={item?.address}
                  lastSeen={`Last seen: ${
                    item?.modifieddate
                      ? moment(item?.modifieddate).format('MMMM,DD,YYYY')
                      : '-'
                  }`}
                  status={item?.branch_status}
                  style={{backgroundColor: '#eaf5fc'}}
                  price={`N${item?.wallet_balance}`}
                  firstLetter={
                    item?.branch_name
                      ? capitalizeFirstLetter(item?.branch_name?.charAt(0))
                      : '-'
                  }
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
