import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

import {useAuth} from '../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const {isLoggedIn} = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

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
      
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* PRODUCTS */}
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
      />

      {/* GIF BUTTON */}
      <Tab.Screen
        name="GIF"
        component={ProductsScreen}
        options={({navigation}) => ({
          tabBarLabel: '',
          tabBarButton: () => (
            <Pressable
              onPress={() => navigation.navigate('Products')}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              
              <Image
                source={require('../assets/gif/mana.gif')}
                style={{
                  width: 60,
                  height: 60,
                }}
                resizeMode="contain"
              />
            </Pressable>
          ),
        })}
      />
      {/* ORDERS */}
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
      />

         {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={
          isLoggedIn
            ? ProfileScreen
            : LoginScreen
        }
      />

    </Tab.Navigator>
  );
}