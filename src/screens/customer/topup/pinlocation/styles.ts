import { StyleSheet } from 'react-native';

// import colors from 'assets/colors';
import { RFValue } from 'react-native-responsive-fontsize';
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
    searchContainer: {
      zIndex: 1,
      position: "absolute",
      width: "90%",
      backgroundColor: "white",
      shadowColor: "black",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
      padding: 8,
      borderRadius: 8,
      margin: 8,
      alignSelf: "center"
    },
    searchInput: {
      borderColor: colors.primaryGreen,
      borderWidth: 1
    }
  });
export default makeStyles;
