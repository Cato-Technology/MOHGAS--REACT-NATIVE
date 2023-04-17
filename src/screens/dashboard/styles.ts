import {StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export default StyleSheet.create({
  contentView: {
    flex: 1,
    paddingHorizontal: widthPercentageToDP(3),
  },
});
