import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';

import Check from '../../assets/images/svgs/tick-medication-icon';
import colors from '../../utils/themes/light-colors';

import styles from './styles';

type Props = {
  checked: boolean;
  setChecked: any;
  style?: any;
  checkSizeHeight?: number;
  checkSizeWidth?: number;
};

const CheckBox = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.setChecked(!props.checked)}
      style={[styles.checkbox, {borderColor: '#000000'}, props.style]}>
      {props.checked && (
        <Check
          height={props.checkSizeHeight ? props.checkSizeHeight : 12}
          width={props.checkSizeWidth ? props.checkSizeWidth : 12}
          fill={colors.text}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;
