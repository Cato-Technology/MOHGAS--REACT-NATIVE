import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      width: '40%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    entityText: {
      color: '#000000',
      marginTop: 2,
      //fontFamily: 'Poppins-SemiBold',
    },
    middleText: {
      color: '#3478c3',
      marginTop: 2,
      fontWeight: 'bold',
      fontSize: 12,

      //fontFamily: 'Poppins-SemiBold',
    },
    detailText: {
      color: '#000',
      marginTop: 2,
      fontSize: 12,
      width: 100,

      //fontFamily: 'Poppins-Regular',
    },
    headingText: {
      color: '#000000',
      marginTop: 12,

      //fontFamily: 'Poppins-Bold',
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
