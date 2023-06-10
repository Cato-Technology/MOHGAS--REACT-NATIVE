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
      backgroundColor: '#efefef',
    },
    logo: {
      marginTop: 100,
      width: 250,
      height: 250,
    },
    icon: {
      overflow: 'hidden',
      width: 500,
      height: '50%',
      position: 'absolute',
      bottom: 0,

      borderTopRightRadius: 240,
      borderTopLeftRadius: 240,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      fontFamily: 'Rubik-Regular',
      fontSize: RFValue(28),
      alignSelf: 'center',
      color: '#000000',
      fontFamily: 'Rubik-Bold',
      marginTop: 20,
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
    },
    tcTextStyle: {
      marginTop: 3,
      fontSize: 15,
      fontFamily: 'Rubik-Regular',
      color: '#000000',
    },
    detailText: {
      fontSize: RFValue(12),

      color: '#000000',
      textAlign: 'center',
      marginTop: 10,
      fontFamily: 'Rubik-Regular',
    },
    centerText: {
      width: 230,
      fontSize: RFValue(18),
      fontWeight: '600',
      fontFamily: 'Rubik-Regular',
      color: '#000000',
      textAlign: 'center',
      marginTop: 10,
    },
    circleView: {
      backgroundColor: '#4ca757',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });
export default makeStyles;
