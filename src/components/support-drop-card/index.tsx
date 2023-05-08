import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import makeStyles from './styles';

type Props = {
  icon?: any;
  title?: string;
  description?: string;
  onPress?: any;
};

const SupportDropCard = ({title, icon, description, onPress}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [drop, setDrop] = useState(false);
  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={styles.headerStyle}
        onPress={() => setDrop(!drop)}>
        <Text style={styles.middleText}>{title}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={25} color={'#000'} />
      </TouchableOpacity>
      {drop && <Text style={styles.detailText}>{description}</Text>}
    </View>
  );
};

export default SupportDropCard;
