import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import GradientButton from '../buttons/gradient-button';
import InputWithLabel from '../input-with-label';
import makeStyles from './styles';

type Props = {
  titleInput?: string;
  btnTitle?: string;
  footerTextInput?: string;
  amount?: string;
  setAmount?: any;
  onPress?: any;
  error?: any;
};

const AmountPickerView = ({
  titleInput,
  btnTitle,
  footerTextInput,
  amount,
  setAmount,
  onPress,
  error,
}: Props) => {
  const navigations = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.main}>
      <View style={styles.firstRow}>
        <TouchableOpacity onPress={() => setAmount('500')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '500' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '500' ? '#fff' : '#000'},
              ]}>
              ₹ 500
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAmount('5000')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '5000' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '5000' ? '#fff' : '#000'},
              ]}>
              ₹ 5,000
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAmount('10000')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '10000' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '10000' ? '#fff' : '#000'},
              ]}>
              ₹ 10,000
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={[styles.firstRow, {marginTop: heightPercentageToDP(2)}]}>
        <TouchableOpacity onPress={() => setAmount('20000')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '20000' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '20000' ? '#fff' : '#000'},
              ]}>
              ₹ 20,000
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAmount('50000')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '50000' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '50000' ? '#fff' : '#000'},
              ]}>
              ₹ 50,000
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAmount('100000')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={
              amount == '100000' ? ['green', 'green'] : ['#F2BA4C', '#f9d849']
            }
            style={styles.oddView}>
            <Text
              style={[
                styles.oddBtnText,
                {color: amount == '100000' ? '#fff' : '#000'},
              ]}>
              ₹ 100,000
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <InputWithLabel
        label={titleInput ? titleInput : 'Amount'}
        footerTextInput={footerTextInput}
        leftIcon={<Icon name="rupee" size={20} color="#fff" />}
        labelStyle={{
          // fontFamily: fonts.mulishSemiBold,
          color: colors.yellowHeading,
          fontSize: 15,
        }}
        keyboardType={'numeric'}
        placeholder={'Eg. 10000'}
        containerStyles={{paddingHorizontal: 20}}
        onChange={text => setAmount(text)}
        value={amount + ''}
        error={error}
      />
      {btnTitle && (
        <View
          style={{
            paddingHorizontal: widthPercentageToDP(8),
            paddingVertical: heightPercentageToDP(2),
          }}>
          <GradientButton
            onPress={onPress}
            disabled={false}
            title={btnTitle ? btnTitle : 'Submit'}
          />
        </View>
      )}
    </View>
  );
};

export default AmountPickerView;
