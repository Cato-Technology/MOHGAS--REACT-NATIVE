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
  ProductCard,
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
import HeaderBottom from '../../../components/header-bottom';
import {GlobalState} from '../../../redux/global/GlobalState';
import {getVendorProductR} from '../../../redux/global/actions';
export default function Products({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const productData = useSelector(
    (state: GlobalState) => state?.global?.vendorProducts,
  );
  console.log('productData', productData);
  console.log('authContext', authContext?.userData?.user_id);

  useEffect(() => {
    //authContext?.userData?.user_id
    let data = new FormData();
    data.append('user_id', 33);
    dispatch(getVendorProductR(data));
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
          <Header
            title={'Products'}
            back={true}
            rightIcon={
              <AntDesign
                name="pluscircle"
                size={30}
                color={colors.text}
                onPress={() => navigation.navigate(SCREENS.ADD_PRODUCT)}
              />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title={'All Products'}
              subTitle={'See and manage your products'}
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
              data={productData}
              renderItem={({item, index}) => (
                <ProductCard
                  srNo={index + 1}
                  title={capitalizeFirstLetter(item?.accessories_name)}
                  category={`Category - Selected ${item?.category_name}`}
                  size={`Size/Length - ${item?.size_of_product}`}
                  style={{backgroundColor: '#eaf5fc'}}
                  price={'N' + item?.price}
                  firstLetter={
                    item?.accessories_name
                      ? capitalizeFirstLetter(item?.accessories_name?.charAt(0))
                      : '-'
                  }
                  onPress={() =>
                    navigation.navigate(SCREENS.VIEW_PRODUCTS_VENDOR, {
                      item: item,
                    })
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
