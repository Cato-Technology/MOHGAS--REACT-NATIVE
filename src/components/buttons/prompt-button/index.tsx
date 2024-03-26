import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import makeStyles from './styles';
import {Button as PaperButton} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  marginHorizontal?: number;
  marginVertical?: number;
  disabled?: boolean;
  onPress?: any;
  title?: string;
  svg?: any;
  btnColor?: any;
};

export default function PromptButton(props: Props) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
//   const horizontal = props.marginHorizontal ? props.marginHorizontal : 20;
//   const vertical = props.marginVertical ? props.marginVertical : 20;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={{
        paddingVertical: 5, 
        alignItems: 'center', 
       }}
      >
      <View
        style={[
          styles.btnContainer,
          {
            backgroundColor: props.disabled
              ? '#808080'
              : props.btnColor
              ? props.btnColor
              : '#4ca757',
          },
        ]}>
        <Text style={styles.label}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
