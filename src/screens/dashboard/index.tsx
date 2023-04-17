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
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/AntDesign';
import card from '../../assets/card.png';
import aImage from '../../assets/avatar.jpg';
import {Avatar} from 'react-native-paper';

import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  CheckBox,
  InputWithLabel,
  PaymentMethodCard,
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
export default function DashBoard({navigation}) {
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
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Good Afternoon
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Emeka Adams
              </Text>
              <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 10}}>
                <Icon4 name="crown" size={10} color="gray" /> Premium Member
              </Text>
            </View>
            <Avatar.Image size={45} source={aImage} />
          </View>
          <View style={[styles.backContainer, styles.extraStyle]}>
            <ScrollView horizontal={true}>
              {/* <TouchableOpacity
                style={styles.leftContainer}
                onPress={goToNewCard}>
                <Image source={add} style={styles.logoImage} />
                <MaterialIcon
                  name="plus"
                  size={30}
                  color={theme.cardTextColor}
                  style={styles.nexStyle}
                />
              </TouchableOpacity> */}
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
                  <Icon3 name="arrow-up" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Phone</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon name="angle-double-left" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Phone</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon2 name="line-scan" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Email</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <View style={styles.circleView}>
                  <Icon5 name="support-agent" size={25} color="#fff" />
                </View>
                <Text style={styles.centerViewText}>Phone</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>Recent Transcations</Text>
            <Text style={{color: 'gray'}}>
              View All <Icon6 name="arrowright" size={10} color="gray" />{' '}
            </Text>
          </View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={({item, index}) => (
              <PaymentMethodCard
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
