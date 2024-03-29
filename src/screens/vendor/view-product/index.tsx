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
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
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
export default function ViewProductVendor({navigation, route}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const auth = React.useContext(AuthContext);
  const authContext = React.useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log('item', route.params.item);
  let item = route?.params?.item;
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
            <View style={{height: 8}} />

            <Image
              style={{height: 200, width: '100%'}}
              source={{uri: item?.accessories_image}}
              resizeMode={'cover'}
            />
            <View style={{height: 8}} />
            <Text style={{color: 'gray', fontSize: 16}}>
              {item?.accessories_name}
            </Text>
            <Text style={{color: '#000000', fontSize: 16}}>
              N {item?.price}
            </Text>
            <View style={{height: 8}} />
            <Text style={{color: '#000000', fontSize: 12}}>
              <AntDesign name="star" size={12} color={'#debf5a'} />
              {item?.rating ? item?.rating : '-'}
              {'   '}|{'   '}
              {item?.no_of_solds ? item?.no_of_solds : '-'} Solid{'   '}|{'   '}
              {item?.reviews ? item?.reviews : '-'} Reviews
            </Text>
            <View style={{height: 8}} />
            <Text style={{color: 'gray', fontSize: 13}}>
              {item?.description ? item?.description : '-'}
            </Text>
            <View style={{height: 8}} />
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Rubik-Bold',
                fontSize: 16,
              }}>
              Size
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  styles.tagText,
                  {backgroundColor: '#4ca757', color: '#fff'},
                ]}>
                {item?.size_of_product}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: widthPercentageToDP(3),
                paddingVertical: heightPercentageToDP(2),
                zIndex: -1,
                marginTop: 50,
              }}>
              <GradientButton
                onPress={() =>
                  navigation.navigate(SCREENS.UPDATE_PRICE, {
                    item: item,
                    render: 'product',
                  })
                }
                // disabled={!isValid || loader || !checked}
                title="Edit Price"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
