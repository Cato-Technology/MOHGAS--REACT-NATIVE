import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

import styles from './styles';
import colors from '../../utils/themes/light-colors';

type Props = {
  vendorRender: boolean;
  fontSize?: any;
  setVendorRender?: any;
  onTimeOut?: any;
  setCount?: any;
  count?: any;
};

export default function ConnectingVendor({
  vendorRender,
  fontSize,
  onTimeOut,
  setCount,
  count,
}: Props) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  }
  useEffect(() => {
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount(c => c - 1);
        let timeLeftVar = secondsToTime(count);
        setHour(timeLeftVar.h);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log('timeout');
      onTimeOut();
    }
  }, [count]);
  return vendorRender ? (
    <View style={styles.overLay}>
      <View
        style={{
          width: '96%',
          backgroundColor: '#fff',
          paddingVertical: 12,
          marginHorizontal: 10,
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator color={'#8fcf8d'} size={fontSize ? fontSize : 60} />
        <View>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Rubik-Regular',
              width: '100%',
              fontSize: 16,
            }}>
            Connecting to Vendor...
          </Text>
          <Text
            style={{
              color: '#000000',
              fontFamily: 'Rubik-Bold',
              width: '100%',
              fontSize: 16,
              textAlign: 'center',
            }}>
            Emeka ani
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: '#e5493d',
              fontFamily: 'Rubik-Bold',
              width: '100%',
              fontSize: 16,
            }}>
            {minute < 9 ? '0' + minute : minute} :
            {second < 9 ? '0' + second : second}
          </Text>
        </View>
      </View>
    </View>
  ) : null;
}
