import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import AntIcon from 'react-native-vector-icons/AntDesign';
import { noimage } from "../../assets";
import makeStyles from './styles';

type Props = {
  title?: String;
  price?: String;
  image?: any;
  onPress?: any;
};

const ProductView = ({ title, image, price, onPress }: Props) => {
  const navigations = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [imageError, setImageError] = useState(false);

  const imageUrl = `https://admin.mohgasapp.com/assets/images/accessories/${image}`;
  // Local image path for the fallback image
  const fallbackImagePath = require('../../assets/noimage.png');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        flex: 1 / 4,
        height: 110,
      }}>
      <Image
        style={{ height: 70, width: 70 }}
        source={imageError ? fallbackImagePath : { uri: imageUrl }}
        resizeMode={'contain'}
        onError={() => setImageError(true)}
      />

      <Text style={styles.middleText}>{title}</Text>

      <Text style={[styles.detailText]}>{price}</Text>
    </TouchableOpacity>
  );
};

export default ProductView;
