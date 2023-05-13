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
import {authService} from '../../../services';
import ErrorModal from '../../../components/error-modal';
import Logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SuccessImage} from '../../../assets/images/svgs';
import LinearGradient from 'react-native-linear-gradient';
export default function MohgasWallet({navigation, route}) {
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 20,
            zIndex: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Icon name={'close'} size={RFValue(20)} color={'#000000'} />
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text style={styles.heading}>Mohgas Account</Text>
          <Text style={styles.detailText}>
            Your instant Virtual bank Account
          </Text>

          <View style={{marginTop: '15%'}}>
            <View>
              <Text style={styles.pheading}>
                Your instant Virtual bank Account
              </Text>
              <Text style={styles.pdesc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                beatae commodi nisi ea saepe inventore ipsa, dicta minima iste
                numquam quibusdam, quos sapiente quidem earum sequi corrupti aut
                quae eveniet! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Accusamus eos facere error quasi animi.
                Molestias sint assumenda ratione deleniti minima rem aut
                dolorum! Animi corporis blanditiis vel a necessitatibus aliquid.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.pheading}>Where does it come from?</Text>
                <Text style={[styles.pdesc, {width: 150}]}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  beatae commodi nisi ea saepe inventore ipsa, dicta minima iste
                  numquam quibusdam, quos sapiente quidem earum sequi corrupti
                  aut quae eveniet! Lorem ipsum dolor sit amet consectetur,
                  adipisicing elit.
                </Text>
              </View>
              <View style={styles.cardContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#50a93c', '#407226']}
                  style={styles.gradientView}
                />
                <View>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 9}}>
                    Mohgas Wallet
                  </Text>
                  <View style={{paddingVertical: 20}}>
                    <Text style={{color: '#fff', fontSize: 9}}>Balance</Text>
                    <Text style={{color: '#fff', fontSize: 9}}>
                      N123.456.78
                    </Text>
                  </View>
                  <Text style={{color: '#fff', fontSize: 5}}>
                    ■ ■ ■ ■{'   '}■ ■ ■ ■{'   '}■ ■ ■ ■{'  '}■ ■ ■ ■
                  </Text>
                  <Text style={{color: '#fff', marginTop: 10, fontSize: 9}}>
                    {' '}
                    {authContext?.userData?.full_name}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.pheading}>Where can I get some?</Text>
              <Text style={styles.pdesc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                beatae commodi nisi ea saepe inventore ipsa, dicta minima iste
                numquam quibusdam, quos sapiente quidem earum sequi corrupti aut
                quae eveniet! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Accusamus eos facere error quasi animi.
                Molestias sint assumenda ratione deleniti minima rem aut
                dolorum! Animi corporis blanditiis vel a necessitatibus aliquid.
              </Text>
            </View>
            <View style={{paddingVertical: 40}}>
              <GradientButton
                onPress={() => navigation.navigate(SCREENS.FUND_WALLET)}
                disabled={false}
                title={'Continue'}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
