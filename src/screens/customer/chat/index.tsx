import {View, Text, Button} from 'react-native';
import React from 'react';
import SCREENS from '../../../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';

const Chat = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Chat</Text>
        <Text style={{fontSize: 20}}>Buy Accessories</Text>
        <Button
          title="Accessories"
          onPress={() => navigation.navigate(SCREENS.ACCESSORIES)}
        />
        <Button
          title="Add Delivery Address"
          onPress={() => navigation.navigate(SCREENS.ADD_DELIVERY_ADDRESS)}
        />
        <Button
          title="View Product"
          onPress={() => navigation.navigate(SCREENS.VIEW_PRODUCTS)}
        />
        <Button
          title="Check out"
          onPress={() => navigation.navigate(SCREENS.CHECKOUT)}
        />
        <Button
          title="Track Order"
          onPress={() => navigation.navigate(SCREENS.TRACK_ORDER)}
        />
        <Text style={{fontSize: 20}}>Customer New Order</Text>
        <Button
          title="Order refill"
          onPress={() =>
            navigation.navigate(SCREENS.ADD_DELIVERY_ADDRESS, {
              render: 'refill',
            })
          }
        />
        <Button
          title="Pin Location"
          onPress={() => navigation.navigate(SCREENS.PIN_LOCATION)}
        />
        <Button
          title="Connect Vendor"
          onPress={() => navigation.navigate(SCREENS.CONNECT_VENDOR)}
        />
        <Button
          title="Order Summary"
          onPress={() => navigation.navigate(SCREENS.ORDER_SUMMARY)}
        />
        <Button
          title="Confirm Payment"
          onPress={() => navigation.navigate(SCREENS.CONFIRM_PAYMENT)}
        />
        <Text style={{fontSize: 20}}>Customer Swap Cylinder</Text>
        <Button
          title="Swap Cylinder"
          onPress={() => navigation.navigate(SCREENS.SWAP_CYLINDER)}
        />
        <Button
          title="Order Summary"
          onPress={() => navigation.navigate(SCREENS.ORDER_SUMMARY)}
        />
        <Text style={{fontSize: 20}}>Vendor Branch</Text>
        <Button
          title="Add Branch"
          onPress={() => navigation.navigate(SCREENS.ADD_BRANCH)}
        />
        <Text style={{fontSize: 20}}>Support</Text>
        <Button
          title="Support"
          onPress={() => navigation.navigate(SCREENS.CUSTOMER_SUPPORT)}
        />
        <Button
          title="Account Support"
          onPress={() => navigation.navigate(SCREENS.ACCOUNT_ISSUES)}
        />
        <Button
          title="Support send issue"
          onPress={() => navigation.navigate(SCREENS.SEND_SUPPORT_ISSUE)}
        />
      </View>
    </ScrollView>
  );
};

export default Chat;
