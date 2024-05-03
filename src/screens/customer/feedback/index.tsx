/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  // Keyboard,
  // Platform,
  ScrollView,
  Text,
  // TouchableOpacity,
  View,
  // Image,
  // Pressable,
  // KeyboardAvoidingView,
  FlatList,
  // SafeAreaView,
} from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
// import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import qs from 'qs';
export const PASS_REGIX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
import AuthContext from '../../../utils/auth-context';
import { useTheme } from '@react-navigation/native';
import GradientButton from '../../../components/buttons/gradient-button';
import HeaderBottom from '../../../components/header-bottom';
import { Dropdown } from 'react-native-element-dropdown';
import { showMessage } from 'react-native-flash-message';
import { mainServics } from '../../../services';
import FeedbackItem from './feebackItem';
const data = [
  { label: 'Item 1', value: '1' },

];

export default function Feedback({ navigation, route }) {
  let item = route?.params?.item;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  console.log('item', item?.id);

  const authContext = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(false);
  const [feedbackData, setFeedbackData] = useState();
  const [text, setText] = useState(null);

  useEffect(() => {

    loadFeedbacks();
  }, [])

  const loadFeedbacks = async () => {
    setLoader(true);

    try {
      const response = await mainServics.getFeedbacks(authContext?.userData?.user_id);
      console.log(response, authContext?.userData?.user_id);
      setFeedbackData(response?.data);
    } catch (e) {
      console.log(e);
    }
    setLoader(false);
  }

  const handleSubmit = async () => {

    setLoader(true);

    try {

      let data = {
        user_id: authContext?.userData?.user_id,
        feedback_text: text
      }
      const result = await mainServics.postFeedback(data);
      console.log('result', result);
      if (result.status) {
        showMessage({
          message: result?.message,
          type: 'success',
          icon: 'success',
        });

        setLoader(false);
      } else {
        showMessage({
          message: result?.message,
          type: 'warning',
          icon: 'warning',
        });
        setLoader(false);
      }

      setText("");
      loadFeedbacks();

    } catch (e) {
      setLoader(false);
      console.log('error==>', e);
      showMessage({
        message: JSON.stringify(e),
        type: 'danger',
        icon: 'warning',
      });
    }

  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loader} />
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <View
        style={{
          width: '100%',
          height: heightPercentageToDP(100),
          paddingHorizontal: 10,
          alignItems: 'center',
          // backgroundColor: 'red'
        }}>
        <View style={styles.icon} />
        <Header
          title={'Feedback'}
          back={true}
          rightIcon={
            <AntDesign name="setting" size={25} color={colors.text} />
          }
        />
        <View style={{ width: '100%', paddingHorizontal: 20 }}>
          <HeaderBottom
            subTitle={'Let us know what you think'}
            contentStyle={{ marginTop: 50 }}
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

          {/* <ScrollView keyboardShouldPersistTaps={'handled'}> */}
          <FlatList
            data={feedbackData}
            contentContainerStyle={{ marginTop: 10 }}
            renderItem={({ item, index }) => (
              <FeedbackItem
                data={item}
              />
            )}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No Data</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </ScrollView> */}

        </View>

      </View>

      <View
        style={{
          paddingHorizontal: widthPercentageToDP(3),
          paddingVertical: heightPercentageToDP(2),
          zIndex: 100,
          marginTop: 50,
          position: 'absolute',
          bottom: heightPercentageToDP(0),
          left: 0,
          right: 0,
        }}>
        <InputWithLabel
          labelStyle={{
            color: colors.yellowHeading,
            fontSize: 15,
          }}
          keyboardType={'numeric'}
          onChange={txt => setText(txt)}
          placeholder={'Type here...'}
        />
        <GradientButton
          onPress={() => handleSubmit()}
          disabled={!text}
          title="Submit"
        />
      </View>
    </View>
  );
}