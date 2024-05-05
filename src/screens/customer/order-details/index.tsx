import React, { useEffect, useState, useContext } from "react";
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
  Button,
  RefreshControl
} from 'react-native';

import {
  // ErrorModal,
  ActivityIndicator,
  Header,
} from '../../../components';

import Entypo from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SCREENS from '../../../utils/constants';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';



import { useTheme } from '@react-navigation/native';
import makeStyles from './styles';
import AuthContext from '../../../utils/auth-context';
import HeaderBottom from '../../../components/header-bottom';
import PromptButton from '../../../components/buttons/prompt-button';
import { orderServices } from '../../../services/orders-services';






export default function OrderDetails({ navigation, route }) {

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [vendorRender, setVendorRender] = useState(false);
  const [count, setCount] = useState(180); // seconds 180

  const [order, setOrder] = useState();


  useEffect(() => {
    let orderData = route?.params?.orderDetail;
    console.log("???????????????", orderData);
    setOrder(orderData);

  }, []);

  const orderActionSelect = async (action: number) => {
    const data = { order_id: order?.id, id: authContext?.userData?.user_id };

    try {
      const res = await orderServices.orderAction(data, action);
      console.log(res);
      await showMessage({
        message: res?.message,
        type: 'success',
        icon: 'success',
      })

    } catch (e) {
      console.log("--------", e)
      await showMessage({
        message: e?.errMsg?.message,
        type: 'warning',
        icon: 'danger',
      })
    }

  }

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator visible={isLoading} />
      {vendorRender && (
        <ConnectingVendor
          count={count}
          setCount={setCount}
          vendorRender={vendorRender}
          setVendorRender={setVendorRender}
          onTimeOut={onTimeEnd}
        />
      )} */}
      {/* <ErrorModal
        onPress={() => setLoginError(!loginError)} 
        visible={loginError}
      /> */}

      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={styles.icon} />
          <Header
            title={'Summary'}
            back={true}
            rightIcon={
              <AntDesign name="setting" size={25} color={colors.text} />
            }
          />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <HeaderBottom
              title="Order Summary"
              // subTitle={'Review what you have done'}
              contentStyle={{ marginTop: 50 }}
              rightIcon={
                <View
                  style={{
                    backgroundColor: '#2f65a2',
                    height: 30,
                    borderRadius: 5,
                  }}>
                  <Icon5 name="sort" size={30} color="#fff" />
                </View>
              }
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <View
              style={{
                paddingVertical: heightPercentageToDP(2),
              }}>
              {/* <Image
                style={{ width: '100%', height: 260 }}
                source={require('./gas_cylinder.png')}
                resizeMode="cover"
              /> */}
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.twoView}>
                  <View style={{ paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Order Details</Text>
                    </View>
                    <Text style={styles.descText} selectable={true}>
                      Order ID - {order?.invoice}
                    </Text>
                    <Text style={styles.descText}>
                      Order Status -{' '}
                      <Text style={[styles.descText, { color: '#eaa844' }]}>
                        {order?.status}
                      </Text>
                    </Text>

                    <Text style={styles.descText}>
                      {'Order Date - ' +
                        moment(order?.created_date).format(
                          'DD MMM YYYY HH:MM:A',
                        )}
                    </Text>
                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Business Address</Text>
                    </View>
                    <Text style={styles.descText} selectable={true}>
                      {order?.full_name}
                      {'\n'}
                      {order?.address}
                    </Text>
                  </View>
                </View>

                <View style={styles.twoView}>
                  <View style={{ paddingBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Vendor Details</Text>
                    </View>
                    <Text style={styles.descText} selectable={true}>Name: {order?.vendor_details?.branch_store_manager_name}</Text>
                    <Text style={styles.descText} selectable={true}>Phone: 0{order?.vendor_details?.branch_phone}</Text>
                    <Text style={styles.descText} selectable={true}>Email: {order?.vendor_details?.email}</Text>

                  </View>
                  <View style={{ paddingBottom: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                      }}>
                      <View style={styles.check}>
                        <Entypo name="check" size={9} color={'#fff'} />
                      </View>
                      <Text style={styles.heading}>Products Details</Text>
                    </View>
                    <Text style={styles.descText}>
                      Product Type -{' '}
                      {order?.order_type}
                    </Text>
                    <Text style={styles.descText}>
                      Size - {order?.size} kg
                    </Text>
                    <Text style={styles.descText}>
                      SubTotal - N{order?.sub_total}
                    </Text>
                    <Text style={styles.descText}>
                      Due - N {order?.grand_total}
                    </Text>
                    <Text style={[styles.descText, { color: 'pink' }]}>
                      See Breakdown
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.dropdown}>

                {true && <PromptButton
                  title={"Approve"}
                  onPress={() => { orderActionSelect(4) }}
                  btnColor={"green"}
                />}
              </View>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Rubik-Bold',
                  width: '100%',
                  textAlign: 'center',
                }}>
                N {order?.grand_total}
              </Text>
              <Text style={{ width: '100%', fontSize: 11, textAlign: 'center' }}>
                Service Charge: N{order?.service_charge}
                {'   '}|{'   '}Delivery Cost: N
                {order?.delivery_cost}
              </Text>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // sendNotification();
                    navigation.navigate(SCREENS.DASHBOARD);
                  }}
                  disabled={isLoading}
                  style={[
                    styles.btnStyle,
                    {
                      backgroundColor: isLoading ? 'gray' : '#469830',
                      width: '80%',
                    },
                  ]}>
                  <Text style={styles.btnTextStyle}>Back to Dashboard</Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TouchableOpacity style={styles.btnStyle}>
                  <Text style={styles.btnTextStyle}>Cancel Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.ORDER_SUMMARY)}
                  style={[styles.btnStyle, {backgroundColor: '#469830'}]}>
                  <Text style={styles.btnTextStyle}>Continue to payment</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>


    </View>
  )
}