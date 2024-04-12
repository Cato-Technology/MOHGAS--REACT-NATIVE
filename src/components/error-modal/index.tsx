import {Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import GradientButton from '../../components/buttons/gradient-button';

import styles from './styles';

type Props = {
  onPress: any;
  visible: boolean;
  header?: any;
  message?: any;
};

export default function ErrorModal({visible = false, onPress, header, message}: Props) {
  const {colors} = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <View style={styles.view}>
        <Text style={styles.heading}>{header ? header : 'Awaiting verification!'}</Text>
        <Text style={styles.text}>
          {
            message
            ?
            message
            :
          "This account hasn't been approved by our customer support"
          }
        </Text>
        <View style={{marginTop: 20}}>
          <GradientButton
            onPress={onPress}
            marginHorizontal={10}
            marginVertical={10}
            title="Ok"
          />
        </View>
      </View>
    </View>
  );
}
