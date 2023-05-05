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
  Button,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
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
export default function DashBoard({navigation, props}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const authContext = React.useContext(AuthContext);
  console.log('authContext==>', authContext);
  React.useEffect(() => {
    // Load the user data from storage when the app starts
    const loadUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('userData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log('data', data);
      } catch (e) {
        console.error('Failed to load user data from storage');
      }
    };
    loadUserData();
  }, []);

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
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginTop: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Wellcome</Text>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                {authContext?.userData?.full_name}
              </Text>

              <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 10}}>
                <Icon4 name="crown" size={10} color="gray" /> Premium Member
              </Text>
            </View>
            <Avatar.Image
              size={45}
              source={{uri: authContext?.userData?.image}}
            />
          </View>
          <View style={[styles.backContainer, styles.extraStyle]}>
            <ScrollView horizontal={true}>
              <View style={[styles.rightContainer, styles.extraContainer]}>
                <Image source={card} style={styles.styleImage} />
              </View>
              <View style={[styles.rightContainer, styles.extraContainer]}>
                <Image source={card} style={styles.styleImage} />
              </View>
            </ScrollView>
          </View>
          <View style={{width: '100%', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: 30,
                paddingHorizontal: 30,
              }}>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon3
                    name="arrow-up"
                    size={25}
                    color="#fff"
                    onPress={() =>
                      navigation.navigate(SCREENS.ADD_DELIVERY_ADDRESS, {
                        render: 'refill',
                      })
                    }
                  />
                </View>
                <Text style={styles.centerViewText}>Top Up</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon3
                    name="swap"
                    size={25}
                    color="#fff"
                    style={{
                      transform: [{rotate: '90deg'}],
                    }}
                  />
                </View>
                <Text style={styles.centerViewText}>Swap</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon2
                    name="line-scan"
                    size={25}
                    color="#fff"
                    onPress={() => navigation.navigate(SCREENS.ACCESSORIES)}
                  />
                </View>
                <Text style={styles.centerViewText}>Accessories</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon5 name="support-agent" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Support</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(SCREENS.ORDER_HISTORY)}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Recent Transcations</Text>
            <Text style={{color: 'gray'}}>
              View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={({item, index}) => (
              <DetailCard
                title={'Top Up - LPG 25kg'}
                subTitle={'Today - 02.15 PM'}
                price={'N12.34'}
                srNo={'#MGS74TY'}
                icon={<Icon3 name="arrow-up" size={25} color="#4ca757" />}
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
        </View>
      </ScrollView>
    </View>
  );
}
