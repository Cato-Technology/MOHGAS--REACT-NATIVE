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
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {PERMISSIONS, check, request} from 'react-native-permissions';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
  SupportCard,
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
import VendorCard from '../../../components/vendor-card';
import LabResultModal from '../../../components/lab-results-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getSupportData} from '../../../redux/global/actions';
import {State} from '../../../redux/global/GlobalState';
let cameraIs = false;
export default function CustomerSupport({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const authContext = React.useContext(AuthContext);
  const data = useSelector((state: State) => state?.global?.supportData);
  useEffect(() => {
    //authContext?.userData?.user_id
    let data = new FormData();
    data.append('user_id', 33);
    dispatch(getSupportData(data));
  }, [dispatch]);
  console.log('data', data);

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
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Support'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <HeaderBottom
              title="Support"
              subTitle={'How can we help?'}
              contentStyle={{marginTop: 50}}
              // rightIcon={
              //   <View
              //     style={{
              //       backgroundColor: '#2f65a2',
              //       height: 30,
              //       borderRadius: 5,
              //     }}>
              //     <MaterialCommunityIcons name="sort" size={30} color="#fff" />
              //   </View>
              // }
            />

            <Text
              style={{
                color: '#000000',
                fontFamily: 'Rubik-Bold',
                fontSize: 16,
                marginTop: 10,
              }}>
              Help Topics
            </Text>

            {/* <View
              style={{
                flexDirection: 'row',
                width: '95%',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <SupportCard
                icon={<Ionicons name="person" size={25} color={'#3478c3'} />}
                title={'Account Issues'}
                onPress={() => navigation.navigate(SCREENS.ACCOUNT_ISSUES)}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
              <SupportCard
                icon={<AntDesign name="copy1" size={25} color={'#3478c3'} />}
                title={'Order Issues'}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                justifyContent: 'space-between',
                marginTop: 40,
              }}>
              <SupportCard
                icon={<Entypo name="credit-card" size={25} color={'#3478c3'} />}
                title={'Transcations'}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
              <SupportCard
                icon={<Entypo name="swap" size={25} color={'#3478c3'} />}
                title={'Accessories'}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                justifyContent: 'space-between',
                marginTop: 40,
              }}>
              <SupportCard
                icon={
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={25}
                    color={'#3478c3'}
                  />
                }
                title={'Delivery Issues'}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
              <SupportCard
                icon={<Entypo name="wallet" size={25} color={'#3478c3'} />}
                title={'Wallet Issues'}
                description={
                  ' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                }
              />
            </View> */}
            <FlatList
              data={data}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={{
                width: '100%',
              }}
              renderItem={({item, index}) => (
                <View
                  style={{
                    marginLeft: 10,
                    marginTop: 20,
                  }}>
                  <SupportCard
                    icon={
                      <Ionicons name="person" size={25} color={'#3478c3'} />
                    }
                    title={item?.supprt_topic_name}
                    onPress={() => {
                      if (item?.id == 1) {
                        navigation.navigate(SCREENS.ACCOUNT_ISSUES);
                      }
                    }}
                    description={item?.support_topic_description}
                  />
                </View>
              )}
              ListEmptyComponent={() => (
                <Text style={styles.noDataText}>No Data</Text>
              )}
              keyExtractor={(item, index) => item.id.toString()}
            />
            <Text
              style={{
                color: '#000000',
                fontSize: 13,
                width: '100%',
                textAlign: 'center',
                marginTop: 20,
                fontFamily: 'Rubik-Regular',
              }}
              onPress={() => navigation.navigate(SCREENS.SEND_SUPPORT_ISSUE)}>
              Can't find the answer you are looking for?
            </Text>

            <View
              style={{
                backgroundColor: '#131a28',
                height: 60,
                borderRadius: 10,
                paddingHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <MaterialIcons name="support-agent" size={25} color={'#fff'} />
              <View style={{width: '40%'}}>
                <Text style={styles.lightText}>Support</Text>
                <Text style={styles.hardText}>080 123 456 789</Text>
              </View>

              <Fontisto name="email" size={25} color={'#fff'} />
              <View style={{width: '40%'}}>
                <Text style={styles.lightText}>Send a message</Text>
                <Text style={styles.hardText}>info@mohgas.com</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
