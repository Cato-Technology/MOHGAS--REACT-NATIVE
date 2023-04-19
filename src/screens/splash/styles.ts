import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
    },
    logo: {
      width: 130,
      height: 100,
    },
    text: {
      color: '#fff',
      fontSize: RFValue(18),
    },
  });

export default makeStyles;
