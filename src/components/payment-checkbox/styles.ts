import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
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
      paddingVertical: 15,
    },
    rdbHeading: {
      fontFamily: 'Rubik-Bold',
      fontSize: 15,
    },
    rdbSubHeading: {
      fontSize: 15,
      width: '70%',
    },
    iconCircleView: {
      backgroundColor: '#92d76a',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });
export default makeStyles;
