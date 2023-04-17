import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthPercentageToDP(92),
      borderRadius: widthPercentageToDP(3),
      borderWidth: 0.5,
      borderColor: colors.disable,
    },
    singleItem: {
      width: widthPercentageToDP(92),
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: widthPercentageToDP(3),
      paddingVertical: widthPercentageToDP(3),
      paddingLeft: widthPercentageToDP(4),
      alignItems: 'center',
    },
    text: {
      color: colors.text,
      //fontFamily: GlobalFonts.light,
      fontSize: RFValue(15),
      paddingLeft: widthPercentageToDP(3),
    },
    divider: {
      borderBottomWidth: 2,
      borderColor: colors.primary,
      opacity: 0.3,
    },

    iconWithSecondText: {
      flexDirection: 'row',
    },
  });

export default makeStyles;
