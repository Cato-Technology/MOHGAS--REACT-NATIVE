import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import makeStyles from './styles';

type Props = {
  title?: string;
  bankName?: string;
  onPress?: any;
};

const CopyTextCard = ({title, bankName, onPress}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.detailText}>{title}</Text>
        <Text style={styles.bnkTitleText}>{bankName}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#F2BA4C', '#f9d849']}
          style={styles.oddView}>
          <Text style={styles.oddBtnText}>Copy</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CopyTextCard;
