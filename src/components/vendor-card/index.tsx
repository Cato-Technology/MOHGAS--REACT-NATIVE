import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';
import {Avatar, Badge} from 'react-native-paper';

type Props = {
  image?: any;
  title?: String;
  orders?: String;
  rating?: String;
  price?: String;
  distance?: String;
  time?: String;
  pricePerKg?: String;
};

const VendorCard = ({
  image,
  title,
  orders,
  rating,
  distance,
  time,
  pricePerKg,
}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar.Image size={45} source={image} />
        <Badge style={{right: 12, backgroundColor: 'green'}} size={16} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.middleText}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[styles.detailText]}>Orders - {orders}</Text>
            <Text style={styles.detailText}>
              <AntDesign name="star" size={12} color={'#debf5a'} /> {rating}{' '}
              rating
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.detailText}>
          {distance} - {time}
        </Text>
        <Text style={styles.detailText}>{pricePerKg}</Text>
      </View>
    </View>
  );
};

export default VendorCard;
