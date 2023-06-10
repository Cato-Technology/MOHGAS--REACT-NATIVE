/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import card from '../../../assets/card.png';
import aImage from '../../../assets/avatar.jpg';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {
  // ErrorModal,
  ActivityIndicator,
  // PhoneNumber,
  Header,
  InputWithLabel,
  ProductView,
} from '../../../components';

import SCREENS from '../../../utils/constants';

import makeStyles from './styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

// import i18next from 'i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../utils/auth-context';
import {useTheme} from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import HeaderBottom from '../../../components/header-bottom';
import VendorCard from '../../../components/vendor-card';
import LabResultModal from '../../../components/lab-results-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {Formik} from 'formik';
import {NAME} from '../../../utils/regix';
import {mainServics} from '../../../services';
import {showMessage} from 'react-native-flash-message';
import {GlobalState} from '../../../redux/global/GlobalState';
import {useDispatch, useSelector} from 'react-redux';
import {getVendorAccountDetials} from '../../../redux/global/actions';

export default function UpdateVendorAccount({navigation}) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const authContext = React.useContext(AuthContext);

  const [loader, setLoader] = useState(false);

  const backData = useSelector(
    (state: GlobalState) => state?.global?.vendorBankDetalis,
  );
  const handleSubmit = async values => {
    console.log('values', values);
    try {
      setLoader(true);
      let data = new FormData();
      data.append('account_title', values.account_title);
      data.append('account_number', values.account_number);
      data.append('bank', values.bank);
      const result = await mainServics.upDateVendorBankAccount(data);
      console.log('result', result);
      setLoader(false);
      if (result.status)
        navigation.navigate(SCREENS.SUCCESS_SCREEN, {
          render: 'UpdateBank',
          item: result?.data,
        });
      dispatch(getVendorAccountDetials());
    } catch (e) {
      setLoader(false);
      console.log('e', e);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  const BAccountSchema = useMemo(
    () =>
      Yup.object({
        account_title: Yup.string()
          // .required('First Name is Required')
          .matches(NAME, 'Account Title should only contain latin letters')
          .required('Account Title is Required'),
        account_number: Yup.string().required('Account Number is Required'),
        bank: Yup.string().required('Bank is Required'),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Update Account'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <HeaderBottom
              title="Holy Gas Ltd"
              subTitle={'Set up your Payout Account'}
              contentStyle={{marginTop: 50}}
              rightIcon={
                <View
                  style={{
                    backgroundColor: '#2f65a2',
                    height: 30,
                    borderRadius: 5,
                  }}>
                  <MaterialCommunityIcons name="sort" size={30} color="#fff" />
                </View>
              }
            />

            <Formik
              initialValues={{
                account_title: backData?.account_title
                  ? backData?.account_title
                  : '',
                account_number: backData?.account_number
                  ? backData?.account_number
                  : '',
                bank: backData?.bank ? backData?.bank : '',
              }}
              onSubmit={values => handleSubmit(values)}
              validationSchema={BAccountSchema}>
              {({
                handleSubmit,
                errors,
                handleChange,
                values,
                // isSubmitting,
                isValid,
                setFieldValue,
                touched,
                setFieldTouched,
              }) => (
                <View style={{alignItems: 'center'}}>
                  <InputWithLabel
                    labelStyle={{
                      fontFamily: 'Rubik-Regular',
                      color: colors.yellowHeading,
                      fontSize: 15,
                    }}
                    label={'Title of Account'}
                    onChange={handleChange('account_title')}
                    placeholder={'Ahmed Peter Hassan'}
                    error={touched.account_title ? errors.account_title : ''}
                    onBlur={() => setFieldTouched('account_title')}
                    value={values?.account_title}
                  />

                  <InputWithLabel
                    label={'Account Number'}
                    labelStyle={{
                      fontFamily: 'Rubik-Regular',
                      color: colors.yellowHeading,
                      fontSize: 15,
                    }}
                    onChange={handleChange('account_number')}
                    placeholder={'03435535545363'}
                    error={touched.account_number ? errors.account_number : ''}
                    onBlur={() => setFieldTouched('account_number')}
                    value={values.account_number}
                  />
                  <InputWithLabel
                    label={'Bank'}
                    labelStyle={{
                      fontFamily: 'Rubik-Regular',
                      color: colors.yellowHeading,
                      fontSize: 15,
                    }}
                    onChange={handleChange('bank')}
                    placeholder={'Guaranty Trust Bank'}
                    error={touched.bank ? errors.bank : ''}
                    onBlur={() => setFieldTouched('bank')}
                    value={values?.bank}
                  />
                  <View style={{width: '100%', paddingHorizontal: 20}}>
                    <View
                      style={{
                        paddingVertical: heightPercentageToDP(2),
                        zIndex: -1,
                        marginTop: 50,
                      }}>
                      <GradientButton
                        onPress={() => handleSubmit()}
                        disabled={!isValid || loader}
                        title="Update"
                      />
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
