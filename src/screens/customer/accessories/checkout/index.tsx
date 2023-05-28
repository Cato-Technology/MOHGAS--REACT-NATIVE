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
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import card from '../../../../assets/card.png';
import aImage from '../../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
  CheckOutCard,
  // PhoneNumber,
  Header,
  InputWithLabel,
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
export default function CheckOut({navigation}) {
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

            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Market Place'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <View style={{height: 40}} />

            <Text style={{color: 'gray', fontSize: 12, paddingVertical: 10}}>
              <Icon name="location-sharp" size={20} color="#357bc3" /> Deliver
              to{' '}
              <Text style={{color: '#000000', fontSize: 12}}>
                100 Main Street fake, City, Country
              </Text>
            </Text>
            <View style={{height: 8}} />
            <FlatList
              data={[1, 2, 3, 4]}
              renderItem={({item, index}) => (
                <CheckOutCard
                  title={'Top Up - LPG 25kg'}
                  subTitle={'Today - 02.15 PM'}
                  price={'N12.34'}
                  image={aImage}
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
                backgroundColor: 'gray',
                width: '100%',
                height: 0.3,
                marginVertical: 15,
              }}
            />
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Sub Total</Text>
              <Text>N 12000.00</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Delivery Cost</Text>
              <Text>N 400.00</Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Coupon Discount</Text>
              <Text>N 0.00</Text>
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                width: '100%',
                height: 0.3,
                marginVertical: 15,
              }}
            />
            <View style={styles.rowView}>
              <Text style={styles.metaText}>Total</Text>
              <Text>N 12400.00</Text>
            </View>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
              }}>
              <GradientButton
                onPress={() => navigation.navigate(SCREENS.TRACK_ORDER)}
                // disabled={!isValid || loader || !checked}
                title="Checkout"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
