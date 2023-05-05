import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';

type Props = {
  onPressEdit?: any;
  onPressDelete?: any;
  title?: String;
  storeManager?: String;
  address?: String;
  lastSeen?: String;
  status?: String;
  price?: String;
  firstLetter?: string;
  srNo?: Number;
  style?: any;
};

const DetailCard = ({
  onPressEdit,
  onPressDelete,
  title,
  storeManager,
  address,
  lastSeen,
  status,
  price,
  firstLetter,
  srNo,
  style,
}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{paddingRight: 13}}>{srNo}</Text>
        <View style={[styles.circleView, style]}>
          <Text style={styles.middleText}>{firstLetter}</Text>
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.middleText}>{title}</Text>
          <Text style={styles.detailText}>{storeManager}</Text>
          <Text style={styles.detailText}>{address}</Text>
          <Text style={styles.detailText}>{lastSeen}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.detailText, {color: 'green', textAlign: 'right'}]}>
          {status}
        </Text>
        <Text style={[styles.detailText, {textAlign: 'right'}]}>
          Ammount in wallet
        </Text>
        <Text style={[styles.detailText, {textAlign: 'right'}]}>{price}</Text>
      </View>
    </View>
  );
};

export default DetailCard;
