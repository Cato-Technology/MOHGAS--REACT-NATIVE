import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import makeStyles from './styles';

function RadioButton(props) {
  return (
    <View
      style={[
        {
          height: 35,
          width: 35,
          borderRadius: 18,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 18,

            backgroundColor: '#4ca634',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="check" size={25} color={'#fff'} />
        </View>
      ) : null}
    </View>
  );
}
type Props = {
  title?: string;
  subTitle?: string;
  id?: number;
  check?: boolean;
  onPress?: any;
};
const PaymentCheckBox = ({title, subTitle, check, onPress, id}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.rdbView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.iconCircleView}>
          <Entypo name="wallet" size={25} color={'#fff'} />
        </View>
        <View style={{paddingLeft: 15, width: '80%'}}>
          <Text style={styles.rdbHeading}>{title}</Text>
          <Text style={styles.rdbSubHeading}>{subTitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => onPress(id)}>
        <RadioButton selected={check} />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentCheckBox;
