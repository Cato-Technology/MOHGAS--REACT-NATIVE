import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';
import {capitalizeFirstLetter} from '../../utils/functions/general-functions';

type Props = {
  onPressEdit?: any;
  onPressDelete?: any;
  title?: String;
  subTitle?: String;
  price?: String;
  icon?: any;
  srNo?: String;
  style?: any;
};

const BranchCard = ({
  onPressEdit,
  onPressDelete,
  title,
  subTitle,
  price,
  icon,
  srNo,
  style,
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
        <View style={[styles.circleView, style]}>{icon}</View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.middleText}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.detailText, {width: '60%'}]}>{subTitle}</Text>
            <Text
              style={[
                styles.detailText,
                {
                  color:
                    srNo == 'pending'
                      ? '#ebae4f'
                      : srNo == 'reject'
                      ? 'red'
                      : '#000',
                },
              ]}>
              {capitalizeFirstLetter(srNo)}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.headingText}>{price}</Text>
    </View>
  );
};

export default BranchCard;
