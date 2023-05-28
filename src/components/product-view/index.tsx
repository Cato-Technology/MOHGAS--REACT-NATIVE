import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';

type Props = {
  title?: String;
  price?: String;
  image?: any;
  onPress?: any;
};

const ProductView = ({title, image, price, onPress}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        flex: 1 / 4,
        height: 110,
      }}>
      <Image style={{height: 70, width: 70}} source={image} />

      <Text style={styles.middleText}>{title}</Text>

      <Text style={[styles.detailText]}>{price}</Text>
    </TouchableOpacity>
  );
};

export default ProductView;
