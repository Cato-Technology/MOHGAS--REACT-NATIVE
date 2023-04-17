import React from 'react';
import {Linking, Text, View} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Config from 'react-native-config';
import {Switch, TouchableRipple} from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SCREENS from 'utils/constants';
import {
  BioAboutIcon,
  BioDependent,
  BioLogout,
  BioNotification,
  BioPolicies,
  BioSupport,
  BioSettings,
} from 'assets/images/svgs';

import makeStyles from './styles';
import AuthContext from 'utils/auth-context';

const AccountMenu = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const auth = React.useContext(AuthContext);
  const openMessenger = () => {
    // Linking.openURL(Config.MESSENGER_URL);
  };

  return (
    <View style={styles.container}>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() => navigation.navigate(SCREENS.DEPOSIT)}
        style={styles.singleItem}>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioDependent width={5} height={5} />
            <Text style={styles.text}>Deposit</Text>
          </View>
          <View style={styles.iconWithSecondText}>
            <Fontisto name="angle-right" size={22} color={colors.secondary} />
          </View>
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() => navigation.navigate(SCREENS.PAYMENTMETHODS)}
        style={styles.singleItem}>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioDependent width={5} height={5} />
            <Text style={styles.text}>Payment Methods</Text>
          </View>
          <View style={styles.iconWithSecondText}>
            <Fontisto name="angle-right" size={22} color={colors.secondary} />
          </View>
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() => navigation.navigate(SCREENS.WITHDRAW)}
        style={styles.singleItem}>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioSettings width={5} height={5} />
            <Text style={styles.text}>Withdraw</Text>
          </View>
          <Fontisto name="angle-right" size={22} color={colors.secondary} />
        </>
      </TouchableRipple>

      {/* divider */}
      {/* <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        onPress={() => openMessenger()}>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioSupport width={5} height={5} />
            <Text style={styles.text}>Deposit/Withdraw Request History</Text>
          </View>
          <Fontisto name="angle-right" size={22} color={colors.secondary} />
        </>
      </TouchableRipple> */}
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        // onPress={() =>
        //   Linking.openURL(Config.ABOUT_US)
        // }
      >
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioAboutIcon width={5} height={5} />
            <Text style={styles.text}>About</Text>
          </View>
          <Fontisto name="angle-right" size={22} color={colors.secondary} />
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        style={styles.singleItem}
        onPress={() =>
          navigation.navigate(SCREENS.TERMS_AND_PRIVACY, {
            privacyPolicy: false,
            headerHome: true,
            disableData: false,
          })
        }>
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BioPolicies width={5} height={5} />
            <Text style={styles.text}>Policies</Text>
          </View>
          <Fontisto name="angle-right" size={22} color={colors.secondary} />
        </>
      </TouchableRipple>
      {/* divider */}
      <View style={styles.divider} />
      <TouchableRipple
        onPress={() => auth.authContext.signOut()}
        style={styles.singleItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BioLogout width={4.5} height={4.5} />
          <Text style={styles.text}>Logout</Text>
        </View>
      </TouchableRipple>

      <View style={styles.divider} />
    </View>
  );
};

export default AccountMenu;
