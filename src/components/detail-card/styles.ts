import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      marginTop: heightPercentageToDP(2),

      paddingVertical: heightPercentageToDP(1),
      borderRadius: widthPercentageToDP(2),
      width: '95%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    entityText: {
      color: '#000000',
      marginTop: 2,
      fontFamily: 'Rubik-Regular',
    },
    middleText: {
      color: '#000000',
      marginTop: 2,

      fontFamily: 'Rubik-Regular',
    },
    detailText: {
      color: 'gray',
      marginTop: 2,
      fontSize: 9,
      fontFamily: 'Rubik-Regular',
    },
    headingText: {
      color: '#000000',
      marginTop: 12,
      fontSize: 10,

      fontFamily: 'Rubik-Regular',
    },
    circleView: {
      backgroundColor: '#e0eff8',
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });
export default makeStyles;
