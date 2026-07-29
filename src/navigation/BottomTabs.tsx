import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HeaderCartButton } from '../screens/HomeScreen';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const {isLoggedIn} = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // Show top header with live Cart Badge across all tabs
        headerShown: false,
        headerRight: () => <HeaderCartButton />,
        headerStyle: {
          backgroundColor: '#F8F4EC',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#2D341F',
        headerTitleStyle: {
          fontWeight: '700',
        },

        tabBarActiveTintColor: '#A84B21',
        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({focused}) => {
          let icon = '🏠';

          if (route.name === 'Products') {
            icon = '🛍️';
          } else if (route.name === 'Profile') {
            icon = '👤';
          } else if (route.name === 'Orders') {
            icon = '📦';
          } else if (route.name === 'More') {
            icon = '☰';
          }

          return (
            <Text
              style={{
                fontSize: 22,
                opacity: focused ? 1 : 0.6,
              }}>
              {icon}
            </Text>
          );
        },
      })}>
      
      {/* Hide header on Home because HomeScreen has its own built-in top header */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Products"
        component={ProductsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={
          isLoggedIn
            ? ProfileScreen
            : LoginScreen
        }
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
      />

      <Tab.Screen
        name="More"
        component={ProductsScreen}
      />

    </Tab.Navigator>
  );
}