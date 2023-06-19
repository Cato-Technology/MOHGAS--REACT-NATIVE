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
      alignItems: 'center',
      paddingVertical: heightPercentageToDP(1),
      borderRadius: widthPercentageToDP(2),
      width: '93%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 15,
    },

    entityText: {
      color: '#000000',
      marginTop: 2,
      //fontFamily: 'Poppins-SemiBold',
    },
    middleText: {
      color: '#000000',
      marginTop: 2,

      //fontFamily: 'Poppins-SemiBold',
    },
    detailText: {
      color: '#000000',
      marginTop: 2,
      fontSize: 9,

      //fontFamily: 'Poppins-Regular',
    },
    headingText: {
      color: '#000000',
      marginTop: 12,

      //fontFamily: 'Poppins-Bold',
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
