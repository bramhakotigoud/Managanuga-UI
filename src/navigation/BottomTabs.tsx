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
import {GifAnimationProvider, useGifAnimation} from '../context/GifAnimationContext';
const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  const {isLoggedIn} = useAuth();
  const {gifPlaying} = useGifAnimation();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#A84B21',
        tabBarInactiveTintColor: '#000000',

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
                  H 150
                  C 162 12, 170 20, 176 38
                  C 182 58, 189 72, 200 72
                  C 211 72, 218 58, 224 38
                  C 230 20, 238 12, 250 12
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
          const color = focused ? '#000000' : '#040101';

          if (route.name === 'Home') {
            return <House size={26} color={color} strokeWidth={2} />;
          }
          if (route.name === 'Products') {
  return (
    <Image
      source={require('../assets/images/ground.png')}
      style={{
        width: 30,
        height: 30,
      }}  
      resizeMode="contain"
    />
  );
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
                  top: -24,
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
  key={gifPlaying ? 'mana-gif' : 'mana-static'}
  source={
    gifPlaying
      ? require('../assets/gif/mana.gif')
      : require('../assets/gif/mana-static.png')
  }
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
export default function BottomTabs() {
  return (
    <GifAnimationProvider>
      <BottomTabsNavigator />
    </GifAnimationProvider>
  );
}