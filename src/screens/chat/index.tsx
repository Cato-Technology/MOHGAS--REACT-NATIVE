import {View, Text, Button} from 'react-native';
import React from 'react';
import SCREENS from '../../utils/constants';

const Chat = ({navigation}) => {
  return (
    <View>
      <Text>Chat</Text>
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
    </View>
  );
};

export default Chat;
