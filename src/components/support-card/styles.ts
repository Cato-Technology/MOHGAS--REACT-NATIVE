import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: 70,
    },

    entityText: {
      color: '#000000',
      marginTop: 2,
      fontFamily: 'Rubik-Regular',
    },
    middleText: {
      color: '#3478c3',
      marginTop: 2,

      fontSize: 12,

      fontFamily: 'Rubik-Bold',
    },
    detailText: {
      color: '#000',
      marginTop: 2,
      fontSize: 12,
      width: 120,

      fontFamily: 'Rubik-Regular',
    },
    headingText: {
      color: '#000000',
      marginTop: 12,

      fontFamily: 'Rubik-Regular',
    },
    circleView: {
      backgroundColor: '#e0eff8',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
  });
export default makeStyles;
