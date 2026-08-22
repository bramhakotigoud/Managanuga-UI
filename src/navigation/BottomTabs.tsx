import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import Svg, {Path} from 'react-native-svg';

import {useAuth} from '../context/AuthContext';
import {
  House,
  ReceiptText,
  User,
  Milk,
} from 'lucide-react-native';

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
  height: 78,
  paddingTop: 8,
  paddingBottom: 8,
  backgroundColor: 'transparent', // IMPORTANT: Keep transparent so SVG is visible
  borderTopWidth: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  elevation: 0, // Prevents Android shadow from clipping the curve
},

        // STEP 1: Updated SVG curve path to wrap smoothly around the button
        tabBarBackground: () => (
          <View style={{flex: 1, overflow: 'visible'}}>
            <Svg
              width="100%"
              height={90}
              viewBox="0 0 400 90"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                top: -20,
                left: 0,
              }}>
              <Path
                d="
                  M 0 12
                  H 155
                  C 165 12, 172 22, 178 35
                  C 186 52, 192 60, 200 60
                  C 208 60, 214 52, 222 35
                  C 228 22, 235 12, 245 12
                  H 400
                  V 90
                  H 0
                  Z
                "
                fill="#F8F4EC"
              />
            </Svg>
          </View>
        ),

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({focused}) => {
          const color = focused ? '#A84B21' : '#777';

          if (route.name === 'Home') {
            return <House size={26} color={color} strokeWidth={2} />;
          }
          if (route.name === 'Products') {
            return <Milk size={26} color={color} strokeWidth={2} />;
          }
          if (route.name === 'Orders') {
            return <ReceiptText size={26} color={color} strokeWidth={2} />;
          }
          if (route.name === 'Profile') {
            return <User size={26} color={color} strokeWidth={2} />;
          }

          return null;
        },
      })}>

      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* PRODUCTS */}
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
      />

      {/* GIF BUTTON */}
      {/* STEP 2: Adjusted button size & position to sit flush in the curve */}
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
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: -20,
                  width: 68,
                  height: 68,
                  borderRadius: 34,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',

                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 4,
                }}>
                <Image
                  source={require('../assets/gif/mana.gif')}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                  }}
                  resizeMode="cover"
                />
              </View>
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
        component={isLoggedIn ? ProfileScreen : LoginScreen}
      />

    </Tab.Navigator>
  );
}