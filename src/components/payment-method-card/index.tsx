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
  bankName?: String;
  accountTitle?: String;
  accountNumber?: String;
  accountType?: String;
  ifscCode?: String;
  branch?: String;
};

const PaymentMethodCard = ({
  onPressEdit,
  onPressDelete,
  bankName,
  accountTitle,
  accountNumber,
  accountType,
  ifscCode,
  branch,
}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.main}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.middleText}>{bankName}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '20%',
          }}>
          <Icon name="edit" size={20} color="#fff" onPress={onPressEdit} />
          <AntIcon
            name="delete"
            size={22}
            color="red"
            onPress={onPressDelete}
          />
        </View>
      </View>

      <Text style={styles.detailText}>{accountTitle}</Text>
      <Text style={styles.headingText}>{accountNumber}</Text>
      <Text style={styles.entityText}>IFSC Code: {ifscCode}</Text>
      <Text style={styles.entityText}>Account Type: {accountType}</Text>
      <Text style={styles.entityText}>Branch Name: {branch}</Text>
    </View>
  );
};

export default PaymentMethodCard;
