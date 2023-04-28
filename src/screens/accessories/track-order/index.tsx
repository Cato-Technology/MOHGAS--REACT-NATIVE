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
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import MapView from 'react-native-maps';

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
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import HeaderBottom from '../../../components/header-bottom';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';
const stepIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4ca757',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4ca757',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#4ca757',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4ca757',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#4ca757',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#4ca757',
};
export default function TrackOrder({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [currentPage, setCurrentPage] = React.useState<number>(3);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

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
            title={'Your Order'}
            back={true}
            rightIcon={<Icon6 name="setting" size={25} color={colors.text} />}
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Track Order"
              //subTitle={'Review Past and Present Orders'}
              contentStyle={{marginTop: 30}}
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
          </View>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              width: widthPercentageToDP(88),
              height: heightPercentageToDP(20),
            }}
          />
          <View style={{paddingHorizontal: 20, width: '100%', marginTop: 10}}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontWeight: '500',
                textAlign: 'left',
                width: '100%',
              }}>
              Delivery details
            </Text>
            <View style={styles.container2}>
              <View style={styles.stepIndicator}>
                <StepIndicator
                  customStyles={stepIndicatorStyles}
                  stepCount={4}
                  direction="vertical"
                  currentPosition={currentPage}
                  labels={dummyData.data.map(item => item.title)}
                  renderLabel={number => (
                    <View style={{width: 220}}>
                      {number.position == 0 && (
                        <View>
                          <Text style={{color: '#4ca757', fontWeight: 'bold'}}>
                            Oder Picked by
                          </Text>
                          <Text>Desmond philip</Text>
                          <Text style={{color: 'gray'}}>Holy Gas Ltd</Text>
                        </View>
                      )}
                      {number.position == 1 && (
                        <View>
                          <Text style={{color: '#4ca757', fontWeight: 'bold'}}>
                            Order way to delivery
                          </Text>
                          <Text>Desmond philip</Text>
                          <Text>
                            Your order is on the way delivey{'\n'} patner will
                            arrive in 3 mins
                          </Text>
                        </View>
                      )}
                      {number.position == 2 && (
                        <View>
                          <Text style={{color: '#4ca757', fontWeight: 'bold'}}>
                            Order delivered
                          </Text>
                          <Text>10 Main Street, kalabar, Nigeria</Text>
                          <Text>
                            Your order is on the way delivey{'\n'} patner will
                            arrive in 3 mins
                          </Text>
                          <Text style={{color: 'gray'}}> 05353535355</Text>
                        </View>
                      )}
                      {number.position == 3 && (
                        <View>
                          <Text style={{color: '#4ca757', fontWeight: 'bold'}}>
                            Payment Confirmed
                          </Text>
                          <Text>10 Main Street, kalabar, Nigeria</Text>
                          <Text>Payment Recived'</Text>
                        </View>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
