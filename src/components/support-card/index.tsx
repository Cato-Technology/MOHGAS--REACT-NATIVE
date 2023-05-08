import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import makeStyles from './styles';

type Props = {
  icon?: any;
  title?: string;
  description?: string;
  onPress?: any;
};

const SupportCard = ({title, icon, description, onPress}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={[styles.circleView]}>{icon}</View>
      <View style={{marginLeft: 10}}>
        <Text style={styles.middleText}>{title}</Text>
        <Text style={styles.detailText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SupportCard;
