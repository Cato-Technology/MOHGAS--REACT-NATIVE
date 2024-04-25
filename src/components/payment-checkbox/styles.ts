import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    rdbView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 1,
    },
    rdbHeading: {
      fontFamily: 'Rubik-Bold',
      fontSize: 15,
      color: '#000000',
    },
    rdbSubHeading: {
      fontSize: 11.5,
      width: '70%',
      color: '#000000',
    },
    iconCircleView: {
      backgroundColor: '#92d76a',
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });
export default makeStyles;
