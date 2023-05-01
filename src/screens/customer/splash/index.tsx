import {Image, View, Text} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import Logo from '../../assets/images/splash-logo.png';

import makeStyles from './styles';

export default function Splash() {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} resizeMode="contain" />
      <Text style={styles.text}>Your No 1. Cooking Gas App</Text>
    </View>
  );
}
