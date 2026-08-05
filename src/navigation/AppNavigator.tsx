import CartScreen from '../screens/CartScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import AddressListScreen from '../screens/AddressListScreen';
import WishlistScreen from '../screens/WishlistScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import AdminDashboard from '../screens/AdminDashboard';
import OrderDetailsScreen from '../screens/OrdersDetailsScreen';
import VendorDashboardScreen from "../screens/VendorDashboardScreen";
import { LinkingOptions } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const linking: LinkingOptions<any> = {
  prefixes: [
    "managanuga://",
  ],

  config: {
    screens: {
      Login: {
        path: "register",
        parse: {
          vendor: (vendor: string) => vendor,
        },
      },
    },
  },
};

export default function AppNavigator() {
  
  return (
   <NavigationContainer
  linking={linking}
>
      <Stack.Navigator
  screenOptions={{ headerShown: false }}
>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />
        <Stack.Screen
          name="AddressList"
          component={AddressListScreen}
        />
        <Stack.Screen
          name="Wishlist"
          component={WishlistScreen}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddressScreen}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccessScreen} 
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
        />
        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorDashboard"
          component={VendorDashboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}