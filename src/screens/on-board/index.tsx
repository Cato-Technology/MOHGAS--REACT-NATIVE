import {
  View,
  Text,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import SCREENS from '../../utils/constants';
import Cylinder from '../../assets/images/cylinder.png';
import {RFValue} from 'react-native-responsive-fontsize';
const OnBoard = ({navigation}) => {
  return (
    <ImageBackground
      source={Cylinder}
      resizeMode="cover"
      style={styles.mainView}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '75%',
        }}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Rubik-Bold',
            fontSize: RFValue(26),
          }}>
          Everything{'\n'}You Need!
        </Text>
        <Text style={styles.descText}>
          Our Reliable and efficient service offers a wide range of cooking gas
          and accessories change to adapt your specific needs.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 55,
            marginTop: 20,
          }}>
          <View style={styles.dotView} />
          <View style={styles.dotView} />
          <View style={[styles.dotView, {backgroundColor: '#fff'}]} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
          style={styles.btnView}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.bottomText}>Terms and Use</Text>
          <Text style={styles.bottomText}>Privacy and Cookies</Text>
        </View>
        <Text style={[styles.bottomText, {marginTop: 10}]}>Version 10.12</Text>
      </View>
    </ImageBackground>
  );
};

export default OnBoard;
const styles = StyleSheet.create({
  mainView: {flex: 1},
  bottomView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  bottomText: {
    color: '#c7c3b9',
    fontSize: RFValue(10),
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 10,
  },
  descText: {
    color: '#c7c3b9',
    fontSize: RFValue(13),
    textAlign: 'center',
    width: '92%',
  },
  dotView: {width: 14, height: 5, backgroundColor: '#4ca757'},
  btnView: {
    width: '48%',
    backgroundColor: '#fff',
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 6,
  },
  btnText: {
    color: '#4ca757',
    fontSize: RFValue(16),
    textAlign: 'center',
    width: '92%',
    fontFamily: 'Rubik-Bold',
  },
});
