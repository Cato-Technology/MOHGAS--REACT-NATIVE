import {StyleSheet} from 'react-native';

// import colors from 'assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    logo: {
      marginTop: 100,
      width: 250,
      height: 250,
    },
    label: {
      fontSize: RFValue(18),
      //fontFamily: 'Poppins-Regular',
      color: '#000000',
    },
    icon: {
      overflow: 'hidden',
      width: 500,
      height: 300,
      position: 'absolute',

      top: -100,
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      backgroundColor: '#f3faf5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontFamily: 'Rubik-Regular',
      fontSize: 24,
      alignSelf: 'center',
      color: colors.text,
      marginTop: 10,
    },
    inputLablel: {
      marginHorizontal: 20,
      fontFamily: 'Rubik-Regular',
      color: colors.white,
      fontSize: 15,
    },
    forgotPassword: {
      fontFamily: 'Rubik-Regular',
      color: colors.blue,
      fontSize: RFValue(13),
    },
    orTxt: {
      marginHorizontal: 20,
      fontFamily: 'Rubik-Regular',
      fontSize: RFValue(15),
      color: colors.black,
    },
    dash: {height: 0.5, backgroundColor: colors.blue, width: '40%'},
    orView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      alignSelf: 'center',
      marginVertical: 10,
    },
    socialLogins: {
      justifyContent: 'space-around',
      width: '30%',
      alignSelf: 'center',
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },
    noAccountTxt: {
      marginTop: 10,
      fontFamily: 'Rubik-Regular',
      fontSize: 16,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    errorMessage: {
      fontFamily: 'Rubik-Regular',
      fontSize: 12,
      color: colors.danger,
      marginLeft: 30,
    },
    checkbox: {
      alignSelf: 'center',
    },
    tcText: {
      flexDirection: 'row',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    tcTextStyle: {
      marginTop: -2,
      fontSize: 15,
      fontFamily: 'Rubik-Regular',
      color: '#000000',
      textAlign: 'center',
    },
    centerText: {
      width: '100%',
      fontSize: 18,
      fontFamily: 'Rubik-Regular',
      color: '#000000',
      textAlign: 'center',
      marginTop: 20,
    },
    circleView: {
      backgroundColor: '#4ca757',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    centerViewText: {
      fontSize: 12,
      fontFamily: 'Rubik-Regular',
      color: '#000000',
      paddingVertical: 10,
    },
  });
export default makeStyles;
