import {Dimensions, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
    },

    entityText: {
      color: '#000000',
      marginTop: 2,
      //fontFamily: 'Poppins-SemiBold',
    },
    middleText: {
      color: '#000',
      marginTop: 2,
      fontWeight: 'bold',
      fontSize: 12,

      //fontFamily: 'Poppins-SemiBold',
    },
    detailText: {
      color: '#000',
      marginVertical: 15,
      fontSize: 12,
      width: '100%',
      flex: 1,
      flexWrap: 'wrap',
      paddingHorizontal: 15,

      //fontFamily: 'Poppins-Regular',
    },
    headingText: {
      color: '#000000',
      marginTop: 12,

      //fontFamily: 'Poppins-Bold',
    },
    headerStyle: {
      backgroundColor: '#f5f5f5',
      padding: 15,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
export default makeStyles;
