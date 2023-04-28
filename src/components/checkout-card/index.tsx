import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import makeStyles from './styles';

type Props = {
  onPressEdit?: any;
  onPressDelete?: any;
  title?: String;
  subTitle?: String;
  price?: String;
  icon?: any;
  srNo?: String;
};

const CheckOutCard = ({
  onPressEdit,
  onPressDelete,
  title,
  subTitle,
  price,
  image,
  srNo,
}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image style={{height: 55, width: 55}} source={image} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.middleText}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.detailText}>{subTitle}</Text>
              <Text style={[styles.detailText, {width: '60%'}]}>{price}</Text>
            </View>
            <Text style={{fontSize: 18, color: 'gray'}}>
              {'    '}
              {'< '}
              <Text style={{fontSize: 10, color: '#000000'}}>2</Text>
              {' >'}
            </Text>
          </View>
        </View>
      </View>
      <Icon name="ios-trash-outline" size={20} color={colors.text} />
    </View>
  );
};

export default CheckOutCard;
