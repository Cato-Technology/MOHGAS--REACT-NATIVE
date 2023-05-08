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

import Icon5 from 'react-native-vector-icons/MaterialIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
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
export default function AddDeliveryAddress({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  const render = route?.params?.render;
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

      <View
        style={{
          width: '100%',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        <View style={styles.icon} />
        <Header
          title={render == 'refill' ? 'Refill' : 'Market Place'}
          back={true}
          rightIcon={<AntDesign name="setting" size={25} color={colors.text} />}
        />
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <HeaderBottom
            title={render == 'refill' ? 'New Order' : 'Accessories'}
            subTitle={
              render == 'refill'
                ? 'Request for Refill'
                : 'Find and Buy gas accessories'
            }
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
          <InputWithLabel
            label="Set Delivery Address"
            labelStyle={{
              //   fontFamily: fonts.mulishSemiBold,
              color: colors.yellowHeading,
              fontSize: 15,
            }}
            // onChange={handleChange('email')}
            value={'100 Main Street fake, City, Country'}
            // error={touched.email ? errors.email : ''}
            // onBlur={() => setFieldTouched('email')}
          />
          <Text style={{width: '100%', textAlign: 'right', color: '#ecb241'}}>
            Change
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingVertical: heightPercentageToDP(2),
          paddingHorizontal: 30,
          position: 'absolute',
          bottom: 10,
        }}>
        <GradientButton
          onPress={() => navigation.navigate(SCREENS.PIN_LOCATION)}
          // disabled={!isValid || loader || !checked}
          title="Countinue"
        />
      </View>
    </View>
  );
}
