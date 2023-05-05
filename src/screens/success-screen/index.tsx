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
} from 'react-native';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
} from '../../components';

import SCREENS from '../../utils/constants';

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
import AuthContext from '../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../components/buttons/gradient-button';
import {authService} from '../../services';
import ErrorModal from '../../components/error-modal';
import Logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SuccessImage} from '../../assets/images/svgs';
export default function SuccessScreen({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [loader, setLoader] = useState(false);

  const item = route?.params?.item;
  const render = route?.params?.render;

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />
      <ErrorModal
        onPress={() => setLoginError(!loginError)}
        visible={loginError}
      />

      <View
        style={{
          width: '100%',
          flex: 1,

          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 20,
          }}>
          <Icon
            name={'close'}
            size={RFValue(20)}
            color={'#000000'}
            onPress={() => navigation.navigate(SCREENS.LOGIN)}
          />
        </View>
        <View style={styles.icon} />
        {render == 'UpdatePrice' && (
          <View
            style={{
              marginTop: '65%',
              paddingHorizontal: 30,
              alignItems: 'center',
            }}>
            <SuccessImage width={50} height={50} />
            <Text style={[styles.heading, {fontSize: RFValue(16)}]}>
              {item.title}
            </Text>
            <Text style={styles.detailText}>{item.secondTitle}</Text>
            <Text style={styles.detailText}>{item.oldPrice}</Text>
            <Text style={styles.detailText}>{item.newPrice}</Text>

            <View style={{marginTop: '15%'}}>
              <GradientButton
                onPress={() => navigation.goBack()}
                disabled={false}
                title={'Back to Dashboard'}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
