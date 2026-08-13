import { useAuth } from '../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import {
  sendOtp,
  verifyOtp,
  loginWithPassword,
} from '../services/authService';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';

const LoginScreen = () => {
  const { login } = useAuth();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginMode, setLoginMode] = useState('mobile');
  const [password, setPassword] = useState('');
  const [otpError, setOtpError] = useState('');

  const navigation = useNavigation();
  const route = useRoute<any>();

  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });

    if (route.params?.vendor) {
      console.log(
        'Referral Vendor:',
        route.params.vendor
      );

      setVendorId(route.params.vendor);
    }

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
        },
      });
    };
  }, []);

  const handleLogin = async () => {
    try {

      // ==========================================
      // STEP 1 - ENTER MOBILE NUMBER
      // ==========================================

      if (loginMode === 'mobile') {

        const response = await sendOtp(mobile);

        if (response.existingUser) {
          setLoginMode('password');
          return;
        }

        setOtpSent(true);
        setLoginMode('otp');

        return;
      }

      // ==========================================
      // STEP 2 - VERIFY OTP
      // ==========================================

      if (loginMode === 'otp') {

        const response = await verifyOtp(
          mobile,
          otp,
          vendorId
        );

        // Invalid OTP
        if (!response.token) {
          setOtpError(
            response.message ||
            'Please enter a valid OTP'
          );

          return;
        }

        // Clear previous OTP error
        setOtpError('');

        // Login successful
        login(
          response.token,
          response.user
        );

        // ==========================================
        // VENDOR LOGIN
        // ==========================================

        if (response.user.role === 'VENDOR') {

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'VendorDashboard' as never,
              },
            ],
          });

          return;
        }

        // ==========================================
        // RESELLER LOGIN
        // ==========================================

        if (response.user.role === 'RESELLER') {

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ResellerDashboard' as never,
              },
            ],
          });

          return;
        }

        // ==========================================
        // CUSTOMER LOGIN
        // ==========================================

        if (route.params?.fromCart) {

          navigation.navigate(
            'Cart' as never
          );

        } else if (
          route.params?.fromSubscription
        ) {

          navigation.navigate(
            'Subscription' as never
          );

        } else {

          navigation.navigate(
            'MainTabs' as never
          );
        }

        return;
      }

      // ==========================================
      // STEP 3 - LOGIN WITH PASSWORD
      // ==========================================

      if (loginMode === 'password') {

        const response =
          await loginWithPassword(
            mobile,
            password
          );

        console.log(
          'LOGIN RESPONSE:',
          response
        );

        // Login failed
        if (!response.token) {

          Alert.alert(
            'Login Failed',
            response.message ||
            'Invalid password'
          );

          return;
        }

        // Login successful
        login(
          response.token,
          response.user
        );

        // ==========================================
        // VENDOR LOGIN
        // ==========================================

        if (response.user.role === 'VENDOR') {

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'VendorDashboard' as never,
              },
            ],
          });

          return;
        }

        // ==========================================
        // RESELLER LOGIN
        // ==========================================

        if (response.user.role === 'RESELLER') {

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ResellerDashboard' as never,
              },
            ],
          });

          return;
        }

        // ==========================================
        // CUSTOMER LOGIN
        // ==========================================

        if (route.params?.fromCart) {

          navigation.navigate(
            'Cart' as never
          );

        } else if (
          route.params?.fromSubscription
        ) {

          navigation.navigate(
            'Subscription' as never
          );

        } else {

          navigation.navigate(
            'MainTabs' as never
          );
        }

        return;
      }

    } catch (err: any) {

      console.log(
        'LOGIN ERROR:',
        err
      );

      Alert.alert(
        'Error',
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'
      );
    }
  };

  // ==========================================
  // LOGIN AGAIN
  // SAME BEHAVIOR AS YOUR OLD CODE
  // ==========================================

  const resetLogin = () => {

    setMobile('');
    setOtp('');
    setPassword('');
    setOtpSent(false);
    setOtpError('');
    setLoginMode('mobile');

  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpeg')}
      style={styles.background}
      imageStyle={styles.bgImage}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Logo */}

        <View style={styles.logoContainer}>

          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />

        </View>

        {/* Login Card */}

        <View style={styles.card}>

          <Text style={styles.heading}>
            Welcome Back
          </Text>

          <Text style={styles.subHeading}>
            Sign in to your Mana Ganuga account
          </Text>

          {/* ======================================
              MOBILE NUMBER
          ====================================== */}

          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={(text) => {

              setMobile(
                text.replace(/[^0-9]/g, '')
              );

            }}
            maxLength={10}
            placeholderTextColor="#888"
            style={styles.input}
          />

          {/* ======================================
              OTP INPUT
          ====================================== */}

          {loginMode === 'otp' && (

            <TextInput
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={(text) => {

                setOtp(
                  text.replace(/[^0-9]/g, '')
                );

                setOtpError('');

              }}
              maxLength={6}
              placeholderTextColor="#888"
              style={styles.input}
            />

          )}

          {/* OTP ERROR */}

          {loginMode === 'otp' &&
            otpError !== '' && (

              <Text style={styles.errorText}>
                {otpError}
              </Text>

          )}

          {/* ======================================
              PASSWORD INPUT
          ====================================== */}

          {loginMode === 'password' && (

            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={(text) => {

                // Keep exactly what the user types.
                // Do NOT convert to uppercase/lowercase.
                setPassword(text);

              }}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />

          )}

          {/* ======================================
              LOGIN BUTTON
          ====================================== */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >

            <Text style={styles.loginButtonText}>

              {
                loginMode === 'mobile'
                  ? 'NEXT'
                  : loginMode === 'otp'
                  ? 'VERIFY OTP'
                  : 'LOGIN'
              }

            </Text>

          </TouchableOpacity>

          {/* ======================================
              LOGIN AGAIN
              SAME AS OLD CODE
          ====================================== */}

          {loginMode === 'otp' &&
            otpError !== '' && (

              <TouchableOpacity
                onPress={() => {

                  setMobile('');
                  setOtp('');
                  setOtpSent(false);
                  setOtpError('');
                  setLoginMode('mobile');

                }}
              >

                <View
                  style={styles.loginAgainButton}
                >

                  <Text
                    style={styles.loginAgainText}
                  >
                    Login
                  </Text>

                </View>

              </TouchableOpacity>

          )}

        </View>

      </ScrollView>

    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  bgImage: {
    opacity: 0.88,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  card: {
    backgroundColor:
      'rgba(255,255,255,0.95)',

    marginHorizontal: 18,
    marginTop: 20,
    padding: 18,
    borderRadius: 28,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D341F',
  },

  subHeading: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 18,
  },

  input: {
    height: 50,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7D9C1',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },

  loginButton: {
    backgroundColor: '#A84B21',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
    fontWeight: '600',
  },

  loginAgainButton: {
    marginTop: 12,
    backgroundColor: '#A84B21',
    height: 42,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginAgainText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },

});