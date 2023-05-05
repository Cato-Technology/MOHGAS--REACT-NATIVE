import {View, Text, Button} from 'react-native';
import React from 'react';
import SCREENS from '../../../utils/constants';
import {ScrollView} from 'react-native-gesture-handler';

const Support = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Support</Text>
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
        <Button
          title="Add Product"
          onPress={() => navigation.navigate(SCREENS.ADD_PRODUCT)}
        />
        <Button
          title="Update Price"
          onPress={() => navigation.navigate(SCREENS.UPDATE_PRICE)}
        />
        <Button
          title="Sucess"
          onPress={() => navigation.navigate(SCREENS.SUCCESS_SCREEN)}
        />
        <Button
          title="Update Account"
          onPress={() => navigation.navigate(SCREENS.UPDATE_ACCOUNT_VENDOR)}
        />
        <Button
          title="Vendor Request"
          onPress={() => navigation.navigate(SCREENS.VENDOR_REQUEST)}
        />
      </View>
    </ScrollView>
  );
};

export default Support;
