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
      //fontFamily: fonts.bold,
      fontSize: RFValue(28),
      alignSelf: 'center',
      color: '#000000',
      fontWeight: 'bold',
      marginTop: 20,
    },
    inputLablel: {
      marginHorizontal: 20,
      //fontFamily: fonts.mulishBold,
      color: colors.white,
      fontSize: 15,
    },
    forgotPassword: {
      //fontFamily: fonts.mulishRegular,
      color: colors.blue,
      fontSize: RFValue(13),
    },
    orTxt: {
      marginHorizontal: 20,
      //fontFamily: fonts.mulishRegular,
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

    detailText: {
      fontSize: RFValue(12),
      fontWeight: '300',
      color: '#000000',
      textAlign: 'center',
      marginTop: 5,
    },
    pheading: {
      fontSize: RFValue(11),
      fontWeight: '500',
      color: '#000000',
      // marginTop: 5,
      paddingVertical: 10,
    },
    pdesc: {
      fontSize: RFValue(9),
      fontWeight: '200',
      color: '#000000',
      marginTop: 5,
    },
    centerText: {
      width: 230,
      fontSize: RFValue(18),
      fontWeight: '600',
      //  fontFamily: fonts.mulishRegular,
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
    cardContainer: {
      backgroundColor: '#51ac3e',
      width: '58%',
      height: 130,
      marginTop: 20,
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    gradientView: {
      width: 118,
      height: 118,
      borderRadius: 90,
      position: 'absolute',
      right: 10,
      top: 7,
      zIndex: -3,
    },
  });
export default makeStyles;
