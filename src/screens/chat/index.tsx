import {View, Text, Button} from 'react-native';
import React from 'react';
import SCREENS from '../../utils/constants';

const Chat = ({navigation}) => {
  return (
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
    </View>
  );
};

export default Chat;
